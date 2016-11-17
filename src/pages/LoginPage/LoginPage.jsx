import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {LoginForm} from '../../components/loginForm/index.jsx';
import {Menu} from '../../components/menu/index.jsx';



export class LoginPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			hidden: true,
			title: 'login',
			loginFormMessage: ""
		};
	}

	close(){
		this.setState({hidden: true});
	}
	open(){
		this.setState({hidden: false});
		if(window.sessionStorage.getItem("signInMessage")){
			this.setState({loginFormMessage: window.sessionStorage.getItem("signInMessage")});
			window.sessionStorage.removeItem("signInMessage");
		}

	}
	render(){
		if(this.state.hidden){
			return null;
		}else{
			return (
				<div className='page' >
					<LoginForm  message={this.state.loginFormMessage} />
				</div>
			)
		}

	}
}





