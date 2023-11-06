import "./App.css";
import { AppRouter } from "./appRouter";
import DefaultLayout from "./components/layout/DefaultLayout";

function App() {
  
  return (
    <DefaultLayout>
      <AppRouter />
    </DefaultLayout>
  );
}

export default App;
