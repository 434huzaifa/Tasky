import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home/Home";
import Login from "../AuthPage/Login";
import Register from "../AuthPage/Register";


const router = createBrowserRouter([
  {
    path:"/",
    element:<App></App>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      
    ]
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/reg",
    element:<Register></Register>
  }
]);
export default router;
