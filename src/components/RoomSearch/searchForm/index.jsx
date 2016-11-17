import * as React from 'react';


export class RoomSearchForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
		this.search = {};
		this.roomTypes = [];
		this.hotels = [];

		this.handleClick = this.handleClick.bind(this);
		this.handleHotelSelectChange = this.handleHotelSelectChange.bind(this);
		this.submit = this.submit.bind(this);
		this.parent = this.props.parent;
	}

	submit(e){
		e.preventDefault();
	}
	handleClick(){
		let data = {
			from: $('#RoomSearchForm__from').val(),
			to: $('#RoomSearchForm__to').val(),
			roomType:{
				id: $('#RoomSearchForm_roomType').val(),
				title: ""
			},
			hotel: {
				id: $('#RoomSearchForm_hotels').val(),
				title: ""
			}
		};

		this.hotels.forEach(hotel =>{
			if(hotel.id == data.hotel.id){
				data.hotel.title = hotel.title
			}
		});

		this.roomTypes.forEach(roomType =>{
			if(roomType.id == data.roomType.id){
				data.roomType.title = roomType.title;
			}
		});

		this.parent.resultBlock.initSearch(data);
	}

	handleHotelSelectChange(event){
		this.hotelId = event.target.value;
		this.loadRoomTypes();

	}

	loadRoomTypes(){
		fetch(window.host + '/hotel/' + this.hotelId + '/rooms/getTypes/short', {
			method: "get"
		}).then((response)=>{
			if(response.status == 200){
				return response.json();
			}
		}).then((json)=>{
			this.roomTypes = json;
			this.addRoomTypesResultBlock();

			this.setState({loaded: true});
		}).catch((err)=>{
			console.log(err);
		});
	}

	loadHotel(){
		fetch(window.host + '/hotels/short', {
			method: "get"
		}).then((response)=>{

			if(response.status == 200){
				return response.json();
			}
		}).then((json)=>{
			this.hotels = json;
			/*this.hotels =this.hotels = [
				{
					id: 0,
					title: "Hotel 1"
				},
				{
					id: 1233,
					title: "Hotel 2"
				}
			];*/
			this.setState({loaded: true});
		}).catch((err)=>{
			console.log(err);
		});
	}

	load(){
		this.loadHotel();
		this.loadRoomTypes();
	}

	addRoomTypesResultBlock(){
		this.parent.resultBlock.roomTypes = {};
		this.roomTypes.forEach((roomType)=>{
			this.parent.resultBlock.roomTypes[roomType.id] = roomType;
		})
	}

	renderRoomTypeDropDown(){
		if(!this.hotelId) return null;
		let opt = null;
		if(this.state.loaded){
			opt = [];
			this.roomTypes.forEach((roomType)=>{
				let t;
				if(this.roomType == roomType.id){
					t = (<option key={roomType.id} value={roomType.id} selected> {roomType.title} </option>)
				}else{
					t = (<option key={roomType.id} value={roomType.id} > {roomType.title} </option>)
				}
				opt.push(t);
			})
		}
		return (<div className="form-group">
			<label htmlFor="RoomSearchForm_roomType">Room type:</label>
			<select className="form-control" id="RoomSearchForm_roomType" default="Выберите отель...">
				{opt}
			</select>
		</div>)
	}

	renderHotelDropDown(){
		let opt = null;
		let flag = false;

		if(this.state.loaded){
			opt = [];
			this.hotels.forEach((hotel)=>{
				let t;

				if(this.hotelId == hotel.id){
					flag = true;
					t = <option key={hotel.id} value={hotel.id} selected> {hotel.title} </option>;
				}else{
				    t = <option key={hotel.id} value={hotel.id}> {hotel.title} </option>;
				}
				opt.push(t);
			})
		}
		return (<div className="form-group">
			<label htmlFor="RoomSearchForm_hotels">Hotel:</label>
			<select className="form-control" id="RoomSearchForm_hotels" onChange={this.handleHotelSelectChange}>
				{(!flag ? <option value="" disabled selected>Choose hotel...</option> : null)}
				{opt}
			</select>
		</div>)
	}

	changeRoomTypeAndHotel(type){
		if(type){
			this.roomType = type.id;
			this.hotelId = type.hotelId;
		}else{
			this.roomType = null;
			this.hotelId = null;
		}

		this.setState({refresh: true});
	}


	render() {
		return 	(
			<form className="form-horizontal RoomSearchForm" onSubmit={this.submit}>
				<div className="form-group">
					<label htmlFor="RoomSearchForm__from">From:</label>
					<input type="date"
					       className="form-control"
					       id="RoomSearchForm__from"
					       defaultValue={new Date().addDays(1).toDateInputValue()}/>
				</div>
				<div className="form-group">
					<label htmlFor="RoomSearchForm_to">To:</label>
					<input type="date"
					       className="form-control"
					       id="RoomSearchForm__to"
					       defaultValue={new Date().addDays(8).toDateInputValue()}
					/>
				</div>
				{this.renderHotelDropDown()}
				{this.renderRoomTypeDropDown()}
				<button className="btn btn-lg btn-success btn-block" onClick={this.handleClick}>Search</button>
			</form>
		)
	}




}
Date.prototype.toDateInputValue = (function() {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0,10);
});

Date.prototype.addDays = function(days)
{
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}


