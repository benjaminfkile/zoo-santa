import React, { Component } from 'react'
import Snow from '../Snow/Snow'
import SponsorStore from '../SponsorStore'
import './Preshow.css'

class Preshow extends Component {

    preshowMounted = false
    sponsorDex = 0
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            sponsor: 0

        }
    }

    componentDidMount() {
        this.preshowMounted = true;
        this.updateInterval = setInterval(this.update, 1000)
        setInterval(this.switchSponsor, 8000)
    }

    componentWillUnmount() {
        this.preshowMounted = false;
        clearInterval(this.updateInterval)
    }

    update = () => {
        try {
            this.setState({
                message: this.props.message
            })
        } catch {
            console.log('failed to set state')
        }
    }

    switchSponsor = () => {
        this.sponsorDex += 1
        if (this.sponsorDex > SponsorStore.length - 1) {
            this.sponsorDex = 0
        }
        this.setState({ sponsor: this.sponsorDex })
    }

    openPage = (args) => {
        window.open(SponsorStore[args].url, '_blank')
    }

    render() {
        return (
            <div className="Preshow">

                <Snow />

                <div className="Status">
                    <h1>
                        Missoula Santa Tracker
                </h1>
                    <h2>
                        Santa's Status
                </h2>
                    <p dangerouslySetInnerHTML={{ __html: this.state.message }}></p>
                </div>
                <div className="Route">
                    <img src="./res/route.png" alt="route" id="route"></img>
                </div>
                <p>Sponsored by</p>
                <div className="Sponsor_Preshow">
                    <img src={SponsorStore[this.state.sponsor].img} alt={SponsorStore[this.state.sponsor].name} onClick={() => this.openPage(this.state.sponsor)}></img>
                </div>
            </div>
        )
    }

}

export default Preshow