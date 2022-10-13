import React from "react";
import { useNavigate } from 'react-router-dom';

import { makeStyles } from "@mui/styles";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  parentDiv: {
    padding: "50px",
    '@media only screen and (max-width: 600px)': {
      padding: '24px',
    },
  },
  titleText: {
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 700,
    borderBottom: '5px solid #D3DEDC',
    marginBottom: '50px',
  },
  payementModesDivParent: {
    display: "flex",
    justifyContent: "space-around",
  },
  payementMode: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    height: "200px",
    marginBottom: "20px",
    borderRadius: "6px",
    cursor: "pointer",
  },
});

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '1.25rem',
  color: '#FFF',
  lineHeight: 1.5,
  backgroundColor: '#313552',
  height: '70px',
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
});

const PaymentOptions = () => {
  const navigate = useNavigate()
  const classes = useStyles();

  const [paymentMode, setPaymentMode] = React.useState("");

  const handleClick = (paymentMode: string) => {
    setPaymentMode(paymentMode);
    navigate(`/payment/${paymentMode.toLowerCase()}`)
  };

  const paymentModes = ['Paypal', 'Razorpay', 'Stripe']

  return (
    <div className={classes.parentDiv}>
      {paymentMode === "" && (
        <div className={classes.payementModesDivParent}>
          <Stack minWidth={320} maxWidth={500} spacing={3}>
            <Box className={classes.titleText}>Payment Modes Available!</Box>
            {paymentModes.map((mode: any, idx: any) => 
              <StyledButton
                key={idx}
                onClick={() => handleClick(mode)}
              >
                {mode} 
              </StyledButton>
            )}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
