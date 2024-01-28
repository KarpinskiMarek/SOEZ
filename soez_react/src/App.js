import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Trips from "./components/Trips";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/register"} element={<Register/>}/>
              <Route path={"/trips"} element={<Trips/>} />
          </Route>
        </Routes>
      </BrowserRouter>    
  );
};

export default App;