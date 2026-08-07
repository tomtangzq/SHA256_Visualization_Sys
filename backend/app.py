from flask import Flask

from flask_cors import CORS

from config import Config

from database import db

from models.user import User
from routes.auth import auth_bp
from flask_bcrypt import Bcrypt

from flask_jwt_extended import JWTManager


app = Flask(__name__)

bcrypt = Bcrypt(app)

app.config.from_object(Config)

CORS(app)

app.register_blueprint(
    auth_bp,
    url_prefix="/api"
)

db.init_app(app)

jwt = JWTManager(app)


@app.route("/")

def home():

    return {

        "message": "Backend Running"

    }


if __name__ == "__main__":

    with app.app_context():

        db.create_all()

    app.run(debug=True)