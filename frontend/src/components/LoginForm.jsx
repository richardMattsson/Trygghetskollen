import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import CardContent from "@mui/material/CardContent";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

function LoginForm({ setUser, setSnackbar }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.user) {
        setUser({ id: data.user.id, username: data.user.username });
        setSnackbar({
          open: true,
          message: "Inloggning lyckades!",
          severity: "success",
        });
        navigate("/#");
      } else {
        setSnackbar({
          open: true,
          message: data.message,
          severity: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Ett fel uppstod, försök igen",
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
      <Card
        sx={{
          maxWidth: { xs: 300, sm: 400 },
          width: "100%",
          padding: 3,
          boxShadow: 6,
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Logga in
          </Typography>
          <form
            onSubmit={handleLogin}
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
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={username.length === 0 || password.length === 0}
              sx={{ mt: 1 }}
            >
              Logga in
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginForm;
