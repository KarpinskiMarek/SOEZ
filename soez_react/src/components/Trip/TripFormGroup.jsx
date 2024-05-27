import React from 'react';
import styled from "styled-components";

const FormGroupDiv = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-left: 8px;
  margin-right: 8px;
  width: 500px;
`;

const FormLabel = styled.label`
    font-size: 20px;
    font-weight: bold;
`;

const FormInput = styled.input`
  padding: 12px;
  font-size: 1rem;
  border-radius: 12px;
  border: 1px solid black;
  margin-bottom: 8px;
`;

const FormSpan = styled.span`
  font-size: 0.8rem;
  color: red;
`;

const TripFormGroup = ({ labelText, type, value, placeholder, errorText, onChange}) => {
    return (
      <FormGroupDiv>
          <FormLabel>{labelText}</FormLabel>
          <FormInput type={type}
                     value={type === "file" ? undefined : value}
                     placeholder={placeholder}
                     onChange={onChange} />
          <FormSpan>{errorText}</FormSpan>
      </FormGroupDiv>
    );
};

export default TripFormGroup;