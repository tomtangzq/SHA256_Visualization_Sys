from flask import Blueprint, request, jsonify

from flask_bcrypt import Bcrypt

from database import db
from models.user import User

from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

bcrypt = Bcrypt()


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # 检查用户名是否存在
    if User.query.filter_by(username=username).first():
        return jsonify({
            "success": False,
            "message": "Username already exists."
        }), 400

    # 检查邮箱是否存在
    if User.query.filter_by(email=email).first():
        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 400

    # 加密密码
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(
        username=username,
        email=email,
        password_hash=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "User registered successfully."
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")

    password = data.get("password")

    user = User.query.filter_by(
        email=email
    ).first()

    if user is None:

        return jsonify({

            "success": False,

            "message": "Email not found."

        }),401

    if not bcrypt.check_password_hash(

        user.password_hash,

        password

    ):

        return jsonify({

            "success":False,

            "message":"Incorrect password."

        }),401

    access_token = create_access_token(

        identity=user.id

    )

    return jsonify({

        "success":True,

        "token":access_token,

        "username":user.username

    })