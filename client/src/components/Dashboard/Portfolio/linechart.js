import React from 'react';
import Chart from 'react-apexcharts';


export const LineChart = ({ series, options }) => {
    return (
      <div>
        <div id="chart" >
          <Chart options={options}  series={series} type="line" height={'300' } width={'550'} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  };
  