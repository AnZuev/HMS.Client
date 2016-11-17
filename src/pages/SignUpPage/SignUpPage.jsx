import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {SignUpForm} from '../../components/signUpForm/index.jsx';



export class SignUpPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			hidden: true,
			title: 'signUp'
		};
	}

	close(){
		this.setState({hidden: true});
	}
	open(){
		this.setState({hidden: false});
	}

	render(){
		return (
			<div className={this.state.hidden ? 'hide page' : 'page'} >
				<SignUpForm />
			</div>

		)
	}
}





