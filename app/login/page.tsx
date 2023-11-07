import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWraps";
import LoginForm from "@/app/login/LoginForm";

const Login = () => {
    return (
        <Container>
            <FormWrap>
                <LoginForm/>
            </FormWrap>
        </Container>
    )
}
export default Login;