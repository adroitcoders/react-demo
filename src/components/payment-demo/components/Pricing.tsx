import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import PaymentOptions from "./PaymentOptions";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { storePlanDetails } from "./Reducer";

const tiers = [
  {
    title: "Starter",
    price: 200,
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonVariant: "outlined",
    headerBackground: "#C7B198",
  },
  {
    title: "Premium",
    subheader: "Most popular",
    price: 500,
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonVariant: "contained",
    headerBackground: "#F0D9FF",
  },
  {
    title: "Premium Plus",
    price: 1000,
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonVariant: "outlined",
    headerBackground: "#EDEDD0",
  },
];

function PricingContent() {
  //STATES
  const [planInfo, setPlanInfo] = React.useState({
    plan: "",
    price: 0,
  });

  const [checkedEvent, setCheckedEvent] = React.useState({
    id: null,
    checked: false,
  });

  //EVENT HANDLERS
  const clickHandler = (plan: string, planPrice: number) => {
    setPlanInfo({
      plan: plan,
      price: planPrice,
    });
    storePlanDetails.dispatch({
      type: "updatePlanDetails",
      membership: plan,
      yearly: checkedEvent.checked,
      price: planPrice,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: any
  ) => {
    setCheckedEvent({
      id: idx,
      checked: event.target.checked,
    });
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      {planInfo.plan === "" && (
        <Container maxWidth="md" component="main">
          <Typography
            style={{ marginTop: "20px", marginBottom: "20px" }}
            textAlign="center"
            variant="h4"
          >
            Available Plans!
          </Typography>
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier, idx: number) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Enterprise" ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    action={tier.title === "Pro" ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    sx={{
                      backgroundColor: tier.headerBackground,
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        ${tier.price}
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>

                  <FormGroup>
                    <FormControlLabel
                      style={{ marginLeft: "20px" }}
                      control={
                        <Checkbox
                          checked={
                            checkedEvent.id === idx
                              ? checkedEvent.checked
                              : false
                          }
                          onChange={(e) => handleChange(e, idx)}
                        />
                      }
                      label="Subscribe for Yearly"
                    />
                  </FormGroup>

                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant as "outlined" | "contained"}
                      onClick={() => clickHandler(tier.title, tier.price)}
                    >
                      Get the plan
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {planInfo.plan !== "" && <PaymentOptions />}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
