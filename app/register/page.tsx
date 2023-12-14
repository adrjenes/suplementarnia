import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWraps";
import RegisterForm from "@/app/register/RegisterForm";
import {getCurrentUser} from "@/actions/getCurrentUser";

const Register = async () => {
    const currentUser = await getCurrentUser();
    return (
        <Container>
            <div className="h-[700px] flex justify-center items-center">
                <RegisterForm currentUser={currentUser}/>
            </div>
        </Container>
    )
}
export default Register;