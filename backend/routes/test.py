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

@test_bp.route(
    "/test/results",
    methods=["GET"]
)
@jwt_required()
def get_test_results():

    user_id = int(get_jwt_identity())

    attempts = TestAttempt.query.filter_by(
        user_id=user_id
    ).order_by(
        TestAttempt.created_at.desc()
    ).all()

    pre_attempt = None
    post_attempt = None

    for attempt in attempts:

        if (
            attempt.test_type == "pre"
            and pre_attempt is None
        ):
            pre_attempt = attempt

        if (
            attempt.test_type == "post"
            and post_attempt is None
        ):
            post_attempt = attempt

    return jsonify({

        "success": True,

        "pre": (
            {
                "score": pre_attempt.score,
                "total": pre_attempt.total,
                "created_at": (
                    pre_attempt.created_at.isoformat()
                    if pre_attempt.created_at
                    else None
                )
            }
            if pre_attempt
            else None
        ),

        "post": (
            {
                "score": post_attempt.score,
                "total": post_attempt.total,
                "created_at": (
                    post_attempt.created_at.isoformat()
                    if post_attempt.created_at
                    else None
                )
            }
            if post_attempt
            else None
        )

    }), 200