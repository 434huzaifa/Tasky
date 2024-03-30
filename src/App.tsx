import { Outlet } from "react-router-dom";
import MyNavbar from "./Shared/MyNavbar/MyNavbar";
import Footer from "./Shared/Footer/Footer";

function App() {
  return (
    <div className="mt-1 mx-4">  
      <MyNavbar></MyNavbar>
      <div className="min-h-[86vh]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
