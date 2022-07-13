import os
from flask import Flask
from busboard.controllers import register_controllers


def create_app():
    app = Flask(__name__)
    app.config.from_object(os.environ['APP_SETTINGS'])

    register_controllers(app)

    if __name__ == "__main__":
        app.run()

    return app
