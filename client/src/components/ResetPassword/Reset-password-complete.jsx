import React, {Component} from 'react'
import {Link} from "react-router-dom";


class ResetPasswordComplete extends Component {
    render() {
        return (
            <div class="container">
                <div class="jumbotron">
                    <h1>The_password_has_been_changed</h1>
                    <Link to="/login">Login_again?</Link>
                </div>
            </div>
        )
    }
}

export default ResetPasswordComplete