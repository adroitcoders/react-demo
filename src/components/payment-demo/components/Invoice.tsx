import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const useStyles = makeStyles({
  invoiceHeader: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "20px",
  },
  tableContainer: {
    display: "inline-block",
    marginTop: "20px",
  },
  table: {
    maxWidth: "500px",
    margin: "auto",
  },
  checkCircleIcon: {
    height: "60px !important",
    width: "60px !important",
    fill: "#2EB086 !important",
  },
  detailsHeading: {
    marginTop: "8px",
  },
});

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  textAlign: "center",
  height: "40px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
  textAlign: "center",
  padding: "10px",
}));

type InvoiceProps = {
  plan: string;
  userDetails: {
    name: string;
    email: string;
  };
  billingDetails: {
    name: string;
    email: string;
    paymentMode: string;
    isYearly: string;
    amount: string;
    billingStartDate?: string;
    nextBillingDate?: string;
  };
};

const Invoice = (props: InvoiceProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.invoiceHeader}>
        <CheckCircleIcon className={classes.checkCircleIcon} />
        <Typography variant="h4" color="#2EB086">
          Payment Successful
        </Typography>
      </div>

      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table}>
          <StyledTableHead>
            <Typography className={classes.detailsHeading}>
              User Details
            </Typography>
          </StyledTableHead>
          <TableBody>
            <>
              {Object.entries(props.userDetails).map(([key, value]) => (
                <StyledTableRow>
                  <StyledTableCell>{key}</StyledTableCell>
                  <StyledTableCell>{value}</StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <StyledTableCell>Plan</StyledTableCell>
                <StyledTableCell>{props.plan}</StyledTableCell>
              </StyledTableRow>
            </>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table}>
          <StyledTableHead>
            <Typography className={classes.detailsHeading}>
              Billing Details
            </Typography>
          </StyledTableHead>
          <TableBody>
            {Object.entries(props.billingDetails).map(([key, value]) => (
              <StyledTableRow>
                <StyledTableCell>{key}</StyledTableCell>
                <StyledTableCell>{value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Invoice;
