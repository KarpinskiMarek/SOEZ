import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import FormGroup from "../Auth/FormGroup";

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

    const handleSubmit = (event) => {
        console.log(formData);
    }

    const validateForm = () => {

    }

    return (
        <TripForm onSubmit={handleSubmit}>
        </TripForm>
    )
}

export default NewTripForm;