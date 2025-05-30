import './App.css';
import { Route, Switch } from 'wouter';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { NotFoundPage } from './pages/404';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { ProfilePage } from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { TestSelectorPage } from './pages/TestSelector';
import { TestSelectedPage } from './pages/TestSelected';
import { ResultSelectedPage } from './pages/ResultSelected';
import { ResultSelectorPage } from './pages/ResultSelector';

function App() {
  return (
    <AuthProvider>
      <Toaster richColors />
        <Switch>
        <Route path="/" component={() => <HomePage />} />
        <Route path="/iniciar-sesion" component={() => <LoginPage />} />
        <ProtectedRoute path="/perfil" component={() => <ProfilePage />} />

        <ProtectedRoute path="/cuestionarios" component={() => <TestSelectorPage />} />
        <ProtectedRoute path="/cuestionarios/:id" component={() => <TestSelectedPage />} />
        <ProtectedRoute path="/resultados" component={() => <ResultSelectorPage />} />
        <ProtectedRoute path="/resultados/:id" component={() => <ResultSelectedPage />} />

        <ProtectedRoute path="/evaluaciones" isTeacherRoute={ true } component={() => <><h1>Ruta de docente</h1></>} />
        <Route path="*" component={() => <NotFoundPage />} />
      </Switch>
    </AuthProvider>
  )
}

export default App
