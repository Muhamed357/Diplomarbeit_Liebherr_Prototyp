import React from 'react';
import { request, setAuthHeader } from './utils/axios_helper';
import LoginPage from './components/auth/LoginPage';
import SerialNumberPage from './components/SerialNumberTools/SerialNumberPage';
import InputDataPage from './components/data/DataInputPage';
import DataSelectPage from './components/data/DataSelectPage';
import WelcomePage from "./components/common/WelcomePage";
import BackButton from './components/common/BackButton';
import HistoryButton from './components/common/HistoryButton';

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome",
            history: [],
            user: null,
            dataForSelect: null,
            selectedItem: null,
            loginError: null,
            projectNumber: '',
            itemNumber: '',
        };
    }

    setComponent = (component) => {
        this.setState((prevState) => ({
            history: [...prevState.history, prevState.componentToShow],
            componentToShow: component,
        }));
    };

    onAnimationEnd = () => {
        this.setComponent("login");
    };

    onLogin = (e, email, password) => {
        e.preventDefault();
        request("POST", "/login", { email: email, password: password })
            .then(response => {
                setAuthHeader(response.data.token);
                this.setComponent("machineCards");
                this.setState({ email: email, loginError: null });
                this.setState({ user: email });
            })
            .catch(error => {
                setAuthHeader(null);
                this.setState({ loginError: "Email and/or password is incorrect" });
                this.setComponent("login");
            
            });
    };

    onRegister = (event, firstName, lastName, email, password) => {
        event.preventDefault();
        request("POST", "/register", { firstName, lastName, email: email, password })
            .then(response => {
                setAuthHeader(response.data.token);
                this.setComponent("machineCards");
                this.setState({ user: email });
            })
            .catch(error => {
                setAuthHeader(null);
                this.setState({ loginError: "Registration failed" });
                this.setComponent("login");
            });
    };

    handleNext = (data) => {
        if (data.length === 1) {
            // If there's only one record, proceed directly to "messages"
            this.handleDataSelectSubmit(data[0]);
        } else {
            this.setComponent("dataSelect");
            this.setState({ dataForSelect: data });
        }
    };

    handleDataSelectSubmit = (selectedItem) => {
        this.setComponent("messages");
        this.setState({ selectedItem });
    };

    handleBack = () => {
        this.setState((prevState) => {
            const newHistory = [...prevState.history];
            const previousComponent = newHistory.pop();
            return {
                componentToShow: previousComponent || "welcome",
                history: newHistory,
            };
        });
    };

    handleLogout = () => {
        setAuthHeader(null);
        this.setState({
            componentToShow: "login",
            user: null,
            dataForSelect: null,
            selectedItem: null,
            projectNumber: '',
            itemNumber: '',
        });
    };

    handleSuccessfulSubmit = (projectNumber, itemNumber) => {
        let serialNumber = '';
        sessionStorage.setItem('serialNumber', serialNumber);
        this.setState({
            projectNumber, itemNumber,
            componentToShow: "machineCards",
        });
    };

    render() {
        const showBackButton = ["machineCards", "dataSelect", "messages"].includes(this.state.componentToShow);
        const { user, projectNumber, itemNumber } = this.state;

        return (
            <>
                {showBackButton && (
                    <BackButton
                        onBack={this.handleBack}
                        onLogout={this.handleLogout}
                        componentToShow={this.state.componentToShow}
                    />
                )}

                {this.state.componentToShow === "welcome" && (
                    <WelcomePage onAnimationEnd={this.onAnimationEnd} />
                )}

                {this.state.componentToShow === "login" && (
                    <LoginPage
                        onLogin={this.onLogin}
                        onRegister={this.onRegister}
                        loginError={this.state.loginError}
                    />
                )}

                {user && (
                    <div className="relative">
                        <div className="absolute top-0 right-0 m-4">
                            <HistoryButton email={user} />
                        </div>
                    </div>
                )}

                {this.state.componentToShow === "machineCards" && (
                    <InputDataPage
                        user={this.state.user}
                        handleNext={this.handleNext}
                        projectNumber={this.state.projectNumber}
                        itemNumber={this.state.itemNumber}
                    />
                )}

                {this.state.componentToShow === "dataSelect" && (
                    <DataSelectPage
                        user={this.state.user}
                        data={this.state.dataForSelect}
                        onSubmit={this.handleDataSelectSubmit}
                    />
                )}

                {this.state.componentToShow === "messages" && (
                    <SerialNumberPage
                        user={this.state.user}
                        selectedItem={this.state.selectedItem}
                        onSuccessfulSubmit={this.handleSuccessfulSubmit}
                    />
                )}
            </>
        );
    }
}
