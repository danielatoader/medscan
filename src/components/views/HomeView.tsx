import { Button, Stack } from "react-bootstrap";
import { Navigation } from "../Navigation";

interface HomeViewProps {}

const HomeView: React.FC<HomeViewProps> = (props) => {
  return (
    <>
      <div style={{ backgroundColor: "#ADD8E6", height: "100vh" }}>
        <p style={{ width: "100%", textAlign: "center", top: "20%", position: "absolute", fontSize: "60px", fontWeight: "bold", color: "white" }}>Welcome</p>
        <div style={{ position: "relative", top: "50%", left: "50%" }}>
          <Stack
            style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
            gap={2}
            className="col-md-5 mx-auto"
          >
            <Button href="/scan" size="lg" variant="secondary">
              LASA Check
            </Button>
            <Button size="lg" variant="secondary">
              Patient Medication Match
            </Button>
          </Stack>
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default HomeView;
