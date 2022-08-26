import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import '../styles/reset.css';
import '../styles/global.css';

const UserSignIn = () => {
    const [userData, setUserData] = useState([]);



    return(
        <div className="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value=""></input>
                    <button class="button" type="submit">Sign In</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
                
            </div>
    )
}

export default UserSignIn;