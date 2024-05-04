import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from '../Form/Form';
import { setUser } from '../../store/slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import db from '../../firebase';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userDataRef = ref(db, `users/${user.uid}`);
        const userData = {
          email: user.email,
          id: user.uid,
          bitcoin: '',
          ethereum: '',
          solana: '',
          dogecoin: '',
          tether: '',
        };
        set(userDataRef, userData)
          .then(() => {
            console.log('User data saved successfully in Realtime Database:', userData);
          })
          .catch((error) => {
            console.error('Error saving user data in Realtime Database:', error);
          });

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            bitcoin: '',
            ethereum: '',
            solana: '',
            dogecoin: '',
            tether: '',
          })
        );
        navigate('/home');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Ця адреса електронної пошти вже використовується. Будь ласка, увійдіть або використайте іншу адресу.');
        } else {
          console.error(error);
        }
      });
  };

  return <Form title="register" handleClick={handleRegister} />;
};

export { SignUp };