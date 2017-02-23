import React from 'react';
import ReactDOM from 'react-dom';
import UserContainer from './react/userContainer'

//import $ from '../bower_components/jquery/dist/jquery.min.js';
//window.jQuery = window.$ = '../bower_components/jquery/dist/jquery.min.js';
//import bootstrapJs from '../bower_components/bootstrap/dist/js/bootstrap.min.js';
import bootstrapStyles from '../bower_components/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <UserContainer name="Christian"/>,
  document.getElementById('root')
);
