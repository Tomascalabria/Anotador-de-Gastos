    import React, { useState, useEffect, useContext } from 'react';
    import axios from 'axios';
    import { AuthContext } from '../../../Context/AuthContext';
    import { PieChart } from '@mui/x-charts/PieChart';
import { Donut } from '../Portfolio/donut';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { LineChart } from '../Portfolio/linechart';

    export const Portfolio = ({company}) => {
    const { user } = useContext(AuthContext);

    const [holdings, setHoldings] = useState([]);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const { name, type, logo, about, id } = company;

    const fetchCredentials = async () => {
        try {
        const response = await axios.get(
            `http://127.0.0.1:8000/credentials/${id}/${user.userInfo._id}/`
        );
        if (response.data) {
            setCredentials({
            username: response.data.username,
            password: response.data.password,
            });
        } else {
            console.log("Credentials not found");
        }
        } catch (error) {
        console.error("Error fetching credentials:", error);
        }
    };
    useEffect(() => {
        fetchCredentials();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/holding/${user.userInfo._id}/${id}/`, {
                params: {
                username: credentials.username,
                password: credentials.password,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        setHoldings(response.data);
        console.log(holdings)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


// Ensure credentials are set before fetching data
        if (credentials.username && credentials.password) {
        fetchData();
        }
    }, [credentials]);

 
    const chartSeries = [{
        name: 'Sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    
      }];
    
      const chartOptions = {
        chart: {
          id: 'line-chart',
          toolbar: {
            show: true,
          
          style:{
            colors: useColorModeValue('rgb(26,27,32)','white'), 
          }
        }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          labels: {
            style: {
              colors: useColorModeValue('rgb(26,27,32)','white'), 
            },
          },
        },
      yaxis: {
    title: {
      text: 'Revenue',
      style: {
        color: useColorModeValue('rgb(26,27,32)', 'white'), // Set the color directly here for y-axis titlez
            }
          },
        },
      };
      
    
 

    return(
<>
  <Container width={'40%'} justifyContent={'right'} display={'flex'}  height={'100%'}>
    {/* Donut component here */}
    <Donut holdings={holdings} />
  </Container>
  <Container display={'Flex'} justifyContent={'left'}>
    {/* LineChart component here */}
    <LineChart  series={chartSeries} options={chartOptions} />
  </Container>
</>

        );
    };
