
import React from 'react';
import ReactDOM from 'react-dom';
import "core-js/stable";
import "regenerator-runtime/runtime";
import App from '../components/app/app';
import {Provider} from "react-redux";
import store from "../redux/store/index";

window.onload = async function() {

    // passed globals from backend
    global.DEBUG = (document.body.dataset.debug === 'true');
    global.NODE_ENV = document.body.dataset.node_env;

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app'));
};

