import { Login } from '../../components/Login/Login';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Login</h1>
            <Login redirectTo={redirectToLogin}/>
            <p>
                Or <Link to="/register">register</Link>
            </p>
        </div>
    )
}

export default LoginPage;