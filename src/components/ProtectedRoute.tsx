import { type ComponentType, useContext } from "react";
import { Route, Redirect, type RouteComponentProps } from "wouter";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import { UserRole } from "../lib/enum";

interface ProtectedRouteProps {
  path: string;
  isTeacherRoute?: boolean;  
  component: ComponentType<RouteComponentProps>;
}

const ProtectedRoute = ({ path, isTeacherRoute = false, component }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext)
  if (!authContext) throw new Error('La página debe utilizarse dentro de un AuthProvider');

  const { user, isLoading } = authContext;  
  if (isLoading) return <Loading />;

  if (!user) return <Redirect to="/" />
  if (isTeacherRoute && user.role !== UserRole.TEACHER) return <Redirect to="/" />

  return <Route path={path} component={ component } />

}

export default ProtectedRoute;