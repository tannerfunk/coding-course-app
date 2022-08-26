import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/global.css';



const Courses = () => {
    const [coursesData, setCoursesData] = useState([]);
    const url = `${config.apiBaseUrl}/courses`

    const getCoursesData = async () => {
        await axios.get(url)
            .then(response => setCoursesData(response.data.courses))
            .catch(error => console.log('Error fetching and parsing data', error))
    }

    useEffect(() => {
        getCoursesData();
    // }, []); 
    }, []); 
    // console.log(coursesData);
    return (
        <div className="wrap main--grid">
            { coursesData.map((coursesData) => {
                return (
                    <Link key={coursesData.id} className="course--module course--link" to={`/courses/${coursesData.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{coursesData.title}</h3>
                    </Link>
                );
            })}
            <Link className="course--module course--add--module" to={`/courses/create`}>
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </Link>
        </div>
    );
}

export default Courses;