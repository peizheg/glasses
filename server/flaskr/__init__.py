from flask import Flask
from flask_cors import CORS
from time import sleep

from .display.src.lyrics import findSongAndLyrics

def create_app():
    # create and configure the server
    app = Flask(__name__)
    CORS(app)

    @app.route('/hello')
    def hello():
        return 'Hello, World!'


    @app.route('/get_song')
    def get_song():
        return findSongAndLyrics()

    @app.put('/settings')
    def change_settings():
        return 0

    

    return app