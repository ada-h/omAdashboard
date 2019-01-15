import React, { Component } from 'react';
import './App.css';
import DashboardChart from './Components/Chart/chart'


class App extends Component {
  render() {
    return (
      <div className="App">  
        <DashboardChart/>     
      </div>
    );
  }
}

export default App;
