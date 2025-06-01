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
import { StudentSelector } from './pages/StudentSelector';

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
        {/* ↓ Ruta Estudiante/Docente, con componentes renderizados según el rol */}
        <ProtectedRoute path="/resultados/:id" component={() => <ResultSelectedPage />} />

        <ProtectedRoute path="/evaluaciones" isTeacherRoute={ true } component={() => <StudentSelector />} />
        <ProtectedRoute path="/evaluaciones/estudiante/:id" isTeacherRoute={ true } component={() => <><p>Holaa</p></> } />
        <ProtectedRoute path='/diagnosticar/:id' isTeacherRoute={ true } component={() => <><p>Holaa</p></>} />
        <Route path="*" component={() => <NotFoundPage />} />
      </Switch>
    </AuthProvider>
  )
}

export default App
