import * as React from 'react';

import {RoomSearchItem} from './RoomSearchItem/index.jsx'
export class RoomSearchResultBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: [],
			status: "start"
		};
		this.search = {};
	}


	getAvailableRooms(){
		let url = window.host + "/rooms/getAvailableRooms?" +
			"from=" + this.search.from +
			"&to=" + this.search.to +
			"&roomTypeId=" + this.search.roomType.id +
			"&hotelId=" + this.search.hotel.id;
		fetch(url, {
			method: 'get'
		}).then(function(response) {
			if(response.status == 200){
				return response.json();
			}else if(response.status == 401){
				//auth error happened, need to be somehow handled
				new Error({exception: true, type: "authError"});
			}else{
				//server error happened, need to be somehow handled
				new Error({exception: true, type: "Server Error"});
			}
		}).then((json)=>{
			this.setState({
				result: json,
				status: "loaded"
			});
		}).catch(function(err) {
			console.log(err);
		});
	}

	initSearch(search){
		this.search = search;
		this.getAvailableRooms();
	}

	renderNoResult(){
		return (
			<p className="text-muted RoomSearchResultBlock__noRoomsFound">
				<span>Sorry, no rooms found for your request:(</span>
			</p>
		)
	}

	renderRoomItem(roomItem){
		return (
			<RoomSearchItem key={roomItem.roomNumber}
			                id = {roomItem.id}
	                        type = {this.search.roomType}
			                roomNumber = {roomItem.roomNumber}
			                cost = {roomItem.cost}
			                hotel = {this.search.hotel}
			                parent = {this}
			/>
		)
	}

	render() {
		let block;
		if(this.state.status == "loaded"){
			if(this.state.result && this.state.result.length > 0){
				block = [];
				this.state.result.forEach((roomItem)=>{
					block.push(this.renderRoomItem(roomItem));
				})
			}else{
				block = this.renderNoResult();
			}
		}else if(this.state.status == "start"){
			block = null;
		}else{
			//noinspection CheckTagEmptyBody
			block = (
				<div className="RoomSearchResultBlock__loading">
					<i className="fa fa-spinner fa-spin"></i>
				</div>
			)
		}
		return 	(<div className="RoomSearchResultBlock">
					{block}
				</div>)
	}

}



