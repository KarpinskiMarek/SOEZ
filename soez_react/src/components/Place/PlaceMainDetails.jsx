import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {formatDateInput} from "../../service/TripService";
import {getPlace} from "../../service/PlaceService";

const PlaceInfo = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 2px black;
  border-radius: 5px;
  width: 50%;
  background-color: rgba(255, 255, 255, 1);
  padding: 1rem;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlaceName = styled.input`
  margin: 1rem;
  width: 400px;
  height: 50px;
  border: none;
  font-size: 20px;
  text-align: center;
  text-decoration: underline;
`;

const PlaceDate = styled.input`
  margin: 1rem;
  width: 150px;
  height: 20px;
`;

const SubmitButton = styled.button`
  color: black;
  font-weight: bold;
  padding: 10px 20px;
  border: solid black 2px;
  border-radius: 10px;
  margin: 10px;
  text-decoration: none;
  background-color: #48cae4;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: #0077b6;
  }
`;

const PlaceMainDetails = ({ placeId }) => {

    const [data, setData] = useState({
        name: "",
        arrive: "",
        leave: "",
        ticket: "",
        country: ""
    });

    const fetchPlace = async () => {
        const placeData = await getPlace(placeId);
        if(placeData) {
            setData(placeData);
        }
    }

    useEffect(() => {
        fetchPlace();
    }, []);

    const [errors, setErrors] = useState({
        name: "",
        arrive: "",
        leave: "",
        ticket: "",
        country: ""
    });

    const handleNameChange = (event) => {
        const { value } = event.target;
        setData({ ...data, name: value});
    };

    const handleArriveChange = (event) => {
        const { value } = event.target;
        setData( {...data, arrive: value});
    }

    const handleLeaveChange = (event) => {
        const { value } = event.target;
        setData( {...data, leave: value});
    }

    const handleTicketChange = (event) => {
        const { value } = event.target;
        setData( {...data, ticket: value});
    }

    const handleCountryChange = (event) => {
        const { value } = event.target;
        setData( {...data, country: value});
    }



    return(
        <PlaceInfo>
            <Left>
                <PlaceName
                    type={"text"}
                    value={data ? data.name : ''}
                    onChange={handleNameChange}
                />
                <PlaceName
                    type={"text"}
                    value={data ? data.country : ''}
                    onChange={handleCountryChange}
                />
            </Left>
            <Right>
                <p>Od:</p>
                <PlaceDate
                    type={"date"}
                    value={data ? formatDateInput(data.arrive) : ''}
                    onChange={handleArriveChange}
                />
                <PlaceDate
                    type={"date"}
                    value={data ? formatDateInput(data.leave) : ''}
                    onChange={handleLeaveChange}
                />
            </Right>
            <SubmitButton type={"submit"}>Zapisz</SubmitButton>
        </PlaceInfo>
    )
}

export default PlaceMainDetails;