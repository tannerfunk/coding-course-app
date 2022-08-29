import {useContext} from 'react';
import {Context} from './Context/Provider'
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
    const {user} = useContext(Context);

    //Dennis Ivy "The New Way To Create Protected Routes With React Router V6"
    return ( user.firstName ? <Outlet /> : <Navigate to ="/signin"/>

        );
};

export default PrivateRoute;