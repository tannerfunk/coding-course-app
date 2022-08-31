import React, {useState, useContext} from 'react';
import '../styles/reset.css';
import '../styles/global.css';
import {Link, useNavigate} from 'react-router-dom';

import {Context} from './Context/Provider';


//handles the user sign in experience by checking to maake sure credentials are all good etc
const UserSignIn = () => {

    const {actions} = useContext(Context);
    const goHome = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();

        actions.signIn(email, password)
            .then (response => {
                if (response !== null) {
                    goHome('/');
                };
            });
    }

    return(
        <div className="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={signIn}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={e => setEmail(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={e => setPassword(e.target.value)}></input>
                    <button className="button" type="submit">Sign In</button>
                    <Link to="/"><button className="button button-secondary" >Cancel</button></Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
    )
}

export default UserSignIn;