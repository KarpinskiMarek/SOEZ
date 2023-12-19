import React, {useState} from "react";
import FormGroup from "./FormGroup";
import * as validationRules from "../ValidationRules";

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
            console.log("Formularz poprawny. Wysyłam dane:", formData)
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
          >Zarejestruj się</button>
      </form>
    );
};

export default RegisterForm;