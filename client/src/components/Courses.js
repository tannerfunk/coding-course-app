import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import '../styles/reset.css';
import '../styles/global.css';



const Courses = () => {
    const [data, setData] = useState([]);
    const url = `${config.apiBaseUrl}/courses`

    const getData = async () => {
        await axios.get(url)
            .then(response => setData(response.data.courses))
            .catch(error => console.log('Error fetching and parsing data', error))
    }

    useEffect(() => {
        getData();
    // }, []); 
    }); 
    console.log(data);
    return (
        <div className="wrap main--grid">
            { data.map((data) => {
                return (
                    <a key={data.id} className="course--module course--link" href="course-detail.html">
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{data.title}</h3>
                    </a>
                );
            })}
            <a className="course--module course--add--module" href="create-course.html">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    );
}

export default Courses;