import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import config from '../config';
import '../styles/reset.css';
import '../styles/global.css';


// import Context from './Context/Provider'

const url = config.apiBaseUrl

const UserSignIn = () => {
    // const { setAuth } = useContext(Context);
    const userRef = useRef();
    const errRef = useRef();



    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

// check the scoreboard update 2 project

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try{
    //         const response = await axios.post(`${url}/users`,
    //             JSON.stringify({emailAddress: email, password: password}),
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json; charset=utf-8',
    //                   }, withCredentials: true
    //             }
    //         );
    //         console.log(JSON.stringify(response?.data));
    //         setAuth({})
    //     } catch (err){

    //     }
    // } onSubmit={handleSubmit}


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