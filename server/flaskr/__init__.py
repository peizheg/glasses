from flask import Flask
from flask_cors import CORS
from time import sleep

def create_app():
    # create and configure the server
    app = Flask(__name__)
    CORS(app)

    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    


    @app.route('/get_song')
    def get_song():
        sleep(2)
        return {
            "title": "Jar of Hearts",
            "artist": "Christina Perri",
            "lyrics": "I know I can't take one more step towards you\n'Cause all that's waiting is regret\nAnd don't you know I'm not your ghost anymore?\nYou lost the love I love the most\n\n[Pre-Chorus]\nI learned to live half-alive\nAnd now you want me one more time\n\n[Chorus]\nAnd who do you think you are\nRunnin' 'round leaving scars\nCollecting your jar of hearts\nAnd tearing love apart?\nYou're gonna catch a cold\nFrom the ice inside your soul\nSo don't come back for me\nWho do you think you are?\n\n[Verse 2]\nI hear you're asking all around\nIf I am anywhere to be found\nBut I have grown too strong\nTo ever fall back in your arms\nSee pop shows near Toronto\nGet tickets as low as $298\nYou might also like\nThe Tortured Poets Department\nTaylor Swift\nMy Boy Only Breaks His Favorite Toys\nTaylor Swift\nSo Long, London\nTaylor Swift\n[Pre-Chorus]\nAnd I've learned to live half-alive\nAnd now you want me one more time\n\n[Chorus]\nAnd who do you think you are\nRunnin' 'round leaving scars\nCollecting your jar of hearts\nAnd tearing love apart?\nYou're gonna catch a cold\nFrom the ice inside your soul\nSo don't come back for me\nWho do you think you are?\n\n[Bridge]\nDear, it took so long just to feel alright\nRemember how to put back the light in my eyes\nI wish I had missed the first time that we kissed\n'Cause you broke all your promises\nAnd now you're back\nYou don't get to get me back\n\n[Chorus]\nAnd who do you think you are\nRunnin' 'round leavin' scars\nCollecting your jar of hearts\nAnd tearing love apart?\nYou're gonna catch a cold\nFrom the ice inside your soul\nSo don't come back for me\nDon't come back at all\nAnd who do you think you are\nRunnin' 'round leaving scars\nCollecting your jar of hearts\nTearing love apart?\nYou're gonna catch a cold\nFrom the ice inside your soul\nDon't come back for me\nDon't come back at all\n[Outro]\nWho do you think you are?\nWho do you think you are?\nWho do you think you are?"
        }

    @app.put('/settings')
    def change_settings():
        return 0

    

    return app