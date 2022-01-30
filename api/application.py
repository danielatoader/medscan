import json
from api.db.models import Medication, Patient
from api.ml.LASAClusters import LASAClusters
from api.db.seeder import seed_with_predefined
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text
from api.db.extensions import db
from api.db.seeder import seed_with_predefined
from api.db.models import Patient
from api.data import res
import os.path

from sklearn import cluster

"""
db4free credentials to check out the database:
    - https://www.db4free.net/phpMyAdmin/index.php?route=/database/structure&server=1&db=medscdb
    - medscdb - db name
    - medscan - username
    - medscanpwd - password
"""

"""
Start Flask app from application.py:
    - In terminal use $env:FLASK_APP="application.py"

Start app to allow remote connection on eduroam:
    - flask run --host=0.0.0.0
    - http://145.94.144.227:5000/
"""

app = Flask(__name__)
app.config.from_object(__name__)
conn = 'mysql://medscan:medscanpwd@85.10.205.173/medscdb'
app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SECRET_KEY'] = 'df0a17bc371e1b72883f3df3cc0928dd'
engine = create_engine(conn)

CORS(app, resources={r'/*': {'origins': '*'}})
db.init_app(app)

@app.route('/seed')
def seed():
    """Seeds the database."""
    with app.app_context():
        db.create_all()

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "medsc.db")

    seed_with_predefined(db)
   
    with engine.connect(db_path) as connection:
        result = connection.execute(text("select name from patients"))
        for row in result:
            print("name:", row['name'])

    return 'Database seeded!'

@app.route("/", methods=["GET"])
def get_example():
    """GET in server"""
    response = jsonify(message="Simple server is running")

    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/patients', methods=['GET'])
def get_patients():
    names = dict()
    patients = Patient.query.all()
    for patient in patients:
        names[patient.id] = patient.name
    return jsonify(names)

@app.route('/check_lasa', methods=['GET'])
def check_lasa():
    """
    Checks if the medication is LASA.
    Example route: http://localhost:5000/check_lasa?medicationName=epiRUBicin
    """
    medication_name = request.args.get("medicationName")
    clusters, all_LASA, all_clusters = LASAClusters.compute_clusters()
    members = []
    for cluster in clusters.values():
        for member in cluster:
            if medication_name.lower() == member.lower():
                members = cluster
                break
    LASAs = [item.lower() for sublist in all_LASA for item in sublist]
    isLASA = bool(medication_name.lower() in LASAs)
    return json.dumps({"medicationName" : medication_name, "isLASA" : isLASA, "members" : list(members)})

@app.route('/check_patient_medication', methods=['GET'])
def check_patient():
    """
    Checks if the medication matches with the patient.
    Example route: http://localhost:5000/check_patient_medication?patientId=1&medicationId=1
    """
    p_id = request.args.get("patientId")
    med_id = request.args.get("medicationId") 
    given_medication = Medication.query.filter_by(id=med_id).first()

    try:
        patient = Patient.query.filter_by(id=p_id).one()
    except BaseException as err:
        print(f"Unexpected {err=}, {type(err)=}")
        raise 
    
    meds = []
    for med in patient.meds:
        meds.append(med.id)

    return jsonify({"medicationName" : given_medication.name, "patientName" : patient.name, "isCorrectlyAssigned" : bool(given_medication.id in meds)})
