import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Trips from "./components/Trip/Trips";
import NewTrip from "./components/Trip/NewTrip";
import PrivateRoute from "./components/PrivateRoute";
import TripDetails from "./components/Trip/TripDetails";
import Friends from "./components/Friends/Friends";
import AddFriend from "./components/Friends/AddFriend";
import Place from "./components/Place/Place";
import NewPlace from "./components/Place/NewPlace";

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
                    <Route path={"/trips/details/:id"} element={<TripDetails/>} />
                    <Route path={"/trips/:id/places/new"} element={<NewPlace/>} />
                    <Route path={"/trips/:tripId/places/details/:placeId"} element={<Place/>} />
                    <Route path={"/friends"} element={<Friends/>} />
                    <Route path={"/friends/add"} element={<AddFriend/>} />
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>    
  );
};

export default App;