import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";

function TestResultsList() {
  const { user } = useContext(UserContext);
  const { data, isPending, error } = useQuery({
    queryKey: ["testResults"],
    queryFn: () =>
      fetch(`/api/testResult/${user.id}`).then((result) => result.json()),
  });

  return (
    <>
      {error && <span>Något gick fel med att hämta datan.</span>}
      {isPending && (
        <>
          <CircularProgress color="primary" thickness={5} size={50} />
        </>
      )}
      {data && data.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent
            sx={{
              gap: 3,
              display: "flex",
              flexDirection: "column",
              padding: 4,
            }}
          >
            <CardHeader title="Tidigare gjorda test" />
            {data.map((result) => (
              <List
                key={result.id}
                sx={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  display: "flex",
                }}
              >
                <ListItem>
                  <ListItemText
                    primary="Resultat:"
                    secondary={`${result.result} av 15`}
                  />
                  {result.result < 6 ? (
                    <SafetyCheckIcon sx={{ color: "green" }} />
                  ) : (
                    <SafetyCheckIcon
                      sx={{ color: result.result > 10 ? "red" : "gold" }}
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Datum:"
                    secondary={new Date(result.created_at).toLocaleString()}
                  />
                </ListItem>
              </List>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default TestResultsList;
