import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Header extends Component {
    constructor(props) {
        super(props);

        this.state ={
            username: '',
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        this.setState({status: true})
    };

    render() {
        if (localStorage.getItem('token')) {
            return (
                    <div className='row'>
                        <div className='col-xs-3 col-xs-offset-7'>
                        {this.state.username} 
                            <Link to="/login" onClick={this.handleLogout}> Logout</Link>
                        </div>
                    </div>
            )                            
        } else {
            return(
                    <div className='row'>
                        <div className='col-xs-3 col-xs-offset-7'>
                            <Link to="/register">Registration</Link> | 
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
            )    
        }
    }
}

export default Header;