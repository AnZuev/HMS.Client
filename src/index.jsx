import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'whatwg-fetch';

//import {LoginForm} from './components/loginForm/index.jsx';
import {Page} from './pages/Page/Page.jsx';
import {AuthController} from './components/authController/index.jsx';


window.authController = new AuthController();
ReactDOM.render(<Page state={window.authController.isAuthorized() ? "lkPage" : "promo"} />, document.getElementById('app'));
