import React, {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import '../styles/reset.css';
import '../styles/global.css';
import {Context} from './Context/Provider';

// creates the course and sets the data state to be the information provided by user
const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    const {actions} = useContext(Context);
    const {user} = useContext(Context);


    const goHome = useNavigate();

    const createCourse = (e) => {
        e.preventDefault();


        const courseInfo = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: user.id
        }

        actions.createCourse(courseInfo)
            .then(response => {
                if(response[0]) {
                    setErrors(response);
                } else {
                    goHome('/');
                }
            });
    }

    return(
        <div className="wrap">
                <h2>Create Course</h2>
                {errors.length > 0? (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, index) => {
                                return (
                                    <li key={index}>{error}</li>
                                )
                            })}
                        </ul>
                    </div>
                ) : (
                <></>
                )
                }
                
                <form onSubmit={createCourse}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text"onChange={e => setTitle(e.target.value)}></input>

                            <p>By {user.firstName} {user.lastName} </p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text"onChange={e => setEstimatedTime(e.target.value)}></input>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"onChange={e => setMaterialsNeeded(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <Link to="/"><button className="button button-secondary">Cancel</button></Link>
                </form>
            </div>
        )
}


export default CreateCourse;