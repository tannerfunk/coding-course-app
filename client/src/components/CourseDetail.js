import React, { useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Context} from './Context/Provider';
import '../styles/reset.css';
import '../styles/global.css';

const CourseDetail = (props) => {
    const {actions} = useContext(Context);
    const {course} = useContext(Context);
    const {user} = useContext(Context);

    const { id } = useParams();

    const goHome = useNavigate();

	useEffect(() => {
		const getCourse = async () => {
			await actions.getCourse(id);
		};
		getCourse();
	}, []);

    const deleteCourse = () => {
        actions.deleteCourse(course.id)
            .then(response => {
                if (response === true) {
                    goHome('/');
                }
            }) 
    }
    // if(course !== null) {}
    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                    <Link className="button" to="#">Delete Course</Link>
                    <Link className="button button-secondary" to={`/`}>Return to List</Link>
                </div>
            </div>
            <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>By {course.student.firstName} {course.student.lastName} </p>

                                <ReactMarkdown>{course.description}</ReactMarkdown>
                                
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
        </>
    )};

    export default CourseDetail;