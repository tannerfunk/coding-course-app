import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import config from '../config';
import '../styles/reset.css';
import '../styles/global.css';

const CourseDetail = (props) => {
    const [courseData, setCourseData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const url = `${config.apiBaseUrl}/courses/${id}`

    const getCourseData = async () => {
        await axios.get(url)
            .then(response => setCourseData(response.data))
            .catch(error => console.log('Error fetching and parsing data', error))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        getCourseData();

    // }, []); 
    }, []); 
    console.log(courseData);
    return (
        <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseData.title}</h4>
                            {/* optional chaining! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
                            <p>By {courseData.student?.firstName} {courseData.student?.lastName} </p>

                            <ReactMarkdown>{courseData.description}</ReactMarkdown>
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseData.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown>{courseData.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
    )};

    export default CourseDetail;