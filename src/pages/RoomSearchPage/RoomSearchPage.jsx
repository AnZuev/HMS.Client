import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {RoomSearchResultBlock} from '../../components/RoomSearch/roomSearchResultBlock/index.jsx';

import {RoomSearchForm} from '../../components/RoomSearch/searchForm/index.jsx';


export class RoomSearchPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			hidden: true,
			title: 'roomSearchPage',
			roomType: ""
		};
		this.roomTypes = [];
	}


	close(){
		this.setState({hidden: true});
		this.resultBlock.setState({status: "start"});
	}
	open(type){
		this.setState({
			hidden: false
		});
		this.searchForm.changeRoomTypeAndHotel(type);
		this.searchForm.load();
	}


	render(){
		let bindForm = (child) =>{
			this.searchForm = child;
		};

		let bindResultBlock = (child) =>{
			this.resultBlock = child;
		};

		return (
			<div className={(this.state.hidden ? 'hide page' : 'page') + ' RoomSearchPage'}>
				<RoomSearchForm ref = {bindForm} parent={this}/>
				<RoomSearchResultBlock ref = {bindResultBlock}/>
			</div>)


	}
}


