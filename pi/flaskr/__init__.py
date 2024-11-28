from flask import Flask, request
from flask_cors import CORS

from werkzeug.middleware.proxy_fix import ProxyFix
import threading

from .display.src.lyrics import findSongAndLyrics
from .display.src.display import write_song


def create_app():
    # create and configure the server
    app = Flask(__name__)
    CORS(app)
    app.wsgi_app = ProxyFix(
        app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
    )

    @app.get('/hello')
    def hello():
        return 'Hello, World!'

    @app.get('/get_song')
    def get_song():
        response = findSongAndLyrics()
        
        t = threading.Thread(target=write_song, args=[response["lyrics"]])
        t.setDaemon(False)
        t.start()

        return response
    
    @app.post('/change_lyrics')
    def change_lyrics():
        req = request.json
        lyrics = req['lyrics']
        print(lyrics)
        write_song(lyrics)
        return lyrics

    @app.put('/settings')
    def change_settings():
        return 0

    

    return app


