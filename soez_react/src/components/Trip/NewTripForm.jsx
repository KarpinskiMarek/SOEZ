import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import TripFormGroup from "./TripFormGroup";
import * as service from "../../service/TripService";

const TripForm = styled.form`
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

const NewTripForm = () => {

    const [formData, setFormData] = useState({
        title: "",
        startingDate: "",
        endingDate: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        startingDate: "",
        endingDate: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await service.createTrip(formData.title, formData.startingDate, formData.endingDate);
            if (response && response.status === 201) {
                navigate("/trips");
            }
        } catch (error) {
            console.error("Error while creating trip:", error);
        }
    }

    const validateForm = () => {

    }

    return (
        <TripForm onSubmit={handleSubmit}>
            <TripFormGroup
                labelText={"Nazwa: "}
                type={"text"}
                value={formData.title}
                placeholder={"Wpisz nazwę..."}
                onChange={(value) => setFormData({ ...formData, title: value})}
                errorText={errors.title}
            />
            <TripFormGroup
                labelText={"Data rozpoczęcia: "}
                type={"date"}
                value={formData.startingDate}
                onChange={(value) => setFormData({ ...formData, startingDate: value})}
                errorText={errors.startingDate}
            />
            <TripFormGroup
                labelText={"Data zakończenia: "}
                type={"date"}
                value={formData.endingDate}
                onChange={(value) => setFormData({ ...formData, endingDate: value})}
                errorText={errors.endingDate}
            />
            <SubmitButton type={"submit"}>Utwórz podróż</SubmitButton>
        </TripForm>
    )
}

export default NewTripForm;