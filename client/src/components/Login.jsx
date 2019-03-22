import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Login extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <div className='text-center'>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Login</legend>
                     
                        <p>
                            <input
                                type="text" id="username" placeholder='Username'
                                onChange={e => this.setState({username: e.target.value})} 
                                required/>
                        </p>
                        <p>
                            <input
                                type="password" id="password" placeholder='Password'
                                onChange={e => this.setState({password: e.target.value})} 
                                required/>
                        </p>
                        <p>
                            <button type="submit">Login</button>
                        </p>

                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                        <p>
                            <Link to="/reset-password">Forgot password?</Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default Login;