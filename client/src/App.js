import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Box,
  ChakraProvider,
  CSSReset,
  extendTheme,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavBar } from './components/NavBar/NavBar';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register/Register';
import { AuthContext } from './Context/AuthContext';
import { CreateExpense } from './components/CreateExpense/CreateExpense';
import { Home } from './components/Home/Home';
import { UserProfile } from './UserProfile/UserOptionsTab';
import { AddFriends } from './components/AddFriends/AddFriends';
import { Dashboard } from './components/Dashboard/Dashboard';
import Profile from './UserProfile/ProfileConfig/ProfileConfig';
import { CompanyDetail } from './components/Dashboard/Companies/CompanyDetail';

export const App = () => {
  const { user } = useContext(AuthContext);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: useColorModeValue('white', 'rgb(26,27,32)'),
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box
        className="App"
        style={{
          width: '100%',
          height: '100%',
          margin: '0',
          padding: '0',
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/gastos/crear"
            element={user ? <CreateExpense /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/amigos/agregar"
            element={user ? <AddFriends /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/cuentas/balances"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/companies/:companyName"
            element={user ? <CompanyDetail /> : <Navigate to="/login" replace />}
          />
          <Route
            path="*"
            element={!user ? <Navigate to="/login" replace /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};

