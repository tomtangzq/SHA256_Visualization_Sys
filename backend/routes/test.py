from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from database import db
from models.test_attempt import TestAttempt


test_bp = Blueprint(
    "test",
    __name__
)


@test_bp.route(
    "/test/submit",
    methods=["POST"]
)
@jwt_required()
def submit_test():

    print("TEST SUBMIT REQUEST")
    
    print("Authorization:",
              request.headers.get("Authorization"))
    
    print("DATA:",
              request.get_json())
    
    user_id = get_jwt_identity()
    
    print("USER ID:",
              user_id)
    

    data = request.get_json()

    test_type = data.get("test_type")
    score = data.get("score")
    total = data.get("total")

    

    # 检查 test type
    if test_type not in ["pre", "post"]:

        return jsonify({
            "success": False,
            "message": "Invalid test type."
        }), 400

    # 检查分数
    if score is None or total is None:

        return jsonify({
            "success": False,
            "message": "Score and total are required."
        }), 400

    # 获取当前登录用户
    user_id = get_jwt_identity()

    attempt = TestAttempt(

        user_id=user_id,

        test_type=test_type,

        score=score,

        total=total

    )

    db.session.add(attempt)

    db.session.commit()

    return jsonify({

        "success": True,

        "message": "Test result saved successfully.",

        "attempt_id": attempt.id,

        "score": attempt.score,

        "total": attempt.total

    }), 201