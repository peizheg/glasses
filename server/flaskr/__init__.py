from flask import Flask
from flask_cors import CORS
from time import sleep

from .display.src.lyrics import findSongAndLyrics
from .display.src.display import write_song

def create_app():
    # create and configure the server
    app = Flask(__name__)
    CORS(app)

    @app.route('/hello')
    def hello():
        return 'Hello, World!'


    @app.route('/get_song')
    def get_song():
        response = findSongAndLyrics()
        write_song(response.lyrics)
        return response
    
    def change_lyrics():
        return 0

    @app.put('/settings')
    def change_settings():
        return 0

    

    return app