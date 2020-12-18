import React, { Component } from "react";
import SponsorStore from '../SponsorStore'
import './Sponsors.css'

class Sponsors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sponsorDex: 0
        }
    }

    componentDidMount(){
        setInterval(this.switchSponsor, 3000)
    }

    switchSponsor = () =>{
        this.setState({sponsorDex: Math.floor(Math.random() * (SponsorStore.length - 0) + 0)})
    }

    openPage = (args) => {
        window.open(SponsorStore[args].url, '_blank')
    }

    render() {
        return (
            <div className="Sponsors">
                <img src={SponsorStore[this.state.sponsorDex].img} alt={SponsorStore[this.state.sponsorDex].name} onClick={() => this.openPage(this.state.sponsorDex)}></img>
            </div>
        )
    }
}

export default Sponsors