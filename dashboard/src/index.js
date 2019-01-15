import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Including the linechart component
import '../node_modules/react-linechart/dist/styles.css';

//Implementing Redux
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootreducer from './Reducers/rootreducer';


const store = createStore(rootreducer)
ReactDOM.render(<Provider store = {store}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
