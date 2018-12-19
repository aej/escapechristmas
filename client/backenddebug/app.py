import eventlet
eventlet.monkey_patch()

from random import randint
from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_socketio import send, emit

#!/usr/bin/env python

import eventlet
eventlet.monkey_patch()

from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socket = SocketIO(app, logger=True, engineio_logger=True)

def send_tweet():
    data = {
        'lat': randint(-180, 180),
        'long': randint(-180, 180),
    }
    socket.emit('tweet', data)

def send_infinite_tweets():
    while True:
        send_tweet()
        eventlet.sleep(1)

eventlet.spawn(send_infinite_tweets)

if __name__ == '__main__':
    socket.run(app)

