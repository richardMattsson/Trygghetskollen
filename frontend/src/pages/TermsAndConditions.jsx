import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function TermsAndConditions() {
  return (
    <article
      className="primary-color"
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Card sx={{ padding: 5, mb: 4 }}>
          <CardContent
            sx={{ gap: 3, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h2" component="div">
              Användarvillkor
            </Typography>

            <Typography variant="body1" component="div">
              Dessa användarvillkor gäller för användning av Trygghetskollen.
              Genom att använda tjänsten godkänner du villkoren. Vi kan
              uppdatera villkoren när som helst, och fortsatt användning innebär
              att du accepterar ändringarna.
            </Typography>

            <Typography variant="h5" component="div">
              Syfte med tjänsten
            </Typography>
            <Typography variant="body1" component="div">
              Trygghetskollen låter användare söka efter telefonnummer, länkar
              och namn för att se om bedrägeriförsök rapporterats, samt skicka
              in egna rapporter. Tjänsten får endast användas för att förebygga
              bedrägerier.
            </Typography>

            <Typography variant="h5" component="div">
              Personuppgifter
            </Typography>
            <Typography variant="body1" component="div">
              Vid registrering sparar vi den information du lämnar för att kunna
              hantera konto och visa dina rapporter. All behandling av
              personuppgifter sker enligt vår{" "}
              <Link to={"/privacy-policy"}>Integritetspolicy</Link> och gällande
              lag (GDPR).
            </Typography>

            <Typography variant="h5" component="div">
              Ditt ansvar
            </Typography>
            <Typography variant="body1" component="div">
              Du ansvarar för att uppgifterna du lämnar är korrekta och att du
              inte rapporterar falsk, vilseledande eller kränkande information.
              Tjänsten får inte användas för trakasserier, bakgrundskontroller,
              diskriminering eller andra olagliga syften. Missbruk kan leda till
              avstängning.
            </Typography>

            <Typography variant="h5" component="div">
              Ändringar och drift
            </Typography>
            <Typography variant="body1" component="div">
              Vi kan när som helst ändra, begränsa eller avsluta funktioner i
              tjänsten. Vi ansvarar inte för tekniska fel, driftstörningar eller
              eventuella konsekvenser av felaktig användarinformation.
            </Typography>

            <Typography variant="h5" component="div">
              Användargenererat innehåll
            </Typography>
            <Typography variant="body1" component="div">
              När du skickar in en rapport ger du Trygghetskollen rätt att
              lagra, visa och använda informationen för att informera andra
              användare och förebygga bedrägerier.
            </Typography>

            <Typography variant="h5" component="div">
              Tvister
            </Typography>
            <Typography variant="body1" component="div">
              Vid tvist rekommenderar vi att du kontaktar oss via våra
              kontaktuppgifter. Om du inte accepterar villkoren är ditt enda
              alternativ att sluta använda tjänsten.
            </Typography>

            <Typography variant="h5" component="div">
              Brott mot villkoren
            </Typography>
            <Typography variant="body1" component="div">
              Vid överträdelse av villkoren kan din rätt att använda
              Trygghetskollen omedelbart avslutas.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </article>
  );
}

export default TermsAndConditions;
