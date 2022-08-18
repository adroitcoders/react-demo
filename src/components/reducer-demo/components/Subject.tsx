import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import { storeClass } from '../reducer';
import ClassAppTree from '../ClassAppTree.json';

const useStyles = makeStyles({
  parentDiv: {
    display: 'table-row',
    position: 'relative',
    fontSize: '22px',
    fontWeight: 700,
    color: '#FFF',
  },
  content: {
    display: 'table-cell',
    backgroundColor: '#0AA1DD',
    border: '1px solid #525E75',
    textAlign: 'center',
    borderRadius: '6px',
  },
  subjectInfo: {
    width: '100%',
    textAlign: 'center',
  },
  subjectType: {
    padding: '2px',
    backgroundColor: '#FFFFFF',
    color: '#82A284',
    borderTopRightRadius: '6px',
    borderTopLeftRadius: '6px',
  },
  subjectInfoDiv: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  subjectName: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeRenderer: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    fontSize: '10px',
  },
  backgroundTransition: {
    position: 'relative',
    animation: '$fadeOut 4s',
  },
  '@keyframes fadeOut': {
    '0%': {
      background: '#FFF',
    },
    '100%': {
      background: '#0AA1DD',
    },
  },
});

type SubjectProps = {
  subjectType: string;
  id: number;
};

const Subject = (props: SubjectProps) => {
  const classes = useStyles();
  let classNumber = storeClass.getState().classNumber;
  let subjectJSon = ClassAppTree[classNumber].subjects[props.id];

  const [subjectName, setSubjectName] = React.useState(subjectJSon.subName);

  storeClass.subscribe(() => {
    classNumber = storeClass.getState().classNumber;
    setSubjectName(ClassAppTree[classNumber].subjects[props.id].subName);
  });

  const d = new Date();

  return (
    <Box className={`${classes.parentDiv}`}>
      <div
        key={Math.random()}
        className={`${classes.content} ${classes.backgroundTransition}`}
      >
        <div className={classes.subjectInfoDiv}>
          <Typography 
            variant='h6' 
            fontSize={18} 
            className={classes.subjectType}
          >
            #{props.subjectType} subject
          </Typography>

          <Typography
            variant='h5'
            fontWeight={700}
            className={classes.subjectName}
          >
            {subjectName}
          </Typography>
        </div>

        <span className={classes.timeRenderer}> time : {d.getTime()} </span>
      </div>
    </Box>
  );
};

export default Subject;
