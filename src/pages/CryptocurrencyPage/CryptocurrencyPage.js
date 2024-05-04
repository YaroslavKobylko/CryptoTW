import Header from "../../components/Header/Header";
import React, { useEffect } from 'react';
import Cryptocurrency from "../../modules/Cryptocurrency/Cryptocurrency";
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import Layout from "../../modules/Layout/Layout";
import './CryptocurrencyPage.css';

const LoginPage = () => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/start');
        }
    }, [isAuth, navigate]);

    return (
        <Layout>
        <div className="CryptocurrencyPage-container">
            <div className="CryptocurrencyPage">
                <Cryptocurrency/>
            </div>
        </div>
        </Layout>
    )
}

export default LoginPage;