import React from "react";

const FormGroup = ({ type, value, placeholder, errorText, onChange }) => {
    return (
        <div style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            padding: "5px",
            marginLeft: "8px",
            marginRight: "8px",
            width: "300px",
            overflow: "hidden"
        }}>
            <input style={{
                padding: "12px",
                fontSize: "1rem",
                borderRadius: "12px",
                border: "1px solid black",
                marginBottom: "8px"
            }} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}/>
            <span style={{
                fontSize: "0.8rem",
                color: "red"
            }}>{errorText}</span>
        </div>      
    );
};

export default FormGroup;