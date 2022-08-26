import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import '../styles/reset.css';
import '../styles/global.css';

const UserSignIn = () => {
    const [userData, setUserData] = useState([]);

// check the scoreboard update 2 project

    return(
        <div className="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value=""></input>
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html';" >Cancel</button>
                    {/* onClick="event.preventDefault(); location.href='index.html';" */}
                </form>
                <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
                
            </div>
    )
}

export default UserSignIn;