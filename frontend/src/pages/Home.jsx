import Hero from "../components/Hero";
import Wall from "../components/Wall";
import Articles from "../components/Articles";
import Box from "@mui/material/Box";
import ImportantLinks from "../components/ImportantLinks";
import Result from "../components/Result";
import { useContext } from "react";
import { ResultContext } from "../contexts/ResultContext";

function Home() {
  const { totalScore } = useContext(ResultContext);
  return (
    <>
      <Hero />
      {totalScore && <Result />}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
          gap: { xs: 2, md: 3 },
          mt: 2,
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box>
          <Box>
            <Articles />
            <ImportantLinks />
          </Box>
        </Box>

        <Box>
          <Wall />
        </Box>
      </Box>
    </>
  );
}

export default Home;
