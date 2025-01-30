import React from 'react';
import PropTypes from 'prop-types';

function RegisterForm({ firstName, lastName, email, password, onChange, onSubmit, emailError, switchToLogin }) {
    return (
        <form onSubmit={onSubmit}>
            {emailError && <p className="text-red-500">{emailError}</p>}
            <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={onChange}
                className="w-4/5 p-4 mb-2 border-2 border-black rounded"
            />
            <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={onChange}
                className="w-4/5 p-4 mb-2 border-2 border-black rounded"
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-4/5 p-4 mb-2 border-2 border-black rounded"
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-4/5 p-4 mb-2 border-2 border-black rounded"
            />
            <ul className="flex justify-center w-full h-full p-0 m-0 list-none">
                <li className="w-full m-2">
                    <button
                        className="w-4/5 p-3 text-center bg-amber-400 border border-black cursor-pointer rounded"
                        onClick={switchToLogin}
                    >
                        Login
                    </button>
                </li>
            </ul>
            <button
                type="submit"
                className="w-4/5 p-3 text-center bg-amber-400 border
                 border-black cursor-pointer rounded hover:bg-black
                 hover:text-amber-400 hover:border-amber-400"
            >
                Sign up
            </button>
        </form>
    );
}

//https://www.freecodecamp.org/news/how-to-use-proptypes-in-react/  (26.08.2024)

RegisterForm.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    emailError: PropTypes.string,
    switchToLogin: PropTypes.func.isRequired,
};

export default RegisterForm;
