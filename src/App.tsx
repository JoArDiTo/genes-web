import { BrowserRouter, Route, Routes } from 'react-router';
import { LoginUserView } from './views/auth/LoginUserView';
import { HomeView } from './views/access';
import { AccessDashboard } from './views/layouts';
import { AuthProvider } from './contexts';
import { PrivateRoute } from './components/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Autenticación */}
          <Route path="auth/login" element={<LoginUserView />} />

          {/* Dashboard con rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route element={<AccessDashboard />}>
              <Route index element={<HomeView />} />
              <Route
                path="cuestionarios"
                element={<h1>Tests disponibles</h1>}
              />
              <Route
                path="mis-evaluaciones"
                element={<h1>Mis evaluaciones</h1>}
              />
              <Route path="estudiantes" element={<h1>Estudiantes</h1>} />
              <Route path="perfil" element={<h1>Mi perfil</h1>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
