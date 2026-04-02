import { Outlet, Navigate } from 'react-router-dom'

const useAuth = () => {
  const user = localStorage.getItem('user')
  return !!user;
}

const ProtectedRoute = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
