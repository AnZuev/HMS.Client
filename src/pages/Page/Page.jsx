import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {LoginPage} from '../../pages/LoginPage/LoginPage.jsx';
import {SignUpPage} from '../../pages/SignUpPage/SignUpPage.jsx';
import {PromotionPage} from '../../pages/PromotionPage/PromotionPage.jsx';
import {RoomPage} from '../RoomPage/RoomPage.jsx';
import {RoomSearchPage} from '../RoomSearchPage/RoomSearchPage.jsx';
import {HotelsPage} from '../HotelPage/index.jsx';
import {LKPage} from '../LKPage/LKPage.jsx'

import {Menu} from '../../components/menu/index.jsx';



export class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentPage: this.props.state,
			reload: false
		};
		window.page = this;
		this.children = {};
		this.changeState = this.changeState.bind(this);

	}

	reload(){
		this.setState = {
			reload: true
		}
	}

	render(){
		var lymbda = (child)=>{
			if(child){
				this.children[child.state.title] = child;
			}
		};
		var lymbdaMenu = (child)=>{
			if(child){
				this.menu = child;
			}
		};
		console.log('rerender');

		return (
			<div className="container">
				<Menu pageController = {this} ref = {lymbdaMenu} isAuthorized = {window.authController.isAuthorized()} />
				<RoomSearchPage ref = {lymbda} pageController = {this}/>
				<PromotionPage ref = {lymbda} pageController = {this}/>
				{(!window.authController.isAuthorized() ?
						<div>
							<LoginPage ref = {lymbda}  pageController = {this} />
							<SignUpPage ref = {lymbda} pageController = {this} />
						</div>
						:
						<LKPage ref= {lymbda} pageController = {this} />
				)}

				<RoomPage ref = {lymbda} pageController = {this} />
				<HotelsPage ref = {lymbda} pageController = {this} />
			</div>
		)
	}

	changeState(page, roomType){
		let currentPage = this.children[this.state.currentPage];
		if(currentPage){
			currentPage.close();
		}
		let nextPage = this.children[page];
		if(nextPage){
			nextPage.open(roomType);
		}
		this.setState({currentPage: page});

	}


}





