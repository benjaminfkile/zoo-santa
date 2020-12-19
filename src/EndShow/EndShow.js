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
                        <li>First Interstate Bank</li>
                        <li>Clover Creative</li>
                        <li>Transport Equipment</li>
                        <li>Futurity Welding Services</li>
                    </ul>
                </div>
                <div className="Col_4">
                    <ul>
                        <li>Graybeal Heating and Air Conditioning</li>
                        <li>Beuna Vista Community Inc</li>
                        <li>Union Club Bar</li>
                        <li>Eclipse Bakery</li>
                        <li>Chris Harvey (Location Data)</li>
                        <li>Ben Kile (Site Developer)</li>
                    </ul>
                </div>
                <div className="Contact">
                <a href="https://www.facebook.com/groups/374773957140495/" target="_blank" rel="noopener noreferrer"><img id="fb" src="./res/fb.png" alt="Facebook"/> &nbsp;</a>
                <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=santaflyover@gmail.com" target="_blank" rel="noopener noreferrer"><img id="mail" src="./res/mail.png" alt="email"/> &nbsp;</a>
                </div>
            </div>
        )
    }
}

export default EndShow