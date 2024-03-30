import { Outlet } from "react-router-dom";
import MyNavbar from "./Shared/MyNavbar/MyNavbar";
import Footer from "./Shared/Footer/Footer";

function App() {
  return (
    <div className="mt-1 mx-4 border min-h-screen">
      <MyNavbar></MyNavbar>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
