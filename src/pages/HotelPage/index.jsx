import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {HotelItem} from "../../components/HotelItem/index.jsx";



export class HotelsPage extends React.Component{
	constructor(props){
		super(props);

		this.hotels = [];
		this.state = {
			loaded: false,
			hidden: true,
			title: 'hotels'
		};
		this.pageController = this.props.pageController;
	}

	componentDidMount(){
		$.get(window.host + '/hotels/full', function (result) {
			if(result){
				this.hotels = result;
				this.setState({loaded: true });
			}else{
				/*this.hotels = [
					{
						id: 0,
						title: "Hotel 1",
						description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
						phone: "+7 123 554 3423",
						mail: "admin1@hotel1.com",
						address: "hotel1 address"
					},
					{
						id: 1233,
						title: "Hotel 2",
						description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
						phone: "+7 123 554 9999",
						mail: "admin1@hotel2.com",
						address: "hotel2 address"
					}
				];
				this.setState({loaded: true });*/

			}
		}.bind(this));
	}

	close(){
		this.setState({hidden: true});
	}

	open(){
		this.setState({hidden: false});
	}

	render(){
		let hotelsToRender =[];
		if(this.state.loaded){
			if(this.state.hidden){
				return (
					<div className='page HotelPage'>
					</div>
				);
			}

			for(let i = 0; i < this.hotels.length; i++){
				hotelsToRender.push(
					<HotelItem key={this.hotels[i].id}
					           title={this.hotels[i].title}
					           description={this.hotels[i].description}
					           phoneNumber={this.hotels[i].phoneNumber}
					           address={this.hotels[i].address}
					           mail = {this.hotels[i].mail}
					           id = {this.hotels[i].id}
					           parent = {this}
					/> )
			}

			return (
				<div className='page HotelPage'>
					{hotelsToRender}
				</div>
			)
		}else{
			return (
				<div className='page HotelPage'>
				</div>
			);
		}

	}
}





