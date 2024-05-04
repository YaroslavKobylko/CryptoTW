import React, { useState, useEffect } from 'react';

const Form = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPass = localStorage.getItem('password');
        if (storedEmail && storedPass) {
            setEmail(storedEmail);
            setPass(storedPass);
        }
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePassChange = (e) => {
        setPass(e.target.value);
    };

    const handleSubmit = () => {
        handleClick(email, pass);
    };

    useEffect(() => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', pass);
    }, [email, pass]);

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="email"
            />
            <input
                type="password"
                value={pass}
                onChange={handlePassChange}
                placeholder="password"
            />
            <button onClick={handleSubmit}>
                {title}
            </button>
        </div>
    );
};

export { Form };