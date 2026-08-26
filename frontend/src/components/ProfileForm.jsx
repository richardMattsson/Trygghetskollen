import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ProfileForm({ user, setUser, setIsEditing, setSnackbar }) {
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setSnackbar({
        open: true,
        message: "Användarnamn får inte vara tomt",
        severity: "error",
      });
      return;
    }

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Något gick fel");

      setUser((prev) => ({
        ...prev,
        username: data.data.username,
        password: data.data.password,
      }));
      setSnackbar({
        open: true,
        message: "Din profil uppdaterades!",
        severity: "success",
      });
      setIsEditing(false);
      setPassword("");
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        label="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mr: 1 }}
      />
      <TextField
        type="password"
        label="Nytt lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained">
        Spara ändringar
      </Button>
      <Button variant="text" onClick={() => setIsEditing(false)} sx={{ mt: 1 }}>
        Avbryt
      </Button>
    </form>
  );
}

export default ProfileForm;
