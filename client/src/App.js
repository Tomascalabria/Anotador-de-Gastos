import { useColorModeValue } from '@chakra-ui/react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register/Register';
import { AuthContext, AuthContextProvider } from './Context/AuthContext';
import { ExpensesList } from './components/ItemList/ExpensesList';
import { CreateExpense } from './components/CreateExpense/CreateExpense';
import { Home } from './components/Home/Home';
import { UserProfile } from './UserProfile/UserOptionsTab';
import { AddFriends } from './components/AddFriends/AddFriends';
import { useContext } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
import Profile from './UserProfile/ProfileConfig/ProfileConfig';

export const App = () => {
  const { user } = useContext(AuthContext);
  const bg=useColorModeValue('gray.100', 'gray.800')
  return (
    
    <div className="App" style={{ width: '100%', height: '100%', margin: '0', padding: '0', background: bg }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Use the Route component with condition for routes that require authentication */}
        <Route
          path="/gastos/crear"
          element={user ? <CreateExpense /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/amigos/agregar"
          element={user ? <AddFriends /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/gastos/ver"
          element={user ? <ExpensesList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cuentas/balances"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" replace />}
        />
        {/* If the user is not logged in, redirect to the login page */}
        <Route path="*" element={!user ? <Navigate to="/login" replace /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
