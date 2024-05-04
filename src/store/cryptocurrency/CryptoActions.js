import { setCryptocurrencies } from '../slices/CryptoSlice';

let intervalId; // Зберігаємо ідентифікатор інтервалу

export const fetchCryptocurrencies = () => async (dispatch) => {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const { data } = await response.json();
        dispatch(setCryptocurrencies(data));
        console.log(data)
    } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
    }
};

export const startFetchingCryptocurrencies = () => (dispatch) => {
    const fetchAndSetCryptocurrencies = async () => {
        try {
            await dispatch(fetchCryptocurrencies());
        } catch (error) {
            console.error('Error fetching cryptocurrencies:', error);
        }
    };

    fetchAndSetCryptocurrencies();

    if (!intervalId) {
        intervalId = setInterval(fetchAndSetCryptocurrencies, 15000);
    } else {
        clearInterval(intervalId);
        intervalId = setInterval(fetchAndSetCryptocurrencies, 15000);
    }
};