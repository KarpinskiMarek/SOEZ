import React, {useState} from "react";
import FormGroup from "./FormGroup";

const LoginForm = () => {
    
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
    }
    
    return (
        <form style={{
            backgroundColor: "white",
            padding: "10rem",
            borderRadius: "10px"
        }} onSubmit={handleSubmit}>
            <FormGroup
                label={"Email"}
                type={"text"}
                value={formData.username}
                placeholder={"Podaj adres email"}
                onChange={(value) => setFormData({ ...formData, username: value})} 
            />
            <FormGroup 
                label={"Hasło"}
                type={"password"}
                value={formData.password}
                placeholder={"Podaj hasło"}
                onChange={(value) => setFormData({...formData, password: value})}
            />
            <button type={"submit"}>Zaloguj się</button>
        </form>
    )
}

export default LoginForm;