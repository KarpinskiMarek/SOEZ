import React, {useState} from "react";
import FormGroup from "./FormGroup";
import * as validationRules from "../ValidationRules";

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
        if (validateForm()) {
            console.log("Formularz poprawny. Wysyłam dane:", formData)
        }else  {
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
        <form style={{
            backgroundColor: "white",
            padding: "7rem",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto"
        }} onSubmit={handleSubmit}>
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
            <button style={{
                border: "solid 2px black",
                borderRadius: "12px",
                backgroundColor: isButtonHovered ? "#6b9080" : "#a4c3b2",
                transition: "background-color 0.3s",
                padding: "10px",
                paddingLeft: "18px",
                paddingRight: "18px",
                marginLeft: "8px",
                marginRight: "8px"
            }} type={"submit"}
                    onMouseEnter={() => setButtonHovered(true)} 
                    onMouseLeave={() => setButtonHovered(false)}
            >Zaloguj się</button>
        </form>
    )
}
export default LoginForm;