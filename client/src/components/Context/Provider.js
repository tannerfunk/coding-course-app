import { createContext, useState } from 'react';
import config from '../../config';
import {Buffer} from 'buffer';

export const Context = createContext();

//this will be my provider component to provide state through context
export const Provider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        title: "",
        student: {
            firstName: "",
            lastName: "",
            emailAddress: "",
        }
    });
    const [user, setUser] = useState({
        firstName: null,
        lastName: null,
        emailAddress: null,
        id: null
    });
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    //My api function that I will use for all of my API calls to connect to the database that I made previously
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

        const fetched = fetch(url, options);
        return fetched;
    };

    // API CALLS

    async function getUser(emailAddress, password) {
        const response = await api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200){
            setEmailAddress(emailAddress);
            setPassword(password);
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
        const response = await api(`/users`, 'POST', user);
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
        const response = await api(`/courses`);
        if (response.status === 200) {
            response.json().then(data => setCourses(data.courses));
            // console.log(courses);
            return (courses);
        } else if (response.status === 401) {
            return null
        } else {
            throw new Error();
        }
    }

    async function getCourse(id) {
        const response = await api(`/courses/${id}`);
    
        if (response.status === 200) {
          response.json()
            .then(data => setCourse(data));
          return (course);
        } else if (response.status === 404) {
          return null;
        } else {
          throw new Error();
        }
      };

    async function createCourse(courseInfo) {
        const response = await api(`/courses`, 'POST', courseInfo, true, {emailAddress, password});
        if (response.status === 201) {
            return response;
        } else if (response.status === 400) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

    async function updateCourse(id, courseInfo) {
        const response = await api(`/courses/${id}`, 'PUT', courseInfo, true, {emailAddress, password});
        if (response.status === 204) {
            return true;
        } else if (response.status === 400) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

    async function deleteCourse(id) {
        const response = await api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return true;
        } else {
            throw new Error();
        }
    }

    async function signOut() {
        setUser(null);
        setEmailAddress('');
        setPassword('');
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
