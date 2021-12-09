import json
from ml.LASAClusters import LASAClusters
from db.db import patients
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from data import res

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def get_example():
    """GET in server"""
    response = jsonify(message="Simple server is running")

    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/patients', methods=['GET'])
def get_patients():
    result = dict()
    result['names'] = patients
    return result

@app.route('/compute_clusters', methods=['GET'])
def compute_clusters():
    # result = dict()
    # result['clusters'] = LASAClusters.compute_clusters()
    # result = []
    # result.append(LASAClusters.compute_clusters())
    return json.dumps(res, indent=4)

@app.route('/scan', methods=['GET', 'POST'])
def scan():
    return 'Pass' + ' first commit'
