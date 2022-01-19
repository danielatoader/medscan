from api.db.extensions import db

medication_table = db.Table('medication_table', db.Model.metadata, db.Column('patient_id', db.Integer, db.ForeignKey(
    'patients.id')), db.Column('medication_id', db.Integer, db.ForeignKey('medications.id')))

class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(20), nullable=False)
    info = db.Column(db.String(500), nullable=False)
    qr_code_patient = db.Column(db.String(8000))
    meds = db.relationship('Medication', secondary=medication_table, backref=db.backref('meds'))

    def __repr__(self):
        return f"Patient('{self.id}', '{self.name}', '{self.info}')"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Medication(db.Model):
    __tablename__ = 'medications'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(20), nullable=False)
    info = db.Column(db.String(500), nullable=False)
    qr_code_medication = db.Column(db.String(200), nullable=False)
    dose = db.Column(db.String(500))

    def __repr__(self):
        return f"Medication('{self.id}', '{self.name}', '{self.dose}')"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
