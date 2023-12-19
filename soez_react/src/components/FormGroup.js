import React from "react";

const FormGroup = ({ type, value, placeholder, errorText, onChange }) => {
    return (
        <div style={{
            marginBottom: "16px"
        }}>
            <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}/>
            <span>{errorText}</span>
        </div>      
    );
};

export default FormGroup;