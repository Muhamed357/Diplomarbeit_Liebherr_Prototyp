import React from 'react';
import PropTypes from 'prop-types';

function LoginForm({ email, password, onChange, onSubmit, emailError, loginError, switchToRegister }) {
    return (
        <form onSubmit={onSubmit}>
            {loginError && <p className="text-red-500">{loginError}</p>}
            {emailError && <p className="text-red-500">{emailError}</p>}
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-4/5 p-3 mb-2 border-2 border-black rounded"
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-4/5 p-3 mb-2 border-2 border-black rounded"
            />
            <button
                type="submit"
                className="w-4/5 p-3 text-center bg-amber-400 border border-black cursor-pointer rounded hover:bg-black hover:text-amber-400 hover:border-amber-400"
            >
                Sign in
            </button>
            <ul className="flex justify-center w-full h-full p-0 m-0 list-none">
                <li className="w-full m-2">
                    <button
                        type="button"
                        className="w-4/5 p-3 text-center bg-amber-400 border border-black cursor-pointer rounded"
                        onClick={switchToRegister}
                    >
                        Register
                    </button>
                </li>
            </ul>
        </form>
    );
}



//https://www.freecodecamp.org/news/how-to-use-proptypes-in-react/  (26.08.2024)

LoginForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    emailError: PropTypes.string,
    loginError: PropTypes.string,
    switchToRegister: PropTypes.func.isRequired,
};

export default LoginForm;
