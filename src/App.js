import React, { Component } from 'react';
import Aircraft from './Aircraft'
import Map from './Map/Map'
import Preshow from './Preshow/Preshow'
import EndShow from './EndShow/EndShow'
import Sponsors from './Sponsors/Sponsors'
import './App.css';

class App extends Component {

  appMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      aircraft: true,
      showmode: "runshow",
      preshowMsg: ""
    }
  }

  componentDidMount() {
    this.appMounted = true;
    this.dbInterval = setInterval(this.listen4DB, 1000)
    // this.updateInterval = setInterval(this.update, 1000)
  }

  componentWillUnmount() {
    this.appMounted = false;
    clearInterval(this.updateInterval)
  }

  listen4DB = () => {
    if (Aircraft.lat) {
      this.setState({ aircraft: true })
      // this.update()
      // this.updateInterval = setInterval(this.update, 1000)
      clearInterval(this.dbInterval)
    }
  }

  update = () => {

  }

  render() {

    return (
      <div className="App">
        {this.state.showmode === "runshow" && <div className="Map_Wrapper">
          <Sponsors />
          <Map />
        </div>}
        {this.state.showmode === "preshow" && <div className="Preshow_Wrapper">
          <Preshow
            message={this.state.preshowMsg}
          />
        </div>}
        {this.state.showmode === "endshow" && <div className="Endshow_Wrapper">
          <EndShow />
        </div>}
      </div>
    )
  }
}

export default App;
