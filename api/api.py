import time
from flask import Flask, jsonify

app = Flask(__name__, static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
    return {'time' : time.time()}

@app.route('/api/patients')
def get_patients():
    return jsonify({'patients' : ['Anna', 'Bob']})
    