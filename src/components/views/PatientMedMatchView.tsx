import Navigation from "../Navigation";

interface PatientMedMatchViewProps {}

const PatientMedMatchView: React.FC<PatientMedMatchViewProps> = (props) => {
  return (
    <>
      <div style={{ backgroundColor: "#ADD8E6", height: "100vh" }}>
        <p style={{ width: "100%", textAlign: "center", top: "20%", position: "absolute", fontSize: "35px", fontWeight: "bold", color: "white" }}>Patient Medication Match</p>
        
      </div>
      <Navigation activeKey={url} />
    </>
  );
};

export const url = "/patient_med_match"
export default PatientMedMatchView;
