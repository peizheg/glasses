import requests

import lyricsgenius
import pyaudio
import wave
import time

# Initialize the OLED display
from waveshare_OLED import OLED_1in51
from PIL import Image, ImageDraw, ImageFont
import os

# Audio parameters
FORMAT = pyaudio.paInt16    # Audio format (16-bit)
CHANNELS = 1                # Mono channel
RATE = 44100                # Sampling rate (44.1 kHz)
CHUNK = 1024                # Buffer size
SECONDS = 5                 # Seconds of audio to retain

# Set Genius API key
# GENIUS = lyricsgenius.Genius("ShGRYCfN2TXrPT3B3QCRv_e6ov1hoWptPnvgkc3Juw-4NsOTWPWbYfewDwd3fYjN", remove_section_headers=True)


def save_song(frames, samplewidth):
    wf = wave.open('recording.wav', 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(samplewidth)
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()

def fetch_lyrics_with_timestamps(title, artist):
    response = requests.post(f"https://api.textyl.co/api/lyrics?q={'%20'.join(artist.lower().split())}%20{'%20'.join(title.lower().split())}", verify=False)

    if response.status_code == 200:
        lyrics = response.json()
        return lyrics
    return None

# def display_lyrics_with_timestamps(lyrics, start_time):
#     """
#     Synchronizes and displays the lyrics with timestamps.
#     """
#     for line in lyrics:
#         timestamp = line['seconds']
#         text = line['lyrics']
#         current_time = time.time() - start_time

#         # Wait until the correct time to display the lyric
#         if timestamp > current_time:
#             time.sleep(timestamp - current_time)
        
#         print(text)  # Display the lyric

def display_lyrics_with_timestamps_oled(lyrics, shazam_timestamp, is_vertical=True, scroll_speed=1.5, font_size=14):
    """
    Synchronizes and displays the lyrics on an OLED screen, starting from the closest matching timestamp.
    
    :param lyrics: List of lyrics with timestamps from the API.
    :param shazam_timestamp: Timestamp (in milliseconds) returned by Shazam.
    :param is_vertical: True for vertically-oriented screen, False for horizontally-oriented screen.
    :param scroll_speed: Speed of scrolling (pixels per frame).
    :param font_size: Font size for the lyrics.
    """
    # Convert Shazam timestamp to seconds
    shazam_timestamp_sec = shazam_timestamp / 1000

    # Find the closest starting point in the lyrics
    starting_index = next(
        (i for i, line in enumerate(lyrics) if line['timestamp'] / 1000 >= shazam_timestamp_sec),
        0  # Default to the first line if no match is found
    )

    # Adjust the start time for synchronization
    start_time = time.time()

    picdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'pic')
    disp = OLED_1in51.OLED_1in51()
    disp.Init()
    disp.clear()
    
    #Set width and height based on orientation
    if not is_vertical:
        width = disp.width
        height = disp.height
    else:
        width = disp.height
        height = disp.width
    font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), font_size)

    for line in lyrics[starting_index:]:
        timestamp = line['timestamp'] / 1000  # Convert to seconds
        text = line['text']

        # Calculate the adjusted display time
        current_time = time.time() - start_time
        if timestamp > shazam_timestamp_sec:
            time_to_wait = timestamp - shazam_timestamp_sec - current_time
            if time_to_wait > 0:
                time.sleep(time_to_wait)

        # Scroll the current lyric on the OLED screen
        image = Image.new('1', (width, height), "WHITE")
        draw = ImageDraw.Draw(image)
        
        # Scroll effect
        scroll_pos = 0
        while scroll_pos < font_size:
            draw.rectangle((0, 0, width, height), fill="WHITE")
            draw.text((0, height // 2 - scroll_pos), text, font=font, fill=0)
            
            if not is_vertical:
                disp.ShowImage(disp.getbuffer(image))
            else:
                rotated_image = image.rotate(90, expand=True)
                disp.ShowImage(disp.getbuffer(rotated_image))
            
            time.sleep(0.05)  # Adjust frame rate
            scroll_pos += scroll_speed

    # Clear the display after lyrics are done
    disp.clear()


def findSongAndLyrics():
    print("Recording...")

    # Setup for audio stream
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

    frames = []
    out = None

    for seconds in range(10):
        for _ in range(0, int(RATE / CHUNK)):
            data = stream.read(CHUNK)
            frames.append(data)

        save_song(frames, p.get_sample_size(FORMAT))

        # Send audio to Shazam
        with open('./recording.wav', 'rb') as fp:
            res = requests.post('https://boss-previously-grubworm.ngrok-free.app/recognize_song', files={'recording.wav': fp.read()})
            out = res.json()
            if out["matches"]:
                break

    stream.close()
    p.terminate()

    if out and out["matches"]:
        track = out['track']
        print(f'"{track["title"]} by {track["subtitle"]}" found in {seconds} seconds!')

        # Fetch lyrics with timestamps
        lyrics = fetch_lyrics_with_timestamps(track['title'], track['subtitle'])
        if lyrics:
            start_time = time.time() - out['timestamp'] / 1000  # Adjust for Shazam timestamp
            display_lyrics_with_timestamps_oled(lyrics, start_time, True)
        else:
            print("Lyrics with timestamps not found.")
        
        return {
            'artist': track['subtitle'],
            'title': track['title'],
            'lyrics': lyrics,
            'songFound': True
        }

    return {'songFound': False}


# def findSongAndLyrics():
#     print("Recording...")

#     # Setup for audio stream
#     p = pyaudio.PyAudio()
#     stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

#     frames = []

#     for seconds in range(10):
#         for _ in range(0, int(RATE / CHUNK)):
#             data = stream.read(CHUNK)
#             frames.append(data)

#         save_song(frames, p.get_sample_size(FORMAT))

#         # Send audio to Shazam
#         with open('./recording.wav', 'rb') as fp:
#             res = requests.post('https://boss-previously-grubworm.ngrok-free.app/recognize_song', files={ 'recording.wav': fp.read() })
#             out = res.json()
#             if out["matches"]: break


#     stream.close()
#     p.terminate()

#     if out["matches"]:
#         track = out['track']
#         print(f'"{track["title"]} by {track["subtitle"]}" found in {seconds} seconds!')
#         song = GENIUS.search_song(track['title'], track['subtitle'])
#         print(song)

#         return {
#             'artist': track['subtitle'],
#             'title': track['title'],
#             'lyrics': song.lyrics[0:-6],             # Remove embed from end of lyrics string
#             'songFound': True
#         }
    
#     return { 'songFound': False }
