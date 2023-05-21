import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export const ProtectedRoute = ({ path, element }) => {
  const { user } = useContext(AuthContext);

  return user ? <Route path={path} element={element} /> : <Navigate to="/login" replace />;
};
