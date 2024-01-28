import React from "react";
import styled from "styled-components";

const FormGroupDiv = styled.div`
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        padding: 5px;
        margin-left: 8px;
        margin-right: 8px;
        width: 300px;
        overflow: hidden;
    `;

const FormGroupInput = styled.input`
        padding: 12px;
        font-size: 1rem;
        border-radius: 12px;
        border: 1px solid black;
        margin-bottom: 8px;
    `;

const FormGroupSpan = styled.span`
        font-size: 0.8rem;
        color: red;
    `;

const FormGroup = ({ type, value, placeholder, errorText, onChange }) => {

    return (
        <FormGroupDiv>
            <FormGroupInput type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}/>
            <FormGroupSpan>
                {errorText}
            </FormGroupSpan>
        </FormGroupDiv>
    );
};

export default FormGroup;