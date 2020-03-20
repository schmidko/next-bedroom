
import React from 'react';
import ReactDOM from 'react-dom';
import "core-js/stable";
import "regenerator-runtime/runtime";

window.onload = async function() {

    // pass globals to frontend
    global.DEBUG = (document.body.dataset.debug === 'true');

    ReactDOM.render(
            <div />,
        document.getElementById('app'));
};

