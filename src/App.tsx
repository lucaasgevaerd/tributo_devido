import { Navigate } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./appRouter";
import DefaultLayout from "./components/layout/DefaultLayout";

function App() {
  
  return (
    <DefaultLayout>
      <AppRouter />
      <Navigate to="/taxRecovery" replace />
    </DefaultLayout>
  );
}

export default App;
