from flask import Flask, jsonify, request
from data import medication_code_map, medication_cluster_map, lasas, lasa_clusters
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

    return jsonify({"medicationName": medication_name, "isLasa": isLasa, "random_cluster_members":  random_members})


# @app.route("/check_patient_medication", methods=["GET"])
# def check_patient():
#     """
#     Checks if the medication matches with the patient.
#     Example route: http://localhost:5000/check_patient_medication?patientId=1&medicationId=1
#     """
#     p_id = request.args.get("patientId")
#     med_id = request.args.get("medicationId")
#     given_medication = Medication.query.filter_by(id=med_id).first()

#     try:
#         patient = Patient.query.filter_by(id=p_id).one()
#     except BaseException as err:
#         print(f"Unexpected {err}, {type(err)}")
#         raise

#     meds = []
#     for med in patient.meds:
#         meds.append(med.id)

#     return jsonify(
#         {
#             "medicationName": given_medication.name,
#             "patientName": patient.name,
#             "isCorrectlyAssigned": bool(given_medication.id in meds),
#         }
#     )


# @app.route("/patients", methods=["GET"])
# def get_patients():
#     names = dict()
#     patients = Patient.query.all()
#     for patient in patients:
#         names[patient.id] = patient.name
#     return jsonify(names)
