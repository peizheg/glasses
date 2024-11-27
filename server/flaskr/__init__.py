from flask import Flask, request
from flask_cors import CORS

from .shazam import recognizeSong

def create_app():
    # create and configure the server
    app = Flask(__name__)
    CORS(app)

    @app.get('/hello')
    def hello():
        return 'Hello, World!'

    @app.post('/recognize_song')
    def recognize_song():
        return recognizeSong()

    return app