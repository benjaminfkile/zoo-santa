import React, { Component } from 'react'
import './Preshow.css'

class Preshow extends Component {

    preshowMounted = false
    constructor(props) {
        super(props);
        this.state = {
            message: ""

        }
    }

    componentDidMount() {
        this.preshowMounted = true;
        this.updateInterval = setInterval(this.update, 1000)
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
            console.log(this.props.message)
        } catch {
            console.log('failed to set state')
        }
    }

    render() {
        return (
            <div className="Preshow">
                <h1>
                    Missoula Santa Tracker
                </h1>
                <h2>
                    Santa's Status
                </h2>
                
                <p dangerouslySetInnerHTML={{ __html: this.state.message }}></p>
            </div>
        )
    }

}

export default Preshow