from flask import Blueprint, jsonify


class BadRequest(Exception):
    """ Bad requets returning 400 status code """
    status_code = 400