from flask import Blueprint, jsonify

from app.exceptions import BadRequest, NotPermitted, NotAuthorized


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

@errors.app_errorhandler(NotPermitted)
def handle_not_permitted_request_format(error):
    payload = {}
    payload['message'] = 'User not allowed to execute this operation'
    payload['type'] = error.__class__.__name__
    return jsonify(payload), error.status_code

@errors.app_errorhandler(NotAuthorized)
def handle_not_authorized_request_format(error):
    payload = {}
    payload['message'] = 'You are not authorized!'
    payload['type'] = error.__class__.__name__
    return jsonify(payload), error.status_code