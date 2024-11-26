from flask import Flask, request
from flask_cors import CORS

from .display.src.lyrics import findSongAndLyrics

PI_ENABLED = True

try:
    from .display.src.display import write_song
except:
    PI_ENABLED = False

def create_app():
    # create and configure the server
    app = Flask(__name__)
    CORS(app)

    @app.get('/hello')
    def hello():
        return 'Hello, World!'

    @app.get('/get_song')
    def get_song():
        response = findSongAndLyrics()
        if PI_ENABLED: write_song(response.lyrics)
        return response
    
    @app.post('/change_lyrics')
    def change_lyrics():
        req = request.json
        lyrics = req['lyrics']
        print(lyrics)
        if PI_ENABLED: write_song(lyrics)
        return lyrics

    @app.put('/settings')
    def change_settings():
        return 0

    

    return app