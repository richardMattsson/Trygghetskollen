import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./Hero.css";
import { useContext } from "react";
import { ResultContext } from "../contexts/ResultContext";
import { Typography } from "@mui/material";

function Hero() {
  const navigate = useNavigate();
  const { totalScore, setTotalScore } = useContext(ResultContext);

  function handleClick() {
    setTotalScore(null);
    navigate("/test");
  }

  return (
    <section className="primary-color hero-section">
      <div className="hero-div">
        <SafetyCheckIcon
          className="hero-child"
          color="secondary"
          sx={{
            fontSize: { xs: 64, sm: 84, md: 100 },
          }}
        />
        <Typography
          className="secondary-color hero-child"
          sx={{
            fontSize: { xs: 18, sm: 20, md: 24 },
          }}
          mx={{ xs: 5, sm: 7, md: 10 }}
        >
          <span style={{ fontWeight: 700 }}>Trygghetskollen</span> hjälper dig
          att undvika eventuella bedrägeriförsök och ger tips på hur du kan
          skydda dig.
        </Typography>
      </div>
      <div>
        <Button
          onClick={handleClick}
          variant="contained"
          color="contrast"
          size={"medium"}
          sx={{
            ":hover": { bgcolor: "contrast.light" },
            fontWeight: 600,
            fontSize: "1em",
            padding: "15px",
          }}
        >
          {totalScore > 0 ? "Testa igen" : "Starta test"}
        </Button>
      </div>
    </section>
  );
}

export default Hero;
