import axios from "axios";

export const loginProcess = async (userCredentials, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await axios.post('http://localhost:5050/auth/login', userCredentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    saveToken(response.data.token); // Save the token separately
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};

export const logoutProcess = async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_START', payload: null });
    saveToken(null); // Save null to remove the token
  } catch (err) {
    console.log(err);
  }
};

// Helper function to save the token to localStorage
const saveToken = (token) => {
  if (token) {
    window.localStorage.setItem('token', JSON.stringify(token));
  } else {
    window.localStorage.removeItem('token');
  }
};

