import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {editTrip, formatDateInput, getTrip} from "../../service/TripService";

const TripInfo = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 2px black;
  border-radius: 5px;
  width: 50%;
`;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TripTitle = styled.input`
   margin: 1rem;
   width: 400px;
   height: 50px;
   border: none;
   font-size: 20px;
   text-align: center;
`;

const TripDate = styled.input`
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

const TripDetailsMainInfo = ({ tripId }) => {

    const [data, setData] = useState({
       title: '',
       startingDate: '',
       endingDate: ''
    });

    const fetchTrip = async () => {
        const tripData = await getTrip(tripId);
        console.log(tripData)
        if (tripData) {
            setData(tripData);
        }
    }

    useEffect(() => {
        fetchTrip();
    }, [tripId]);

    const handleTitleChange = (event) => {
        const { value } = event.target;
        setData({ ...data, title: value });
    };

    const handleStartingDateChange = (event) => {
        const { value } = event.target;
        setData({ ...data, startingDate: value });
    };

    const handleEndingDateChange = (event) => {
        const { value } = event.target;
        setData({ ...data, endingDate: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await editTrip(tripId, data.startingDate, data.endingDate, data.title);
            if (response && response.status === 201) {
                navigate(`/trips/details/${tripId}`);
            }
        } catch (error) {
            console.log("Error while submit edit form:", error);
        }
    }

    return (
        <TripInfo onSubmit={handleSubmit}>
            <div>
                <TripTitle
                    type={"text"}
                    value={data ? data.title : ''}
                    onChange={handleTitleChange}
                />
            </div>
            <Right>
                <p>Od:</p>
                <TripDate
                    type={"date"}
                    value={data ? formatDateInput(data.startingDate) : ''}
                    onChange={handleStartingDateChange}
                />
                <p>Do:</p>
                <TripDate
                    type={"date"}
                    value={data ? formatDateInput(data.endingDate) : ''}
                    onChange={handleEndingDateChange}
                />
            </Right>
            <SubmitButton type={"submit"}>Zapisz</SubmitButton>
        </TripInfo>
    )
}

export default TripDetailsMainInfo;