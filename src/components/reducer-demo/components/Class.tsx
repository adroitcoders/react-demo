import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { storeClass } from '../reducer';

const useStyles = makeStyles({
  parentDiv: {
    display: 'table-row',
    position: 'relative',
    textAlign: 'center',
    marginTop: '10px',
    color: '#FFF',
    '@media only screen and (max-width: 600px)': {
      display: 'inline-block',
    },
  },
  classInfoBtn: {
    '&.firstClass': {
      backgroundColor: '#002366',
    },
  },
  timeRenderer: {
    position: 'absolute', 
    bottom: '2px', 
    right: '2px', 
    fontSize: '10px',
    '@media only screen and (max-width: 600px)': {
      position: 'static',
      display: 'block',
      width: '100%',
      marginTop: '5px'
    },
  },
})

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '30px',
  fontWeight: 700,
  color: '#FFF',
  lineHeight: 1.5,
  backgroundColor: '#2155CD',
  height: '100%',
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#002366',
    borderColor: '#005cbf',
  },
  '&:focus': {
    backgroundColor: '#002366'
  },
  '@media only screen and (max-width: 600px)': {
    display: 'block',
    padding: '16px',
  },
  '@media only screen and (max-width: 400px)': {
    padding: '8px',
  },
});

type ClassNumber = {
  classNumber: number | string,
  id: number,
}

const Class = (props: ClassNumber) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const d = new Date();

  let classNumber = storeClass.getState().classNumber;

  const handleClassClick = () => {
    storeClass.dispatch({
      type: "updateClassNumber",
      classNumber: props.id,
    });

    let classListEl = document.getElementById("classList");
    classListEl?.classList.remove("firstClass");
  };

  return (
    <Box className={classes.parentDiv}>
      <StyledButton
        id='classList'
        onClick={handleClassClick}
        fullWidth
        className={`${classes.classInfoBtn} ${
          classNumber === props.id ? 'firstClass' : ''
        }`}
      >
        <Typography 
          variant={isMobile ? 'h6' : 'h4'}
          fontWeight={700}
        >
          Class #{props.classNumber}
        </Typography>
        <span className={classes.timeRenderer}> time : {isMobile ? d.getSeconds() : d.getTime()} </span>
      </StyledButton>
    </Box>
  );
};

export default Class;