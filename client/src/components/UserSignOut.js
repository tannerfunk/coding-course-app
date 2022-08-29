import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Context} from './Context/Provider';

const UserSignOut = () => {
    const { actions } = useContext(Context);
    const goHome = useNavigate('/');

    useEffect(() => {
        actions.signOut();
        goHome('/');
    });



}

export default UserSignOut;