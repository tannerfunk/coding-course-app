import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import '../styles/reset.css';
import '../styles/global.css';

const UserSignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);


    return(
        <div className="form--centered">
            <h2>Sign Up</h2>
                
            <form>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value=""></input>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value=""></input>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value=""></input>
                <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
            </form>
            <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
        </div>
    )
}


export default UserSignUp;