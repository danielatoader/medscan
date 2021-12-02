import time

from ml.LASAClusters import LASAClusters
from db.db import patients
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/patients', methods=['GET'])
def get_patients():
    result = dict()
    result['names'] = patients
    return result

@app.route('/compute_clusters', methods=['GET'])
def compute_clusters():
    result = dict()
    result['clusters'] = LASAClusters.compute_clusters()
    return result

@app.route('/scan', methods=['POST'])
def scan():
    return 'Pass'
