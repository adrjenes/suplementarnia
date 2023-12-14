import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWraps";
import LoginForm from "@/app/login/LoginForm";
import {getCurrentUser} from "../../actions/getCurrentUser";

const Login = async () => {
    const currentUser = await getCurrentUser();
    return (
        <Container>
                <div className="h-[700px] flex justify-center items-center">
                    <LoginForm currentUser={currentUser}/>
                </div>


        </Container>
    )
}
export default Login;