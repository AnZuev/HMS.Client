import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {PromoDescription} from '../../components/promo/description/index.jsx'
import {InitSearchButton} from '../../components/promo/InitSearchButton/index.jsx'


export class PromotionPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			hidden: window.authController.isAuthorized(),
			title: 'promo'
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
				<PromoDescription />
				<InitSearchButton parent={this} />
			</div>
		)
	}





}





