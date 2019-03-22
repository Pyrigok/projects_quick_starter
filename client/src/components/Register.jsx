import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Register extends Component {

    state = {
        username: "",
        email: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state.username, this.state.email, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <div className='text-center'>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Register</legend>
                        {this.props.errors.length > 0 && (
                            <ul>
                                {this.props.errors.map(error => (
                                    <li key={error.field}>{error.message}</li>
                                ))}
                            </ul>
                        )}
                        <p>
                            <input
                                type="text" id="username"
                                placeholder='Username'
                                onChange={e => this.setState({username: e.target.value})}
                                required />
                        </p>
                        <p>
                            <input
                                type="email" id="email"
                                placeholder='Email'
                                onChange={e => this.setState({email: e.target.value})}
                                required />
                        </p>
                        <p>
                            <input
                                type="password" id="password"
                                placeholder='Password'
                                onChange={e => this.setState({password: e.target.value})} 
                                required/>
                        </p>
                        <p>
                            <button type="submit">Register</button>
                        </p>

                        <p>
                            Already have an account? <Link to="/login">Login</Link>
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
        register: (username, email, password) => dispatch(auth.register(username, email, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
