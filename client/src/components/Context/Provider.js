import { createContext, useState } from 'react';
import config from '../../config';
import {Buffer} from 'buffer';

export const Context = createContext();

export const Provider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');

    function api(path, method, body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = Buffer.from(`${credentials.emailAddress}:${credentials.password}`).toString('base64');
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }


        return fetch(url, options);
    };

    async function getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200){
            setAuthEmail(emailAddress);
            setAuthPassword(password);
            return response.json()
                .then(data => setUser(data));
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    async function createUser(user) {
        const response = await this.api(`/users`, 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

    async function getCourses() {
        const response = await this.api(`/courses`);
        if (response.status === 200) {
            return response.json()// check here if weird errors and above i took out null
        } else if (response.status === 401) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

    async function getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET');
        if (response.status === 200) {
            return response.json()
        } else if (response.status === 404) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

    async function createCourse(course, emailAddress, password) {
        const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
        if (response.status === 201) {
            return response.json()
        } else if (response.status === 400) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

    async function updateCourse(course, emailAddress, password) {
        const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {emailAddress, password});
        if (response.status === 204) {
            return response.json()
        } else if (response.status === 400) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

    async function deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return null;
        } else {
            throw new Error();
        }
    }

    async function signOut() {
        setUser(null);
        setAuthEmail('');
        setAuthPassword('');
    }

    return(
        <Context.Provider value={
            {
                user,
                courses,
                course,
                actions: {
                    getUser,
                    createUser,
                    getCourses,
                    getCourse,
                    createCourse,
                    updateCourse,
                    signIn: getUser,
                    signUp: createUser,
                    deleteCourse,
                    signOut
                }
            }
        }>
            {children}
        </Context.Provider>
    );
};
