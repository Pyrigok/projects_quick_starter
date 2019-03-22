import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from './components/header';
import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from './components/ResetPassword/ResetPassword';
import ResetPasswordConfirm from './components/ResetPassword/Reset-password-confirm';
import ResetPasswordComplete from './components/ResetPassword/Reset-password-complete';
import ResetPasswordDone from './components/ResetPassword/Reset-password-done';

import startApp from './reducers';
import {auth} from './actions';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let store = createStore(startApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else {
                return <ChildComponent {...props} />
            }
        }} />
    }

    render() {
        let {PrivateRoute} = this;
        return (
            <Router>
            <div>
                <Header />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/reset/confirm/:uid/:token/:email" component={ResetPasswordConfirm}/>
                <Route path="/reset-password-complete" component={ResetPasswordComplete}/>

                <Route path="/reset-password-done" component={ResetPasswordDone}/>

                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
            </Router>
        );
    } 
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(auth.loadUser());
        }
    }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}
