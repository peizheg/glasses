import asyncio
from shazamio import Shazam

import lyricsgenius
import pyaudio
import wave

# Audio parameters
FORMAT = pyaudio.paInt16    # Audio format (16-bit)
CHANNELS = 1                # Mono channel
RATE = 44100                # Sampling rate (44.1 kHz)
CHUNK = 1024                # Buffer size
SECONDS = 5                 # Seconds of audio to retain
INTERVAL = 5                # Interval to save audio file (in seconds)

# Set Genius API key
GENIUS = lyricsgenius.Genius("ShGRYCfN2TXrPT3B3QCRv_e6ov1hoWptPnvgkc3Juw-4NsOTWPWbYfewDwd3fYjN", remove_section_headers=True)


def save_song(frames, samplewidth):
    wf = wave.open('recording.wav', 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(samplewidth)
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()

async def asyncFindSongAndLyrics():
    print("Recording...")

    # Setup for audio stream
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

    frames = []

    for seconds in range(10):
        for _ in range(0, int(RATE / CHUNK)):
            data = stream.read(CHUNK)
            frames.append(data)

        save_song(frames, p.get_sample_size(FORMAT))

        shazam = Shazam()
        out = await shazam.recognize('./recording.wav')

        if out["matches"]: break


    stream.close()
    p.terminate()

    if out["matches"]:
        track = out['track']
        print(f'"{track["title"]} by {track["subtitle"]}" found in {seconds} seconds!')
        song = GENIUS.search_song(track['title'], track['subtitle'])

        return {
            'artist': track['subtitle'],
            'title': track['title'],
            'lyrics': song.lyrics[0:-6],             # Remove embed from end of lyrics string
            'songFound': True
        }
    
    
    return {
        'songFound': False
    }

def findSongAndLyrics():
    return asyncio.run(asyncFindSongAndLyrics())