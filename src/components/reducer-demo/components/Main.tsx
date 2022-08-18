import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

//Components
import Class from './Class';
import Subject from './Subject';
import Chapter from './Chapter';
import Teacher from './Teacher';

import ClassAppTree from '../ClassAppTree.json';

const useStyles = makeStyles({
  header: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#2C3333',
    color: '#E0DDAA',
    fontWeight: 700,
    padding: '6px',
  },
  gridItem: {
    display: 'table',
    height: '93vh',
    borderSpacing: '8px',
  },
  gridItemClassMobile: {
    display: 'table',
    height: '50vh',
    borderSpacing: '8px',
  },
  title: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 600,
    height: '30px',
    border: '1px solid #205375',
    backgroundColor: '#EFFFFD',
    color: '#2A2550',
    borderTopLeftRadius: '6px',
    borderTopRighttRadius: '6px',
  },
  timeRenderer: {
    position: 'absolute',
    fontSize: '14px',
    top: 0,
    right: 0,
    color: '#FFF',
    '@media only screen and (max-width: 600px)': {
      fontSize: '10px',
    },
  },
});

const ReducerDemoComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let d = new Date();

  return (
    <Grid container>
      <span className={classes.timeRenderer}>Time Rendered: {d.getTime()}</span>
      <div className={classes.header}>
        <span>React Demo App(Reducer)</span>
      </div>
      <Grid
        item
        lg={3}
        sm={6}
        xs={12}
        className={isMobile ? classes.gridItemClassMobile : classes.gridItem}
      >
        <th className={classes.title}>Classes</th>
        {ClassAppTree.map((cls: any, idx: number) => (
          <Class key={idx} id={idx} classNumber={cls.classNo} />
        ))}
      </Grid>

      <Grid item lg={3} sm={6} xs={12} className={classes.gridItem}>
        <th className={classes.title}>Subjects</th>
        {ClassAppTree.map(
          (cls: any, idx: number) =>
            idx === 0 &&
            cls.subjects.map((sub: any, idx: number) => (
              <Subject key={idx} id={idx} subjectType={sub.type} />
            ))
        )}
      </Grid>
      <Grid item lg={3} sm={6} xs={12} className={classes.gridItem}>
        <th className={classes.title}>Chapters</th>
        {ClassAppTree.map(
          (cls: any, idx: number) =>
            idx === 0 &&
            cls.subjects.map((sub: any, subIdx: number) =>
              sub.chapters.map((ch: any, idx: number) => (
                <Chapter
                  key={idx}
                  id={idx}
                  subId={subIdx}
                  chapter={ch}
                  subName={sub.subName}
                />
              ))
            )
        )}
      </Grid>
      <Grid item lg={3} sm={6} xs={12} className={classes.gridItem}>
        <th className={classes.title}>Teachers</th>
        {ClassAppTree.map(
          (cls: any, idx: number) =>
            idx === 0 &&
            cls.subjects.map((sub: any, subIdx: number) =>
              sub.chapters.map((ch: any, idx: number) => (
                <Teacher key={idx} id={idx} subId={subIdx} chapter={ch} />
              ))
            )
        )}
      </Grid>
    </Grid>
  );
}

export default ReducerDemoComponent;
export const ReducerDemo = React.memo(ReducerDemoComponent);