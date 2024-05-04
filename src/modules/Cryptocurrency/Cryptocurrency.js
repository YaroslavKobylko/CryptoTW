import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchingCryptocurrencies } from '../../store/cryptocurrency/CryptoActions';
import './Cryptocurrency.css';

const Cryptocurrency = () => {
    const dispatch = useDispatch();
    const cryptoCurrencies = useSelector(state => state.crypto.currencies);
    const lastUpdate = useSelector(state => state.crypto.lastUpdate);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        dispatch(startFetchingCryptocurrencies());
    }, [dispatch]);

    // Пошук криптовалют за назвою
    const filteredCurrencies = cryptoCurrencies.filter(currency =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setCurrentPage(1); // Оновлення поточної сторінки до 1
    }, [searchTerm]);

    // Визначення індексів для поточної сторінки
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCurrencies.slice(indexOfFirstItem, indexOfLastItem);

    // Функція для зміни сторінки
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='Cryptocurrency-container'>
            <div className='Input-container'>
            <div class="group">
                <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                <input
                    className='input'
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <p>Last Update: {lastUpdate}</p>
            </div>
            <table className='CryptoGrid'>
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Price USD</th>
                        <th>Change 24H</th>
                        <th>Market Cap USD</th>
                        <th>Max Supply</th>
                        <th>Symbol</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(currency => (
                        <tr key={currency.id} style={{ color: currency.changePercent24Hr > 0 ? 'green' : 'red' }}>
                            <td className='crypto-svg-container'><img className='crypto-svg' src={`/img/crypto/${currency.symbol}.png`} alt={currency.symbol} /></td>
                            <td>{currency.name}</td>
                            <td>{currency.priceUsd}</td>
                            <td>{currency.changePercent24Hr}</td>
                            <td>{currency.marketCapUsd}</td>
                            <td>{currency.maxSupply}</td>
                            <td>{currency.symbol}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredCurrencies.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Cryptocurrency;