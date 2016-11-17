import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {RoomItem} from '../../components/HotelItem/Room/index.jsx';



export class RoomPage extends React.Component{
	constructor(props){
		super(props);

		this.rooms = [];
		this.state = {
			loaded: false,
			hidden: true,
			title: 'roomPage',
			hotelId: null
		};
		this.pageController = this.props.pageController;
		this.handleBackToHotelPageClick = this.handleBackToHotelPageClick.bind(this);
	}

	componentDidMount(){

	}

	loadRoomTypes(hotelId){
		this.state.loaded = false;
		$.get(window.host + '/hotel/' + hotelId + '/rooms/getTypes/full', function (result) {
			this.rooms = result;
			this.setState({loaded: true });
		}.bind(this));
	}

	close(){
		this.setState({hidden: true});
	}

	open(hotelId){
		this.loadRoomTypes(hotelId);
		this.setState({hidden: false, hotelId: hotelId});
	}

	render(){
		let roomsToRender =[];


		if(this.state.hidden){
			return (
				<div className='page RoomPage'>
				</div>
			);
		}

		if(this.state.loaded){
			for(let i = 0; i < this.rooms.length; i++){

				roomsToRender.push(
					<RoomItem id={this.rooms[i].id}
					          cost={this.rooms[i].cost}
					          description={this.rooms[i].description}
					          photo={this.rooms[i].photoPath}
					          type={this.rooms[i].title}
					          key={this.rooms[i].id}
					          parent = {this}
					/> )
			}

			return (
				<div className='page RoomPage'>
					<p className='RoomPage__backToHotelPageButton' onClick={this.handleBackToHotelPageClick}> Back to Hotel page</p>
					{roomsToRender}
				</div>
			)
		}else{
			return null;
		}

	}

	handleBackToHotelPageClick(){
		this.pageController.changeState("hotels");
	}
}






