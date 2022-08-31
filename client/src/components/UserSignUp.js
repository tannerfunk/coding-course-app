import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/reset.css';
import '../styles/global.css';
import {Context} from './Context/Provider';

const UserSignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const goHome = useNavigate();
    const {actions} = useContext(Context);

    const userInfo = {
        firstName,
        lastName,
        emailAddress,
        password
    }

    //uses user input to send data to set the state using context and calls the API and then signs them in.
    const signUp = (e) => {
        e.preventDefault();

        actions.signUp(userInfo)
            .then (response => {
                console.log(response);
                if (response[0]) {
                    setErrors(response);
                } else {
                    actions.signIn(emailAddress, password)
                    goHome('/');
                }
            });
    }

    return(
        <div className="form--centered">
            <h2>Sign Up</h2>

            {errors.length > 0 ? (
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, index) => {
                            return (
                                <li key= {index}>{error}</li>
                            )
                        })}
                    </ul>
                </div>
            ) : ( <></> )}
                
            <form onSubmit={signUp}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" onChange={ e => setFirstName(e.target.value)}></input>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" onChange={ e => setLastName(e.target.value)}></input>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" onChange={ e => setEmailAddress(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" onChange={ e => setPassword(e.target.value)}></input>
                <button className="button" type="submit">Sign Up</button>
                <Link to='/'><button className="button button-secondary">Cancel</button></Link>
                
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    )
}


export default UserSignUp;