import asyncio
from shazamio import Shazam
import lyricsgenius
genius = lyricsgenius.Genius("ShGRYCfN2TXrPT3B3QCRv_e6ov1hoWptPnvgkc3Juw-4NsOTWPWbYfewDwd3fYjN")
import pyaudio
import time
from collections import deque
import soundfile as sf
import lameenc
import numpy as np

# Audio parameters
FORMAT = pyaudio.paInt16  # Audio format (16-bit)
CHANNELS = 1  # Mono channel
RATE = 44100  # Sampling rate (44.1 kHz)
CHUNK = 1024  # Buffer size
SECONDS = 8  # Seconds of audio to retain
INTERVAL = 8  # Interval to save audio file (in seconds)

# Setup for audio stream
p = pyaudio.PyAudio()
stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

# Deque to store last few seconds of audio
max_chunks = int(RATE / CHUNK * SECONDS)
audio_buffer = deque(maxlen=max_chunks)

async def identify_song(file_path):
        shazam = Shazam()
        out = await shazam.recognize(file_path)
        
        # get song title and artist
        track_title = out['track']['title']
        track_artist = out['track']['subtitle']

        # print(f"Song: {track_title}")
        # print(f"Artist: {track_artist}")

        return {"title": track_title, "artist": track_artist}

# MP3 encoder
encoder = lameenc.Encoder()
encoder.set_bit_rate(128)
encoder.set_in_sample_rate(RATE)
encoder.set_channels(CHANNELS)
encoder.set_quality(2)  # 2 = High, 5 = Medium
def findSongAndLyrics(start):
    print("Recording...")
    #Set initial start time
    startTime = int(time.time())
    while start:
        # Read audio chunk from the stream and add it to the buffer
        data = stream.read(CHUNK)
        audio_buffer.append(data)

        # Check if 10 seconds have passed since the last cut (or the initialization)
        if (int(time.time()) - startTime) % INTERVAL == 0 and (int(time.time()) - startTime) != 0:
            # Collect the data in the buffer and convert to a numpy array
            frames = np.frombuffer(b''.join(audio_buffer), dtype=np.int16)

            # Encode to MP3
            mp3_data = encoder.encode(frames.tobytes())

            # Save MP3 file to currentAudio
            filename = f"currentAudio.mp3"
            with open(filename, 'wb') as f:
                f.write(mp3_data)
            print(f"Saved {filename}")
            #Try finding song with current file
            try:
                # path to the audio file
                audio_file = "currentAudio.mp3"
                # run function if song found
                result = asyncio.run(identify_song(audio_file))
                start = False
            #If error (song not found), continue searching
            except:
                print("Still searching...")
            time.sleep(1)  # Small delay to avoid multiple saves in the same second

    #Find lyrics with song title
    genius.remove_section_headers = True
    song = genius.search_song(result['title'], result['artist'])
    #Remove embed from end of lyrics string
    song.lyrics = song.lyrics[0:-6]
    print(song.lyrics)
    #Write lyrics to text file
    with open('lyrics.txt', 'w') as f:
        f.write("\n".join(song.lyrics.splitlines()[1:]))
    # Cleanup
    stream.stop_stream()
    stream.close()
    p.terminate()
findSongAndLyrics(True)