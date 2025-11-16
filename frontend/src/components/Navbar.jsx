import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserContext } from "../contexts/UserContext";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

import "./Navbar.css";
import { ResultContext } from "../contexts/ResultContext";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { setTotalScore } = useContext(ResultContext);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setTotalScore(null);
    setIsLoggedIn(false);
    navigate("/");
    setUser(null);
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Logo component={Link} to="/" className="Navbar-logo" />

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="black" component={Link} to="/">
            Hem
          </Button>
        </Box>

        {isLoggedIn ? (
          <>
            <Button color="black" component={Link} to="/profile">
              Profil
            </Button>
            <Button
              color="black"
              sx={{ backgroundColor: "#ffce2e" }}
              onClick={handleLogout}
            >
              Logga ut
            </Button>
          </>
        ) : (
          <Link to="/login">
            <AccountCircleIcon
              color="contrast"
              sx={{ width: "2em", height: "2em" }}
            />
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
