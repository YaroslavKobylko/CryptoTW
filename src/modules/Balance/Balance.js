import { getDatabase, ref, get } from 'firebase/database';
import { fetchUserData } from '../../store/Database/UserDataService';

export const getBitcoinValueInDollars = async (bitcoinPrice, bitcoinAmount) => {
    if (bitcoinAmount === '' || bitcoinAmount === null) {
        return null;
    }

    if (isNaN(parseFloat(bitcoinAmount))) {
        console.error('Invalid Bitcoin amount received from database:', bitcoinAmount);
        return null;
    }

    if (isNaN(parseFloat(bitcoinPrice))) {
        console.error('Invalid Bitcoin price received from API:', bitcoinPrice);
        return null;
    }

    const bitcoinValueInDollars = bitcoinPrice * bitcoinAmount;
    return bitcoinValueInDollars;
};

export const fetchData = async (userId, setUserData, setCryptoData, cryptoCurrencies, setTotalValue, setDifferenceValueDollar, setDifferenceValuePercent, setLoading) => {
    try {
        setLoading(true);

        const userData = await fetchUserData(userId);
        setUserData(userData);

        const database = getDatabase();
        const userCryptoRef = ref(database, `users/${userId}`);
        const snapshot = await get(userCryptoRef);
        const userCryptoData = snapshot.val();

        if (!userCryptoData) {
            console.error('User crypto data is null or undefined.');
            setLoading(false);
            return;
        }

        const updatedCryptoData = await Promise.all(Object.keys(userCryptoData).map(async key => {
            const crypto = {
                name: key,
                amount: userCryptoData[key],
            };

            // Перевірка, чи існує значення crypto.amount і воно більше нуля перед його використанням
            if (crypto.amount && crypto.amount > 0) {
                const currency = cryptoCurrencies.find(currency => currency.id === crypto.name);
                if (currency) {
                    const valueInDollars = await getBitcoinValueInDollars(currency.priceUsd, crypto.amount);
                    const symbol = currency.symbol;
                    const priceUsd = currency.priceUsd;
                    const changePercent24Hr = parseFloat(currency.changePercent24Hr);
                    const previousValue = valueInDollars / (1 + changePercent24Hr / 100);

                    return {
                        ...crypto,
                        valueInDollars,
                        changePercent24Hr,
                        previousValue,
                        symbol,
                        priceUsd,
                    };
                } else {
                    return {
                        ...crypto,
                        valueInDollars: null,
                        changePercent24Hr: null,
                        previousValue: null,
                        symbol: null,
                        priceUsd: null,
                    };
                }
            } else {
                // Якщо amount не існує або менше або рівне нулю, пропустити криптовалюту
                return null;
            }
        }));

        // Фільтрація нульових значень з масиву
        const filteredCryptoData = updatedCryptoData.filter(crypto => crypto !== null);

        const totalValue = filteredCryptoData.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue?.valueInDollars || 0);
        }, 0);
        setTotalValue(totalValue);

        const previousTotalValue = filteredCryptoData.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue?.previousValue || 0);
        }, 0);

        const difference = totalValue - previousTotalValue;
        setDifferenceValueDollar(difference);

        const differencePercentage = ((difference / previousTotalValue) * 100).toFixed(2);
        setDifferenceValuePercent(differencePercentage);

        setCryptoData(filteredCryptoData);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
    }
};