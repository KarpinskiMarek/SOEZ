import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Trips from "./components/Trip/Trips";
import NewTrip from "./components/Trip/NewTrip";
import PrivateRoute from "./components/PrivateRoute";
import TripDetails from "./components/Trip/TripDetails";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/register"} element={<Register/>}/>
          </Route>
            <Route path={"/"} element={<Layout/>}>
                <Route path={"/"} element={<PrivateRoute/>}>
                    <Route path={"/trips"} element={<Trips/>}/>
                    <Route path={"/trips/new"} element={<NewTrip/>}/>
                    <Route path={"/trips/details"} element={<TripDetails/>} />
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>    
  );
};

export default App;