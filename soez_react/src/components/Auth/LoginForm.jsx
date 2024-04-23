import React, {useState} from "react";
import AuthFormGroup from "./AuthFormGroup";
import * as validationRules from "../../service/ValidationRules";
import {request, setAuthHeader} from "../../service/AuthenticationConfig";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import * as service from "../../service/AuthenticationService"

const StyledForm = styled.form`
    background-color: rgba(255,255,255,0.9);
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

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await service.login(formData.username, formData.password);
                console.log(response);
                if (response && response.status === 200) {
                    setAuthHeader(response.data.accessToken);
                    navigate("/trips");
                }
            } catch (error) {
                console.error("Error while login:", error);
            }
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

    return (
        <StyledForm onSubmit={handleSubmit}>
            <AuthFormGroup
                type={"text"}
                value={formData.username}
                placeholder={"Podaj adres email"}
                onChange={(value) => setFormData({ ...formData, username: value})}
                errorText={errors.username}
            />
            <AuthFormGroup
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