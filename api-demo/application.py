from flask import Flask, jsonify, request
from data import (
    medication_code_map,
    medication_cluster_map,
    lasas,
    lasa_clusters,
    patient_code_map,
    patient_medications,
)
from random import sample

app = Flask(__name__)


@app.route("/", methods=["GET"])
def test_connection():
    return jsonify(m="Server is up and running")


@app.route("/check_lasa", methods=["GET"])
def check_lasa():
    """
    Checks if the medication is LASA and returns name and 4 random cluster members if so.
    Example route: http://localhost:5000/check_lasa?medicationCode=0232378
    """
    medication_code = request.args.get("medicationCode", type=int)
    medication_name = medication_code_map[medication_code]
    isLasa = medication_name in lasas
    cluster = lasa_clusters[medication_cluster_map[medication_name]].copy() if isLasa else []
    if isLasa:
        cluster.remove(medication_name)
    random_members = sample(cluster, k=min(len(cluster), 4)) if isLasa else []

    return jsonify({"medicationName": medication_name, "isLasa": isLasa, "random_cluster_members": random_members})


@app.route("/patient_med_match", methods=["GET"])
def patient_med_match():
    med_code = request.args.get("medication", type=int)

    medication_name = medication_code_map[med_code]
    isLasa = medication_name in lasas
    cluster = lasa_clusters[medication_cluster_map[medication_name]].copy() if isLasa else []
    if isLasa:
        cluster.remove(medication_name)
    random_members = sample(cluster, k=min(len(cluster), 4)) if isLasa else []

    med_data = jsonify({"medicationName": medication_name, "isLasa": isLasa, "random_cluster_members": random_members})

    patient_code = request.args.get("patient", type=int)
    patient_name = patient_code_map[patient_code]
    match = medication_name in patient_medications[patient_name]

    return jsonify({"patient": patient_name, "med": med_data, "match": match})

