# from api.application import app
# from flask import Flask, jsonify, request

# from extensions import db
# from models import Patient, Medication
# from seeder import seed_with_predefined

# db.init_app(app)

# @app.route('/seed')
# def seed():
#     '''Seeds the database.'''
#     with app.app_context():
#         db.create_all()
#     seed_with_predefined(db)
#     return 'Database seeded!'