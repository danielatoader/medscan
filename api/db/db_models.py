from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# medication_table = db.Table('medication_table', db.Model.metadata, db.Column('patient_id', db.Integer, db.ForeignKey(
#     'patient.id')), db.Column('medication_id', db.Integer, db.ForeignKey('medication.id')))

class Patient(db.Model):
    # __tablename__ = 'patient'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(20), nullable=False)
    info = db.Column(db.String(500), nullable=False)
    # medications = db.relationship('Medication', secondary=medication_table, backref=db.backref('medications'))

    def __repr__(self):
        return f"Patient('{self.id}', '{self.name}', '{self.info}')"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Medication(db.Model):
    # __tablename__ = 'medication'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(20), nullable=False)
    info = db.Column(db.String(500), nullable=False)
    dosage = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"Medication('{self.id}', '{self.name}', '{self.dosage}')"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
