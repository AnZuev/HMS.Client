import * as React from 'react';


export class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.state = {
			commonError: "",
			firstNameError: "",
			lastNameError: "",
			fatherNameError: "",
			phoneNumberError: "",
			mailError: "",
			passwordError: ""
		}
	}

	submit(e) {
		e.preventDefault();
		let data = SignUpForm.validateForm();

		let url = window.host + '/auth/signUp';
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status <= 401){
				return response.json()
					.then((json) => {
						if(response.status == 200){
							this.setState({
								status: "loaded"
							});
							window.authController.setAuthData(data.mail);
							window.authController.setUserData(json);

							let action = window.tmpData.afterAuthAction;
							if(action){
								console.log(action);
								action.apply();
							}else{
								window.page.menu.brandClickHandler();
							}
						}else if(response.status == 400) {
							json.fieldErrors.forEach((fieldError) => {
								this.showError(fieldError);
							});
							this.setState({
								commonError: json.commonErrors[0]
							})
						}else if(response.status == 401){
							this.setState({
								commonError: json.commonErrors[0]
							})
						}
					})
			}else{
				console.log("server error");
				//server error happened, need to be somehow handled
				new Error({exception: true, type: "Server Error"});
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			console.log(err);
		});
	}

	showError(error){
		switch(error.field){
			case "firstName":
				this.setState({firstNameError: error.message});
				break;
			case "secondName":
				this.setState({lastNameError: error.message});
				break;
			case "fatherName":
				this.setState({fatherNameError: error.message});
				break;
			case "phoneNumber":
				this.setState({phoneNumberError: error.message});
				break;
			case "mail":
				this.setState({mailError: error.message});
				break;
			case "password":
				this.setState({passwordError: error.message});
				break;
		}

	}
	static validateForm() {
		var obj = {};
		obj.firstName = $('#signUpForm__firstName').val();
		obj.secondName = $('#signUpForm__lastName').val();
		obj.fatherName = $('#signUpForm__fatherName').val();
		obj.mail = $('#signUpForm__mail').val();
		obj.password = $('#signUpForm__password').val();
		obj.phoneNumber = $('#signUpForm__phoneNumber').val();
		return obj;
	}

	render() {
		return 	(
				<form className="login-form form-horizontal signUpForm" onSubmit={this.submit}>
					<p className="text-danger text-xs-center">{this.state.commonError}</p>
					<div className="form-group">
						<label htmlFor="signUpForm__firstName">First name</label>
						<input type="text" className="form-control" id="signUpForm__firstName" placeholder="Your name" required />
						<span className="small text-danger">{this.state.firstNameError}</span>
					</div>
					<div className="form-group">
						<label htmlFor="signUpForm__lastName">Surname</label>
						<input type="text" className="form-control" id="signUpForm__lastName" placeholder="Your surname" required />
						<span className="small text-danger">{this.state.lastNameError}</span>
					</div>
					<div className="form-group">
						<label htmlFor="signUpForm__fatherName">Middle name</label>
						<input type="text" className="form-control" id="signUpForm__fatherName" placeholder="Your father name" required />
						<span className="small text-danger">{this.state.fatherNameError}</span>
					</div>
					<div className="form-group">
						<label htmlFor="signUpForm__phoneNumber">Phone number</label>
						<input type="tel" className="form-control" id="signUpForm__phoneNumber" placeholder="Your phone number" required />
						<span className="small text-danger">{this.state.phoneNumberError}</span>
					</div>
					<div className="form-group">
						<label htmlFor="signUpForm__mail">Email address</label>
						<input type="email" data-minlength="6" className="form-control" id="signUpForm__mail" placeholder="Your mail" required />
						<span className="small text-danger">{this.state.mailError}</span>
					</div>
					<div className="form-group">
						<label htmlFor="signUpForm__password">Password</label>
						<input type="password" data-minlength="6" className="form-control" id="signUpForm__password" placeholder="Password..." />
						<span className="small text-danger">{this.state.passwordError}</span>
					</div>
					<button className="btn btn-lg btn-success btn-block" type='submit' >Sign Up :)</button>
				</form>)
	}

}



