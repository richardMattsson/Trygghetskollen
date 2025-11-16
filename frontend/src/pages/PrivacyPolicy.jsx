import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function PrivacyPolicy() {
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
              Integritetspolicy
            </Typography>
            <Typography variant="body1" component="div">
              Vi behöver spara och behandla personuppgifter om dig, så som
              användarnamn och lösenord. Syftet med en sådan behandling är för
              att kunna spara resultat från gjorda tester.
            </Typography>
            <Typography variant="body1" component="div">
              Vi har fått dina uppgifter då du skapade ett konto hos oss. Detta
              är ett krav för att kunna logga in och spara resultat från gjorda
              tester. Vi tillämpar vid var tid gällande integritetslagstiftning
              vid all behandling av personuppgifter. Den rättsliga grunden för
              att behandla dina personuppgifter är avtal med den registrerade.
              Du har när som helst rätt att säga upp ditt avtal med oss. Ett
              återkallande påverkar inte lagligheten av behandlingen innan
              avtalet återkallades. Dina uppgifter kommer att sparas tills dess
              att Trygghetskollen läggs ned senast den 30 november 2025.
            </Typography>
            <Typography variant="body1" component="div">
              De personuppgifter vi behandlar om dig delas med
              personuppgiftsansvariga. Vi kan även komma att dela dina
              personuppgifter med en tredje part, förutsatt att vi är skyldiga
              att göra så enligt lag. Däremot kommer vi aldrig att överföra dina
              uppgifter till ett land utanför EU.
            </Typography>
            <Typography variant="body1" component="div">
              Du har rätt att kontakta oss om du vill ha ut information om de
              uppgifter vi har om dig, för att begära rättelse, överföring eller
              för att begära att vi begränsar behandlingen, för att göra
              invändningar eller begära radering av dina uppgifter.
            </Typography>

            <Typography variant="h5" component="div">
              Kontakt
            </Typography>
            <Typography variant="body1" component="div">
              Dataskyddsombud: rasmus.hanzen@iths.se
            </Typography>
            <Typography variant="body1" component="div">
              Personuppgiftsansvarig: richard.mattsson@iths.se
            </Typography>

            <Typography variant="h5" component="div">
              Rapportering av misstänkta bedrägerier
            </Typography>
            <Typography variant="body1" component="div">
              På vår webbplats kan du rapportera misstänkta bedrägerier och
              lämna information såsom telefonnummer. Vi använder och visar upp
              dessa uppgifter för att varna andra användare och förebygga
              bedrägerier.
            </Typography>
            <Typography variant="body1" component="div">
              Endast relevant information publiceras, och vi hanterar den enligt
              GDPR. Personer vars uppgifter publiceras kan när som helst
              kontakta oss för att få dem borttagna.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </article>
  );
}

export default PrivacyPolicy;
