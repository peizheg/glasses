import pyaudio
p = pyaudio.PyAudio()
for device in range(p.get_device_count()):
    print(p.get_device_info_by_index(device).get('name'))
