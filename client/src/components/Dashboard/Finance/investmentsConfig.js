import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

export const investmentsConfig = () => {
  const { user } = useContext(AuthContext);
  const username=''
  const company_id='1'
  const password=''
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/credentials/${company_id._id}/`, {
          user_id: user._id,
          company_id:company_id,
          username:username,
          password: password
        });
        console.log(response.data); // Handle the response data
      } catch (error) {
        console.error(error); // Handle the error
      }
    };

    fetchData();
  }, [user]);

  return <div>investmentsConfig</div>;
};
