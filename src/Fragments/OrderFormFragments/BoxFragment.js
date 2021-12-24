import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MultiStepForm from '../../Forms/MultiStepForm';
import { Box, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
        <Paper className={classes.root} elevation={0}>
            <MultiStepForm />
        </Paper>
  );
}
