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
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    display: 'table-cell',
    backgroundColor: '#7FB5FF',
    border: '1px solid #525E75',
    borderRadius: '6px',
  },
  teacherInfoDiv: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  teacherInfo: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#82A284',
    padding: '3px',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: '6px',
    borderTopLeftRadius: '6px',
  },
  teacherName: {
    fontSize: '16px',
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
    fontWeight: 400,
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
      background: '#7FB5FF',
    },
  },
});

type TeacherProps = {
  id: number;
  subId: number;
  chapter: any;
};

const Teacher = (props: TeacherProps) => {
  const classes = useStyles();
  let classNumber = storeClass.getState().classNumber;

  const [teacherName, setTeacherName] = React.useState(props.chapter.teacher);
  const [chapterName, setChapterName] = React.useState(props.chapter.chName);

  storeClass.subscribe(() => {
    classNumber = storeClass.getState().classNumber;

    const subjectInfo = ClassAppTree[classNumber].subjects.map((sb: any) => sb);

    setTeacherName(subjectInfo[props.subId].chapters[props.id].teacher);
    setChapterName(subjectInfo[props.subId].chapters[props.id].chName);
  });

  const d = new Date();

  return (
    <Box className={classes.parentDiv}>
      <div
        key={Math.random()}
        className={`${classes.content} ${classes.backgroundTransition}`}
      >
        <div className={classes.teacherInfoDiv}>
          <Typography variant='caption' className={classes.teacherInfo}>
            Chapter name : {chapterName}
          </Typography>
          <Typography
            variant='subtitle2'
            fontWeight={600}
            className={classes.teacherName}
          >
            {teacherName}
          </Typography>

          <span className={classes.timeRenderer}> time : {d.getTime()} </span>
        </div>
      </div>
    </Box>
  );
};

export default Teacher;
