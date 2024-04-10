import RegisterForm from "./RegisterForm";
import styled from "styled-components";

const StyledRegisterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: auto;
    margin-bottom: 100px;
`;

const Register = () => {
    return (
        <StyledRegisterDiv>
            <RegisterForm/>
        </StyledRegisterDiv>
    )
}
export default Register;