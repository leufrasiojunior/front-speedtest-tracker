import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import "./styles/styles.css";
import "./styles/Customs.css";

function App() {
  document.title = "Home - Dashboard SpeedTest Tracker";
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
