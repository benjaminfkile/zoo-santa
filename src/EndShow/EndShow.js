import React, { Component } from 'react'
import './EndShow.css'

class EndShow extends Component {

    render() {
        return (
            <div className="End_Show">
                <h1>Missoula Santa Tracker</h1>
                <h2>We could not have done this without your help!</h2>
                <div className="Col_1">
                    <ul>
                        <li>Missoula Downtown Foundation</li>
                        <li>RDO</li>
                        <li>Minuteman Aviation Inc.</li>
                        <li>Stockman Bank</li>
                        <li>Missoula Fresh Market</li>

                    </ul>
                </div>
                <div className="Col_2">
                    <ul>
                        <li>Missoula Area Central Labor Counsel</li>
                        <li>Western Montana Building Trades</li>
                        <li>Sorenson Transport</li>
                        <li>D&#38;G Crane Services</li>
                        <li>High Country Carriers LLC</li>
                    </ul>

                </div>
                <div className="Col_3">
                    <ul>
                        <li>Trail West Bank</li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default EndShow