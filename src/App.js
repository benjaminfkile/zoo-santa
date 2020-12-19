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
      showmode: "endshow",
      preshowMsg: ""
    }
  }

  componentDidMount() {
    this.appMounted = true;
    this.dbInterval = setInterval(this.listen4DB, 1000)
    this.updateInterval = setInterval(this.update, 1000)
  }

  componentWillUnmount() {
    this.appMounted = false;
    clearInterval(this.updateInterval)
  }

  listen4DB = () => {
    if (Aircraft[0].data) {
      this.setState({ aircraft: true })
      this.update()
      this.updateInterval = setInterval(this.update, 1000)
      clearInterval(this.dbInterval)
    }
  }

  update = () => {
    try {
      this.setState({
        showmode: Aircraft[0].data.getElementsByTagName("showmode")[0].innerHTML,
        preshowMsg: Aircraft[0].data.getElementsByTagName("preshow_msg")[0].innerHTML
      })
    } catch {
      console.log('failed to set state')
    }
    console.log(Aircraft[0].data)
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
