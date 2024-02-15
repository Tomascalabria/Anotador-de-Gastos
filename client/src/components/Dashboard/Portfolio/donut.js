    import React from 'react';
    import Chart from 'react-apexcharts';

    export const Donut = ({ holdings }) => {
      // Assuming holdings is an array with a 'weight' property for each holding
      const series = holdings.map((holding) => holding.weight);
      const labels = holdings.map((holding) => holding.ticker);

      const options = {
        labels:labels    
    };
    const styles = {

      donut: {
        position: 'relative',
        justifyContent:'center',
        display:'flex',
        alignItems:'center',
        height:'300px',
        width:'350px' 
    }  
    };

    return (
        <div className="donut" style={styles.donut} >
          <Chart options={options} series={series} type="donut" width="350" />
        </div>
    );

    }