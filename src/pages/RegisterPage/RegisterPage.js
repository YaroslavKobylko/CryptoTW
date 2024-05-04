import { SignUp } from '../../components/SignUp/SignUp';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleSignUpSuccess = () => {
        // Виконуємо перенаправлення на сторінку входу
        navigate('/login');
    };

    return (
        <div>
            <h1>Register</h1>
            {/* Передача функції handleSignUpSuccess в компонент SignUp */}
            <SignUp onSuccess={handleSignUpSuccess} />
            <p>
                Already have an account? <Link to="/login">Sign in</Link>   
            </p>            
        </div>
    )
}

export default RegisterPage;