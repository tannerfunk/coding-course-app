import React, { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Context} from './Context/Provider';
import '../styles/reset.css';
import '../styles/global.css';


const Header = () => {
    
    const { user } = useContext(Context);

    console.log(user);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to={`/`}>Courses</Link></h1>
                <nav>
                    { user?.firstName ? (
                        <ul className="header--signedin">
                            <li>Welcome, {user?.firstName} {user?.lastName}</li>
                            <li><NavLink to={`/signout`}>Sign Out</NavLink></li>
                        </ul>
                    ) : (
                        <ul className="header--signedout">
                            <li><NavLink to={`/signup`}>Sign Up</NavLink></li>
                            <li><NavLink to={`/signin`}>Sign In</NavLink></li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;