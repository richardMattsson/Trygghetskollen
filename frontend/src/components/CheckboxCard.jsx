import { Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { ResultContext } from "../contexts/ResultContext";
import { UserContext } from "../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

function CheckboxCard() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [checked, setChecked] = useState(null);
  const { result, setResult, setTotalScore } = useContext(ResultContext);
  const { user } = useContext(UserContext);
  const endpoint = pathname.split("number")[0];

  const { data, isPending, error } = useQuery({
    queryKey: [endpoint],
    staleTime: 1000 * 60 * 30,
    queryFn: () => fetch(`/api${endpoint}`).then((result) => result.json()),
  });

  const handleChange = (event) => {
    checked === event.target.name
      ? setChecked(null)
      : setChecked(event.target.name);

    const updatedArray = result.filter(
      (item) => item.question !== questionNumber,
    );

    updatedArray.push({
      question: questionNumber,
      result: parseInt(event.target.value),
    });

    setResult(updatedArray);
  };

  const questionNumber = parseInt(pathname.split("=")[1]);
  const questionIndex = parseInt(pathname.split("=")[1] - 1) || 0;

  function handleClickBack() {
    navigate(`${endpoint}number=${questionNumber - 1}`);
    setChecked(null);
  }
  function handleClickForward() {
    navigate(`${endpoint}number=${questionNumber + 1}`);
    setChecked(null);

    if (questionNumber === 5) {
      const testScore = result.reduce((acc, cur) => acc + cur.result, 0);
      console.log("testScore", testScore);
      setTotalScore(testScore);
      if (user) {
        fetch(`/api/testResult/${user.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ result: testScore }),
        });
      }

      navigate("/");
    }
  }

  const answeralternative = [
    { id: 1, answer: "Ja", value: 3 },
    { id: 2, answer: "Nej", value: 1 },
    { id: 3, answer: "Osäker", value: 2 },
  ];

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", maxWidth: { xs: 360, sm: 500 }, mx: "auto" }}
    >
      <CardContent>
        {error && <p>Något gick fel...</p>}
        {isPending && (
          <>
            <CircularProgress color="contrast" thickness={7} size={75} />
            <p>Hämtar frågorna</p>
          </>
        )}
        {data && questionNumber && (
          <>
            <CardHeader title={data[questionIndex].question} />
            <FormControl
              sx={{
                flexGrow: 1,
                display: "flex",

                justifyContent: "end",
                alignItems: "end",
                gap: 5,
              }}
            >
              <FormLabel
                id="check-buttons-group-label"
                sx={{
                  justifyContent: "center",

                  flexGrow: "1fr",
                  color: "black",
                  "&:focus": { color: "black" },
                }}
              >
                {`Fråga ${data[questionIndex].id} av 5`}
              </FormLabel>
              <FormGroup
                style={{
                  flexGrow: "1fr",
                  display: "flex",
                }}
              >
                {answeralternative.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        checked={checked === item.answer ? true : false}
                        name={item.answer}
                      />
                    }
                    labelPlacement="start"
                    onChange={handleChange}
                    label={item.answer}
                    value={item.value}
                  />
                ))}
              </FormGroup>
              <section
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {questionNumber && (
                  <Button
                    onClick={handleClickBack}
                    disabled={questionNumber === 1}
                    variant="contained"
                    color="contrast"
                    size="medium"
                    sx={{
                      ":hover": { bgcolor: "contrast.light" },
                      fontWeight: 600,
                      padding: "10px",
                      flexGrow: "auto",
                      minWidth: "125px",
                    }}
                  >
                    Föregående
                  </Button>
                )}

                <Button
                  onClick={handleClickForward}
                  disabled={!checked}
                  variant="contained"
                  color="contrast"
                  size="medium"
                  sx={{
                    ":hover": { bgcolor: "contrast.light" },
                    fontWeight: 600,
                    padding: "10px",
                    flexGrow: "auto",
                    minWidth: "125px",
                  }}
                >
                  Nästa
                </Button>
              </section>
            </FormControl>
          </>
        )}
      </CardContent>
    </Card>
  );
}
export default CheckboxCard;
