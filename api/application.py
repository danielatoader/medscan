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
import os.path

"""
db4free credentials to check out the database:
    medscdb - db name
    medscan - username
    medscanpwd - password
"""

"""
Start Flask app from application.py: In terminal use $env:FLASK_APP="application.py"
"""

app = Flask(__name__)
app.config.from_object(__name__)
conn = 'mysql://medscan:medscanpwd@85.10.205.173/medscdb'
app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SECRET_KEY'] = 'df0a17bc371e1b72883f3df3cc0928dd'
engine = create_engine(conn)
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# engine = create_engine('mysql+pymysql://med:scan@localhost/meddb')

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
    Example route: http://localhost:5000/check_lasa?medicationName=
    """
    medication_name = request.args.get("medicationName")
    result = dict()
    result['clusters'] = LASAClusters.compute_clusters()
    result['name'] = medication_name
    result['isLASA'] = bool(medication_name.lower() in str(result['clusters']))
    return jsonify(result['isLASA'])

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

    return jsonify(bool(given_medication.id in meds))
