import asyncio
from shazamio import Shazam

from flask import request
import requests

async def asyncRecognizeSong():
    req = request.files['recording.wav']
    with open('./recording.wav', 'wb') as fp:
        fp.write(req.read())

    shazam = Shazam()
    out = await shazam.recognize('./recording.wav')

    print(out)
    return out


def recognizeSong():
    return asyncio.run(asyncRecognizeSong())