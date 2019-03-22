import React, {Component} from 'react'

const reset_endpoint = "http://localhost:8000/auth/reset/";


class ResetPassword extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({ email: event.target.value })
    }

    handleSubmit(event){
        event.preventDefault();
        const email = this.state.email;

        if (email === ''){
            Error(event, 'Please, enter your email');
            return
        }
        fetch(reset_endpoint,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email}),

        })
        .then(function(data) {
            if (data.status===200) {
                this.props.history.push('/reset-password-done')
            }
            else {
                alert('Account with this email does not exist!');
            }
        }.bind(this))
        .catch(function(error) {
            alert(error);
        })

    }

    render() {
        return (
            <div class="container">
		        <div class="jumbotron">
			        <div class="text-center">
				        <form method="POST" onSubmit={this.handleSubmit}>

				            <input type="email"
				                   class="email"
				                   placeholder='Enter your email'
				                   value={this.state.email}
                                   onChange={this.handleChange}/>

				            <button type="submit" class="btn">Reset_password</button>
				        </form>
			        </div>
		        </div>
	        </div>
        )
    }
}

export default ResetPassword