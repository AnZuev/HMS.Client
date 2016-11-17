import * as React from 'react';


export class InitSearchButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.parent = this.props.parent;
	}
	handleClick(){
		this.parent.props.pageController.changeState("roomSearchPage");
	}
	submit(e) {
		e.preventDefault();
	}

	render() {
		return 	(
			<div className="promotionPageInitSearchButton">
				<button className="btn btn-lg btn-success btn-block" onClick={this.handleClick}>
					 Let's start
				</button>
			</div>
		)
	}

}



