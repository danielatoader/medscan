import mysql.connector
from api.db.models import Patient, Medication

def seed_with_predefined(db):
    '''Seeds the database.'''
 
    # Adds possible patients
    bob = Patient(name='Bob Mark', info='Male, 55 yrs, 180cm',
                qr_code_patient='afyuw4fuwfg2qgdu_QWEb')

    bill = Patient(name='Bill Mark', info='Male, 54 yrs, 181cm',
                qr_code_patient='bfyuw4fuwfg2qgdu_QWEb')

    alice = Patient(name='Alice Mark', info='Female, 45 yrs, 170cm',
                qr_code_patient='cfyuw4fuwfg2qgdu_QWEb')
    
    patients = [bob, bill, alice]

    for patient in patients:
        db.session.add(patient)

    # Adds possible medications
    paracetamol = Medication(name='Paracetamol',
                            info='Does not require prescription',
                            qr_code_medication = 'fas23f34w6',
                            dose='500mg')

    adapalene = Medication(name='Adapalene',
                            info='Requires prescription',
                            qr_code_medication = 'kh24jk5q',
                            dose='1%')

    medications = [paracetamol, adapalene]
    
    for medication in medications:
        db.session.add(medication)

    # Adds possible medications of patients
    bob.medications.append(paracetamol)
    bob.medications.append(adapalene)
    alice.medications.append(adapalene)

    db.session.commit()