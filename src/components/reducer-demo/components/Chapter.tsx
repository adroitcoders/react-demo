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
    verticalAlign: 'middle',
    fontWeight: 700,
    color: '#FFF',
  },
  content: {
    display: 'table-cell',
    backgroundColor: '#79DAE8',
    border: '1px solid #525E75',
    borderRadius: '6px',
  },
  chapterInfoDiv: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  chapterInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '12px',
    fontWeight: 500,
    color: '#82A284',
    padding: '3px',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: '6px',
    borderTopLeftRadius: '6px',
  },
  chapterName: {
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
  backgroundTransitionn: {
    position: 'relative',
    animation: '$fadeOut 4s',
  },
  '@keyframes fadeOut': {
    '0%': {
      background: '#FFF',
    },
    '100%': {
      background: '#79DAE8',
    },
  },
});

type ChapterProps = {
  id: number;
  subId: number;
  subName: string;
  chapter: any;
};

const Chapter = (props: ChapterProps) => {
  const classes = useStyles();
  let classNumber = storeClass.getState().classNumber;

  const [chapterName, setChapterName] = React.useState(props.chapter.chName);
  const [subjectName, setSubjectName] = React.useState(props.subName);

  storeClass.subscribe(() => {
    classNumber = storeClass.getState().classNumber;

    const subjectInfo = ClassAppTree[classNumber].subjects.map((sb: any) => sb);
    setChapterName(subjectInfo[props.subId].chapters[props.id].chName);
    setSubjectName(subjectInfo[props.subId].subName);
  });

  const d = new Date();

  return (
    <Box className={classes.parentDiv}>
      <div
        key={Math.random()}
        className={`${classes.content} ${classes.backgroundTransitionn}`}
      >
        <div className={classes.chapterInfoDiv}>
          <div className={classes.chapterInfo}>
            <Typography variant='caption'>Subject : {subjectName}</Typography>
            <Typography variant='caption'>
              Chapter No. : {props.chapter.chNo}
            </Typography>
          </div>

          <Typography
            variant='subtitle1'
            fontWeight={700}
            className={classes.chapterName}
          >
            {chapterName}
          </Typography>

          <span className={classes.timeRenderer}> time : {d.getTime()} </span>
        </div>
      </div>
    </Box>
  );
};

export default Chapter;
