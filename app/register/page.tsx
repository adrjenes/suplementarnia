import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWraps";
import RegisterForm from "@/app/register/RegisterForm";

const Register = () => {
    return (
        <Container>
            <FormWrap>
                <RegisterForm/>
            </FormWrap>
        </Container>
    )
}
export default Register;