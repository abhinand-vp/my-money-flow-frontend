import React from 'react';
import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";


const Graphs = ({ chartData }) => {
  return (
    <Box sx={{ border: 3, border : 'none' ,borderRadius: 3 }}>
      <Bar data={chartData} />

    </Box>
  )
}

export default Graphs