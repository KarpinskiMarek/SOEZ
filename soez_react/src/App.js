import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Trips from "./components/Trip/Trips";
import NewTrip from "./components/Trip/NewTrip";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/register"} element={<Register/>}/>
              <Route path={"/trips"} element={<Trips/>}/>
              <Route path={"/trips/new"} element={<NewTrip/>}/>
          </Route>
        </Routes>
      </BrowserRouter>    
  );
};

export default App;