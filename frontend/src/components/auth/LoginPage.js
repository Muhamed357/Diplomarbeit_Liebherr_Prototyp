import React, { Component } from 'react';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { loginSchema, registerSchema } from '../../utils/Ajv';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const ajv = new Ajv();
addFormats(ajv);

export default class LoginPage extends Component {
    state = {
        active: "login",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        emailError: null,
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateSchema = (data, schema) => {
        const validate = ajv.compile(schema);
        const valid = validate(data);
        if (!valid) {
            return validate.errors.map(error => error.message).join(", ");
        }
        return null;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { active, firstName, lastName, email, password } = this.state;
        const { onLogin, onRegister } = this.props;
    
        const schema = active === "login" ? loginSchema : registerSchema;
        const data = active === "login" ? { email, password } : { firstName, lastName, email, password };
        const error = this.validateSchema(data, schema);
    
        if (error) {
            this.setState({ emailError: error });
            return;
        }
    
        this.setState({ emailError: null });
    
        try {
            if (active === "login") {
                await onLogin(event, email, password);
            } else {
                await onRegister(event, firstName, lastName, email, password);
            }
        } catch (error) {
            console.error("Error during login/registration:", error);
        }
    };
    
    switchToLogin = () => {
        this.setState({ active: "login" });
    };

    switchToRegister = () => {
        this.setState({ active: "register" });
    };

    render() {
        const { active, firstName, lastName, email, password, emailError } = this.state;
        const { loginError } = this.props;

        return (
            <div className="inset-0 flex flex-col justify-center text-center items-center w-screen h-screen gap-5">
                <img className="w-1/3" src="/img/pfp.png" alt="Profile" />
                <div className="w-full">
                    {active === "login" ? (
                        <LoginForm
                            email={email}
                            password={password}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            emailError={emailError}
                            loginError={loginError}
                            switchToRegister={this.switchToRegister}
                        />
                    ) : (
                        <RegisterForm
                            firstName={firstName}
                            lastName={lastName}
                            login={email}
                            password={password}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            emailError={emailError}
                            switchToLogin={this.switchToLogin}
                        />
                    )}
                </div>
              
            </div>
        );
    }
}
