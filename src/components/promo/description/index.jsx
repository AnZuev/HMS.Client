import * as React from 'react';


export class PromoDescription extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClick(){
		//make response for api;


		return false;
	}
	submit(e) {
		e.preventDefault();
	}

	render() {
		return 	(
			<div className="promotionPageDescription">
				<p className="text-white h1 text-sm-center font-italic">
					DMD Booking System
				</p>
				<hr/>
				<div className="promotionPageDescription__row pull-left">
					<display-1>
						Perfect website
						<br/>
						<small className="text-muted">Even for educational project</small>
					</display-1>
				</div>
				<div className="clearfix"></div>
				<div className="promotionPageDescription__row pull-right">
					<display-1>
						Booking has never been easier
						<br/>
						<small className="text-muted">just for 0.99$</small>
					</display-1>
				</div>
				<div className="clearfix"></div>
				<div className="promotionPageDescription__row pull-left">
					<display-1>
						The greatest booking system ever since IPhone
						<br/>
						<small className="text-muted">We hope you trust us:)</small>
					</display-1>
				</div>
			</div>
		)
	}

}



