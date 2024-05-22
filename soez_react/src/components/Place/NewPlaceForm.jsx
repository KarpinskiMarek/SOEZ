import React, {useState} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import TripFormGroup from "../Trip/TripFormGroup";
import * as service from "../../service/PlaceService";

const PlaceFrom = styled.form`
  background-color: white;
  padding: 7rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  border: solid 2px black;
  background-color: rgba(255,255,255,1.0);
`;

const SubmitButton = styled.button`
  border: solid 2px black;
  border-radius: 12px;
  background-color: #6b9080;
  transition: background-color 0.3s;
  padding: 10px;
  padding-left: 18px;
  padding-right: 18px;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
  &:hover {
    background-color: #a4c3b2;
  }
`;

const NewPlaceForm = ( {tripId} ) => {



    const [formData, setFormData] = useState({
        name: "",
        arrive: "",
        leave: "",
        ticket: "",
        country: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        arrive: "",
        leave: "",
        ticket: "",
        country: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await service.addPlace(
                tripId,
                formData.name,
                formData.arrive,
                formData.leave,
                formData.ticket,
                formData.country
            );
            console.log(response);
            if (response && response.status === 201) {
                navigate(`/trips/details/${tripId}`);
            }
        } catch (error) {
            console.error("Error while adding new place:", error);
        }
    }

    const validateForm = () => {

    }

    return (
        <PlaceFrom onSubmit={handleSubmit}>
            <TripFormGroup
                labelText={"Nazwa: "}
                type={"text"}
                value={formData.name}
                placeholder={"Podaj nazwę"}
                onChange={(value) => setFormData({...formData, name: value})}
                errorText={errors.name}
            />
            <TripFormGroup
                labelText={"Przyjazd: "}
                type={"date"}
                value={formData.arrive}
                onChange={(value) => setFormData({...formData, arrive: value})}
                errorText={errors.arrive}
            />
            <TripFormGroup
                labelText={"Wyjazd: "}
                type={"date"}
                value={formData.leave}
                onChange={(value) => setFormData({...formData, leave: value})}
                errorText={errors.leave}
            />
            <TripFormGroup
                labelText={"Bilet na przejazd: "}
                type={"file"}
                value={formData.ticket}
                onChange={(value) => setFormData({...formData, ticket: value})}
                errorText={errors.ticket}
            />
            <TripFormGroup
                labelText={"Państwo: "}
                type={"text"}
                value={formData.country}
                placeholder={"Podaj państwo"}
                onChange={(value) => setFormData({...formData, country: value})}
                errorText={errors.country}
            />
            <SubmitButton type={"submit"}>Dodaj miejsce</SubmitButton>
        </PlaceFrom>
    )

}

export default NewPlaceForm;