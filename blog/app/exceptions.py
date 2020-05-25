from flask import Blueprint, jsonify


class BadRequest(Exception):
    """ Bad requets returning 400 status code """
    status_code = 400


class NotPermitted(Exception):
    status_code = 401


class NotAuthorized(Exception):
    status_code = 401


class FileExtensionNotAllowed(Exception):
    status_code = 400


class BooleanFilterTypeError(Exception):
    status_code = 400
