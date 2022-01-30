from more_itertools import flatten

lasa_clusters = [
    ["Amitriptyline", "Amiodarone", "Amiloride", "Amiodarone", "Amisulpride"],
    ["Digoxin", "Doxepin", "Doxazosin", "Doxorubicin"],
    ["Nifedipine", "Nicardipine", "Nimodipine", "Nitromin", "Nystan", "Nystatin"],
    ["Propranolol", "Prednisolone"],
    ["Zirtek", "Zestril", "Zestoretic", "Zestoretic", "Zopiclone"],
]

lasas = list(flatten(lasa_clusters))

meds = lasas.copy()
meds.extend(
    [
        "Adderall",
        "arxiga",
        "Fasenra",
        "Faslodex",
        "Febuxostat",
        "Felodipine",
        "Femara",
        "Fenofibrate",
        "Fentanyl",
        "Ferrous",
        "Sulfate",
    ]
)

medication_cluster_map = dict()
for i, cluster in enumerate(lasa_clusters):
    for member in cluster:
        medication_cluster_map[member] = i

medication_code_map = dict()
for i, med in enumerate(meds):
    medication_code_map[97182630832753 + 2 * i] = med

print(medication_code_map)

patients = [
    "Nelson Mandela",
    "Barack Obama",
    "Ethan Keller",
    "Mas Volkers",
    "Roisin Bonis",
    "Daniela Toader",
    "Helen Keller",
    "Jacky Chan",
    "Will Smith",
    "Johnny Depp",
]

patient_code_map = dict()
for i, patient in enumerate(patients):
    patient_code_map[193623 + 2 * i] = patient

print(patient_code_map)

patient_medications = {
    "Nelson Mandela": ["Femara"],
    "Barack Obama": [],
    "Ethan Keller": ["Amitriptyline", "Zestoretic"],
    "Mas Volkers": [],
    "Roisin Bonis": ["Ferrous"],
    "Daniela Toader": ["Faslodex", "Sulfate"],
    "Helen Keller": ["Prednisolone"],
    "Jacky Chan": ["Nifedipine", "Prednisolone"],
    "Will Smith": ["arxiga"],
    "Johnny Depp": [],
}
