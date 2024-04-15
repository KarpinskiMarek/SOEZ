import styled from "styled-components";
import React, {useEffect, useState} from "react";
import LinkButton from "../Home/LinkButton";
import TravelTile from "./TravelTile";
import {isLoggedIn} from "../../service/AuthenticationService";
import {formatDate, getAllTrips} from "../../service/TripService";


const TripsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 95%;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 2rem auto;
  border-radius: 5px;
  padding: 2rem;
`;

const TilesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
`;

const CreateButton = styled(LinkButton)`
  width: 600px;
  margin: 5rem;
`;

const Trips = () => {


    const [trips, setTrips] = useState([]);

    const fetchTrips = async () => {
        const tripsData = await getAllTrips();
        setTrips(tripsData);
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    return(
        <TripsDiv>
            <CreateButton to={"/trips/new"} buttonText={"Utwórz podróż"} t/>
            <TilesList>
                {trips.map((trip) => (
                    <TravelTile
                        key={trip.id}
                        title={trip.title}
                        dateFrom={formatDate(trip.startingDate)}
                        dateTo={formatDate(trip.endingDate)}
                    />
                ))}
            </TilesList>
        </TripsDiv>
    )
}

export default Trips;