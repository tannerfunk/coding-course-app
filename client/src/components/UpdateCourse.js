import React, {useEffect, useContext, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {Context} from './Context/Provider';
import '../styles/reset.css';
import '../styles/global.css';

//this function pulls in from CONTEXT the global state of the values for the respective spots.. this way they have them and can be modified, after they click submit the values will then be set to the global state
const UpdateCourse = () => {
    const {actions} = useContext(Context);
    const {course} = useContext(Context);
    const {user} = useContext(Context);

    const goBack = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [estimatedTime, setEstimatedTime] = useState(course.estimatedTime);
    const [materialsNeeded, setMaterialsNeeded] = useState(course.materialsNeeded);
    const [errors, setErrors] = useState([]);

    //on page load pull the data needed
	useEffect(() => {
		const getCourse = async () => {
			await actions.getCourse(id);
		};
		getCourse();
	}, []);

    //This sets the data to the global state
    const updateCourse = (e) => {
        e.preventDefault();

        const courseInfo = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: user.id
        }

        actions.updateCourse(id, courseInfo)
            .then(response => {
                if (response[0]) {
                    setErrors(response);
                } else {
                    goBack(`/courses/${id}`);
                }
            })
    }



    return (
        <main>
            <div className='wrap'>
                <h2>Update Course</h2>
            
                {errors.length > 0 ? (
                    <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                    {errors.map((error, id) => {
                        return ( 
                        <li key={id}>{error}</li>
                        )
                    })}
                    </ul>
                </div>  
                ) : (
                    <></>
                )}
                
                    <form onSubmit={updateCourse}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} onChange={e => setTitle(e.target.value)}></input>

                                <p>By {course.student.firstName} {course.student.lastName}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} onChange={e => setEstimatedTime(e.target.value)}></input>

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} onChange={e => setMaterialsNeeded(e.target.value)}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Update Course</button>
                        <Link to={`/courses/${id}`}><button className="button button-secondary" >Cancel</button></Link>
                    </form>
                </div>
        </main>
    )
    

}



export default UpdateCourse;