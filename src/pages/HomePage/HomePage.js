import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startFetchingCryptocurrencies } from '../../store/cryptocurrency/CryptoActions';
import { fetchData } from '../../modules/Balance/Balance';
import { setTotalValue, setDifferenceValueDollar, setDifferenceValuePercent } from '../../store/slices/CryptoSlice';
import Layout from '../../modules/Layout/Layout';
import katex from 'katex';
import "./HomePage.css"

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [totalValue, setTotalValueLocal] = useState(0);
    const [differenceDollar, setDifferenceValueDollar] = useState(0);
    const [differencePercent, setDifferenceValuePercent] = useState(0);
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.user.id);
    const cryptoCurrencies = useSelector(state => state.crypto.currencies);

    useEffect(() => {
        dispatch(startFetchingCryptocurrencies());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        } else {
            fetchData(userId, setUserData, setCryptoData, cryptoCurrencies, setTotalValueLocal, setDifferenceValueDollar,setDifferenceValuePercent, setLoading); 
        }
    }, [isAuth, userId, cryptoCurrencies, navigate]);

    useEffect(() => {
        const newTotalValue = cryptoData.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.valueInDollars;
        }, 0);
        setTotalValueLocal(newTotalValue);
        dispatch(setTotalValue(newTotalValue));
    }, [cryptoData, dispatch]);
    return (
        <Layout>
            <div className='HomePage-container'>
                <div className='HomePage'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='ContentHomePage'>
                        <div className={`Balance-container ${differenceDollar > 0 ? 'light-effect-green' : 'light-effect-red'}`} id="balance">
                            <div className='logo-container'>
                                <img src="/img/ByBitLogo.png" alt="ByBitLogo" width={80}/>
                                <img className='lpnu-logo' src="/img/LPNU.png" alt="ByBitLogo" width={80}/>
                            </div>
                            <div>
                                <div className='balance'>
                                    <p>Balance:</p>
                                    <p>{'\u00A0 ' + totalValue + '$'}</p>                            
                                </div>
                                <div className='cryptochanges'>
                                    <div className='Changes-container'>
                                        <p style={{ color: differenceDollar > 0 ? 'green' : 'red' }}>Changes:</p>
                                        {differenceDollar > 0 ? (
                                            <img className='positive-image' src="/img/Increase.png" alt="Positive Image" width={80} />
                                        ) : (
                                            <img className='negative-image' src="/img/Decrease.png" alt="Negative Image" width={80} />
                                        )}
                                    </div>
                                    <div className='Dol-Percent'>
                                        <p style={{ color: differenceDollar > 0 ? 'green' : 'red' }}>{differencePercent}% / {differenceDollar}$</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='OneCurrencyContainer'>
                        {cryptoData && cryptoData.map(crypto => (
                               <div className={`crypto-block ${crypto.changePercent24Hr > 0 ? 'light-effect-green' : 'light-effect-red'}`} key={crypto.name}>
                               <div className='cryptoNameLogo'>
                                   <img className='cryptocurrency-logo-home' src={`/img/crypto/${crypto.symbol}.png`} alt="Positive Image" width={40} />
                                   <p>{crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1)}: {crypto.amount}</p>
                               </div>
                               <p className='crypto-in-dollar'>≈{crypto.valueInDollars}$</p>
                               <div style={{ color: crypto.changePercent24Hr > 0 ? 'green' : 'red' }}>
                                   <p>Price</p>
                                   <p>{crypto.priceUsd}$</p>
                                   <p>{crypto.changePercent24Hr.toFixed(2)}% / {crypto.previousValue}$</p>
                               </div>
                           </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;