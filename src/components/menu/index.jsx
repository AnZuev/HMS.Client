import * as React from 'react';
import * as ReactDOM from 'react-dom';



export class Menu extends React.Component{
	brandClickHandler(){
		if(window.authController.isAuthorized()){
			this.sendCommandToParent("lkPage");
		}else{
			this.sendCommandToParent("promo");
		}
	}

	hotelClickHandler(){
		this.sendCommandToParent("hotels");
	}

	roomSearchClickHandler(){
		this.sendCommandToParent("roomSearch");
	}

	logoutClickHandler(){
		let url = window.host + '/auth/logout';

		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then(()=>{
			window.authController.cleanLocalStorage();
			this.brandClickHandler();
		}).catch((err) =>{
			console.log(err);
		});
	}

	signUpClickHandler(){
		this.sendCommandToParent("signUp");
	}
	signInClickHandler(){
		this.sendCommandToParent("login");
	}
	sendCommandToParent(command){
		this.setState({currentState: command});
		this.props.pageController.changeState(command);
		this.hideMenu();
	}

	constructor(props){
		super(props);
		this.state = {
			currentState: ""
		};
		this.logoutClickHandler = this.logoutClickHandler.bind(this);
		this.brandClickHandler = this.brandClickHandler.bind(this);
		this.hotelClickHandler = this.hotelClickHandler.bind(this);
		this.signUpClickHandler = this.signUpClickHandler.bind(this);
		this.signInClickHandler = this.signInClickHandler.bind(this);
		this.roomSearchClickHandler = this.roomSearchClickHandler.bind(this);
		this.sendCommandToParent = this.sendCommandToParent.bind(this);
	}

	hideMenu(){
		$('#app').click();
	}


	render(){
		return (
			<div className="welcomePageMenu">
				<button type="button" className="navbar-toggler" data-canvas="#app"
				        data-toggle="offcanvas" data-target="#unAuthMenu">
					&#9776;
				</button>
				<nav id='unAuthMenu' className="welcomePageMenu__menu
				 offcanvas navmenu navmenu-default navmenu-fixed-left
				 offcanvas-toggle" role="navigation">
					<a className="navmenu-brand" onClick={this.brandClickHandler} href="#">DBMS Hotel</a>
					<div className="nav list-group">
						<a className="list-group-item list-group-item-action"
						   onClick={this.hotelClickHandler}>Hotels</a>
						{!this.props.isAuthorized ?
							<span>
								<a className="list-group-item list-group-item-action"
								   onClick={this.signUpClickHandler}>Sign up</a>
								<a className="list-group-item list-group-item-action"
								   onClick={this.signInClickHandler}>Sign in</a>
							</span>
							:
							<a className="list-group-item list-group-item-action"
							   onClick={this.logoutClickHandler} >Logout</a>
						}
					</div>
				</nav>
			</div>
		)
	}
}

