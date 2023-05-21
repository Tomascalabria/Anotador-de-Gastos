import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register/Register';
import { AuthContext, AuthContextProvider } from './Context/AuthContext';
import { ExpensesList } from './components/ItemList/ExpensesList';
import { CreateExpense } from './components/CreateExpense/CreateExpense';
import { Home } from './components/Home/Home';
import { UserProfile } from './UserProfile/UserProfile';
import { AddFriends } from './components/AddFriends/AddFriends';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.js';
import { useContext } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
export const App=()=> {
  const {user} = useContext(AuthContext)
  return (
    <div className="App">
    <NavBar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {!user ? (
        <Route path="/login" element={<Login />} />
      ) : <>
      <Route path="/register" element={<Register />} />
      <Route path="/gastos/crear" element={<CreateExpense />} />
      <Route path="/amigos/agregar" element={<AddFriends />} />
      <Route path="/gastos/ver" element={<ExpensesList />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </>}
    </Routes>
  </div>
    
);

}


