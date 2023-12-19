import RegisterForm from "./RegisterForm";

const Register = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            margin: "auto",
            marginBottom: "100px",
        }}>
            <RegisterForm/>
        </div>
    )
}
export default Register;