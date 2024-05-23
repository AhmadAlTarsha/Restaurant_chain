import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const CenteredCircularProgress = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <CircularProgress/>
    </Box>
  );
};

export default CenteredCircularProgress;
