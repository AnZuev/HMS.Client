import * as React from 'react';


export class RoomSearchItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleBookClick = this.handleBookClick.bind(this);
		this.returnExecutionAfterAuth = this.returnExecutionAfterAuth.bind(this);
	}

	handleBookClick(){
		if(window.authController.isAuthorized()){
			this.bookHotel();
		}else{
			window.tmpData.afterAuthAction = this.returnExecutionAfterAuth;
			window.sessionStorage.setItem("signInMessage", "You have to sign up or login before booking");
			window.page.menu.signInClickHandler();
		}
	}

	bookHotel(){
		let url = window.host + '/private/rooms/book';
		let data = {
			from: this.props.parent.search.from,
			to: this.props.parent.search.to,
			roomId: this.props.id
		};
		fetch(url, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status == 200){
				window.page.menu.brandClickHandler();
			}else if( response.status == 400){
				return response.json()
					.then(json => {
						//error handler
					})
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			console.log(err);
		});
	}

	returnExecutionAfterAuth(){
		window.page.menu.roomSearchClickHandler();
		this.handleBookClick();
		window.tmpData.afterAuthAction = undefined;
	}

	render() {
		return 	(
			<div className="RoomSearchBlockItem">
				<p className="h6"><b>Hotel: </b> <i>{this.props.hotel.title}</i> </p>
				<p className="h6"><b>Room type: </b> <i>{this.props.type.title}</i> </p>
				<p className="h6"><b> Room number:</b> <i>{this.props.roomNumber}</i> </p>
				<p className="text-primary text-xs-left">
					<b> Price: </b>{this.props.cost}$ per night
					<button className="btn btn-md btn-success pull-right" onClick={this.handleBookClick} >
						Book!
					</button>
				</p>
				<div className="clearfix"></div>
			</div>
		)
	}

}



