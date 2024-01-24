import React, {useState} from "react";
import FormGroup from "./FormGroup";
import * as validationRules from "../ValidationRules";
import {request, setAuthHeader} from "../service/AxiosHelper";
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

const LoginForm = () => {
    
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        if (validateForm()) {

            request(
                "POST",
                "/api/auth/login",
                {
                    email: formData.username,
                    password: formData.password
                }).then(
                (response) => {
                    console.log(response.data)
                    setAuthHeader(response.data.accessToken);
                    console.log("Udane logowanie: " + response.data.accessToken);
                }).catch(
                (error) => {
                    setAuthHeader(null);
                });

        }else {
            console.log("Formularz zawiera błędy. Nie można wysłać danych. ", formData)
        }
    }
    
    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };
        
        if (!validationRules.isRequired(formData.username)) {
            newErrors.username = "Pole wymagane";
            isValid = false;
        }else if (!validationRules.isValidEmail(formData.username)) {
            newErrors.username = "Podano błędny adres email";
            isValid = false;
        }else {
            newErrors.username = "";
        }
        
        if (!validationRules.isRequired(formData.password)) {
            newErrors.password = "Pole wymagane";
            isValid = false;
        } else {
            newErrors.password = "";
        }
        setErrors(newErrors);
        return isValid;
    }
    
    const [isButtonHovered, setButtonHovered] = useState(false);
    
    return (
        <StyledForm onSubmit={handleSubmit}>
            <FormGroup
                type={"text"}
                value={formData.username}
                placeholder={"Podaj adres email"}
                onChange={(value) => setFormData({ ...formData, username: value})}
                errorText={errors.username}
            />
            <FormGroup
                type={"password"}
                value={formData.password}
                placeholder={"Podaj hasło"}
                onChange={(value) => setFormData({...formData, password: value})}
                errorText={errors.password}
            />
            <StyledButton type={"submit"}>Zaloguj się</StyledButton>
        </StyledForm>
    )
}
export default LoginForm;