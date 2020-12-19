import React, { Component } from "react";
import SponsorStore from '../SponsorStore'
import './Sponsors.css'

class Sponsors extends Component {

    sponsorDex = 0
    constructor(props) {
        super(props);
        this.state = {
            sponsor: 0
        }
    }

    componentDidMount(){
        setInterval(this.switchSponsor, 8000)
    }

    switchSponsor = () =>{
        this.sponsorDex += 1
        if(this.sponsorDex > SponsorStore.length -1){
            this.sponsorDex = 0
        }
        this.setState({sponsor: this.sponsorDex})
        console.log(this.sponsorDex)
    }

    openPage = (args) => {
        window.open(SponsorStore[args].url, '_blank')
    }

    render() {
        return (
            <div className="Sponsors">
                <img src={SponsorStore[this.state.sponsor].img} alt={SponsorStore[this.state.sponsor].name} onClick={() => this.openPage(this.state.sponsor)}></img>
            </div>
        )
    }
}

export default Sponsors