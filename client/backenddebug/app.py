from time import sleep
from random import randint
from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_socketio import send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@socketio.on('connect')
def mysocket():
    while True:
        data = {
            'lat': randint(-180, 180),
            'long': randint(-180, 180),
        }
        emit('tweet', data)
        sleep(1)


if __name__ == '__main__':
    socketio.run(app)
