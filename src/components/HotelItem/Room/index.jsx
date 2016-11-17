import * as React from 'react';


export class RoomItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			photo: this.props.photo,
			description: this.props.description,
			type: this.props.type,
			cost: this.props.cost
		};
		this.parent = this.props.parent;
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick(){
		let type = {
			type: this.state.type,
			id: this.state.id,
			hotelId: this.parent.state.hotelId
		};
		this.parent.pageController.changeState("roomSearchPage", type)
	}

	render() {
		let classNames = "img-rounded RoomItem__photo";

		return 	(
			<div className="RoomItem">
				<p className="h3">{this.state.type}:</p>
				<img src={this.state.photo} className={classNames} alt=""/>
				<p className="RoomItem__text">
					{this.state.description}
				</p>
				<br/>
				<p className="text-primary text-xs-left">
					<button className="btn btn-md btn-success pull-right" onClick={this.handleClick}>
						Select room
					</button>
					Starting just from {this.state.cost}$
				</p>

			</div>
		)
	}

}



