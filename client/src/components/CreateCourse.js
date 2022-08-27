import React, {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import '../styles/reset.css';
import '../styles/global.css';
import {Context} from './Context/Provider';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [estTime, setEstTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    const {actions} = useContext(Context);
    const {user} = useContext(Context);


    const goHome = useNavigate();

    const createCourse = (e) => {
        e.preventDefault();


        const courseInfo = {
            title,
            desc,
            estTime,
            materialsNeeded,
            userId: user.userId
        }

        actions.createCourse(courseInfo)
            .then(response => {
                if(response.errors) {
                    setErrors(response.errors);
                } else {
                    goHome('/');
                }
            });
    }

    console.log(user); //blank object.... gotta figure out how to make the user the one who's currently logged in..



    return(
        <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text"onChange={e => setTitle(e.target.value)}></input>

                            <p>By {user.firstName} {user.lastName} </p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"onChange={e => setDesc(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text"onChange={e => setEstTime(e.target.value)}></input>

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