import './App.css';
import { Route, Switch } from 'wouter';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { NotFoundPage } from './pages/404';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { ProfilePage } from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Toaster richColors />
        <Switch>
        <Route path="/" component={() => <HomePage />} />
        <Route path="/iniciar-sesion" component={() => <LoginPage />} />
        <ProtectedRoute path="/perfil" component={() => <ProfilePage />} />

        <ProtectedRoute path="/cuestionarios" component={() => <><h1>Ruta de estudiante</h1></>} />
        <ProtectedRoute path="/resultados" component={() => <><h1>Ruta de estudiante</h1></>} />

        <ProtectedRoute path="/evaluaciones" isTeacherRoute={ true } component={() => <><h1>Ruta de docente</h1></>} />
        <Route path="*" component={() => <NotFoundPage />} />
      </Switch>
    </AuthProvider>
  )
}

export default App
