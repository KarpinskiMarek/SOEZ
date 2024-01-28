import React, {useState} from "react";
import FormGroup from "./FormGroup";
import * as validationRules from "../service/ValidationRules";
import {request, setAuthHeader} from "../service/AuthenticationService";
import styled from "styled-components";

const StyledForm = styled.form`
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

const StyledButton = styled.button`
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

const RegisterForm = () => {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {

            request(
                "POST",
                "/api/auth/register",
                {
                    firstName: formData.firstname,
                    lastName: formData.lastname,
                    email: formData.email,
                    password: formData.password
                }).then(
                (response) => {
                    setAuthHeader(response.data.token);
                    console.log("Zarejestrowano")
                }).catch(
                (error) => {
                    setAuthHeader(null);

                });


                    //console.log("Udana rejestracja pod mailem: " + formData.email)

        }else {
            console.log("Formularz zawiera błędy. Nie można wysłać danych. ", formData)
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!validationRules.isRequired(formData.firstname)) {
            newErrors.firstname = "Pole jest wymagane";
            isValid = false;
        }else if (!validationRules.checkLength(formData.firstname, 3, 20)) {
            newErrors.firstname = "Pole musi zawierać od 3 do 20 znaków";
            isValid = false;
        }

        if (!validationRules.isRequired(formData.lastname)) {
            newErrors.lastname = "Pole jest wymagane";
            isValid = false;
        }else if (!validationRules.checkLength(formData.lastname, 3, 20)) {
            newErrors.lastname = "Pole musi zawierać od 3 do 20 znaków";
            isValid = false;
        }

        if (!validationRules.isRequired(formData.email)) {
            newErrors.email = "Pole jest wymagane";
            isValid = false;
        }else if (!validationRules.isValidEmail(formData.email)) {
            newErrors.email = "Podano błędny adres email";
            isValid = false;
        }

        if(!validationRules.isRequired(formData.password)) {
            newErrors.password = "Hasło jest wymagane";
            isValid = false;
        }else if (!validationRules.checkLength(formData.password, 8, 20)) {
            newErrors.password = "Hasło musi posiadać od 8 do 20 znaków"
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
      <StyledForm onSubmit={handleSubmit}>
          <FormGroup
              type={"text"}
              value={formData.firstname}
              placeholder={"Podaj imię"}
              onChange={(value) => setFormData({ ...formData, firstname: value})}
              errorText={errors.firstname}
          />
          <FormGroup
              type={"text"}
              value={formData.lastname}
              placeholder={"Podaj nazwisko"}
              onChange={(value) => setFormData( { ...formData, lastname: value})}
              errorText={errors.lastname}
          />
          <FormGroup
              type={"text"}
              value={formData.email}
              placeholder={"Podaj adres email"}
              onChange={(value) => setFormData( { ...formData, email: value})}
              errorText={errors.email}
          />
          <FormGroup
              type={"password"}
              value={formData.password}
              placeholder={"Podaj hasło"}
              onChange={(value) => setFormData({...formData, password: value})}
              errorText={errors.password}
          />
          <StyledButton type={"submit"}>Zarejestruj się</StyledButton>
      </StyledForm>
    );
};

export default RegisterForm;