from flask import Blueprint, jsonify

from app.exceptions import BadRequest


errors = Blueprint('errors', __name__)

@errors.app_errorhandler(Exception)
def handle_exception_format(error):
    payload = {}
    payload['message'] = error.args
    return jsonify(payload), 500

@errors.app_errorhandler(BadRequest)
def handle_bad_request_format(error):
    payload = {}
    payload['message'] = error.args
    payload['type'] = error.__class__.__name__
    return jsonify(payload), error.status_code