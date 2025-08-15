import { BrowserRouter, Route, Routes } from "react-router";
import { HomeView } from "./views/access";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
