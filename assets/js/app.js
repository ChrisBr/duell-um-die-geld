import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './react/gameContainer'

window.jQuery = window.$ = require('../bower_components/jquery/dist/jquery.min.js');
//import bootstrapJs from '../bower_components/bootstrap/dist/js/bootstrap.min.js';
import bootstrapStyles from '../bower_components/bootstrap/dist/css/bootstrap.min.css';


$(function whenDomIsReady() {
    // as soon as this file is loaded, connect automatically,
    //var socket = io.sails.connect();
    //window.socket = socket;

    ReactDOM.render(
      <GameContainer />,
      document.getElementById('root')
    );
});
