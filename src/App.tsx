import { BrowserRouter, Route, Routes } from 'react-router';
import { LoginUserView } from './views/auth/LoginUserView';
import {
  EvaluationDetailView,
  HomeView,
  MyEvaluationsView,
  MyProfileView,
  TestAvailablesView,
  TestFormView,
} from './views/access';
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
              <Route path="cuestionarios">
                <Route index element={<TestAvailablesView />} />
                <Route path=":uuid" element={<TestFormView />} />
              </Route>
              <Route path="mis-evaluaciones" element={<MyEvaluationsView />} />
              <Route
                path="evaluacion/:uuid"
                element={<EvaluationDetailView />}
              />
              <Route path="estudiantes" element={<h1>Estudiantes</h1>} />
              <Route path="perfil" element={<MyProfileView />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
