import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";

function RegisterForm({ setSnackbar }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setSnackbar({
        open: true,
        message: "Fyll i både användarnamn och lösenord",
        severity: "error",
      });
      return;
    }

    if (!acceptTerms) {
      setSnackbar({
        open: true,
        message: "Du måste godkänna villkoren för att fortsätta",
        severity: "error",
      });
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Något gick fel");

      setSnackbar({
        open: true,
        message: "Konto skapades!",
        severity: "success",
      });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", padding: 3, boxShadow: 6 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Skapa konto
          </Typography>
          <form
            onSubmit={handleRegister}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="username">Användarnamn</InputLabel>
              <OutlinedInput
                id="username"
                label="Användarnamn"
                type="text"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="password">Lösenord</InputLabel>
              <OutlinedInput
                id="password"
                label="Lösenord"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
              }
              label={
                <>
                  Jag godkänner{" "}
                  <Link
                    to={"/terms-and-conditions"}
                    style={{ textDecoration: "none", color: "#1976d2" }}
                  >
                    användarvillkoren
                  </Link>
                </>
              }
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={
                !acceptTerms || username.length === 0 || password.length === 0
              }
              sx={{ mt: 1 }}
            >
              Skapa konto
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterForm;
