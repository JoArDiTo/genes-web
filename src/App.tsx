import { BrowserRouter, Route, Routes } from 'react-router';
import { LoginUserView } from './views/auth/LoginUserView';
import { HomeView } from './views/access';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Autenticación */}
        <Route path="auth/login" element={<LoginUserView />} />

        {/* Dashboard con rutas protegidas */}
        <Route index element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
