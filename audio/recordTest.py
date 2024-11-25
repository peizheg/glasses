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
SECONDS = 10  # Seconds of audio to retain
INTERVAL = 10  # Interval to save audio file (in seconds)

# Setup for audio stream
p = pyaudio.PyAudio()
stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

# Deque to store last few seconds of audio
max_chunks = int(RATE / CHUNK * SECONDS)
audio_buffer = deque(maxlen=max_chunks)

# MP3 encoder
encoder = lameenc.Encoder()
encoder.set_bit_rate(128)
encoder.set_in_sample_rate(RATE)
encoder.set_channels(CHANNELS)
encoder.set_quality(2)  # 2 = High, 5 = Medium

play = False
try:
    print("Recording...")
    #Set initial start time
    startTime = int(time.time())
    while True:
        # Read audio chunk from the stream and add it to the buffer
        data = stream.read(CHUNK)
        audio_buffer.append(data)

        # Check if it's time to save the last few seconds of audio (every 10 seconds after the initial start time)
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
            time.sleep(1)  # Small delay to avoid multiple saves in the same second

except KeyboardInterrupt:
    print("Stopped recording.")

finally:
    # Cleanup
    stream.stop_stream()
    stream.close()
    p.terminate()
