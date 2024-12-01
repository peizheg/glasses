import requests

import lyricsgenius
import pyaudio
import wave
import time

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
    query = f"{artist} {title}".replace(" ", "%20")
    url = f"https://api.textyl.co/api/lyrics?q={query}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if 'lyrics' in data:
            return data['lyrics']  # Return lyrics with timestamps
    return None

def display_lyrics_with_timestamps(lyrics, start_time):
    """
    Synchronizes and displays the lyrics with timestamps.
    """
    for line in lyrics:
        timestamp = line['timestamp'] / 1000  # Convert milliseconds to seconds
        text = line['text']
        current_time = time.time() - start_time

        # Wait until the correct time to display the lyric
        if timestamp > current_time:
            time.sleep(timestamp - current_time)
        
        print(text)  # Display the lyric

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
            display_lyrics_with_timestamps(lyrics, start_time)
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
