import React from 'react';
import { options } from '../../api/routes';
import config from './config';

export default class Data {
    api(path, method, body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const option = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options);
    }

    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200){
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    async createUser(user) {
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

    async getCourses(id, emailAddress, password) {
        const response = await this.api(`/courses`, 'GET', id, true, {emailAddress, password});
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

    async getCourse(id) {
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

    async createCourse(course, emailAddress, password) {
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

    async updateCourse(course, emailAddress, password) {
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

    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return null;
        } else {
            throw new Error();
        }
    }
}