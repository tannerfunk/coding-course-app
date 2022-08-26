import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../styles/reset.css';
import '../styles/global.css';

const UpdateCourse = () => {

    const [courseUpdateData, setCourseUpdateData] = useState([]);
    const { id } = useParams();

    const url = `${config.apiBaseUrl}/courses/${id}`

    const getCourseUpdateData = async () => {
        await axios.get(url)
            .then(response => setCourseUpdateData(response.data))
            .catch(error => console.log('Error fetching and parsing data', error))
    }

    useEffect(() => {
        getCourseUpdateData();
 
    }, []); 

    // const [title, setTitle] = useState(`${courseUpdateData.title}`);
    // const [desc, setDesc] = useState(`${courseUpdateData.description}`);
    // const [estTime, setEstTime] = useState(`${courseUpdateData.estimatedTime}`);
    // const [materialsNeeded, setMaterialsNeeded] = useState(`${courseUpdateData.materialsNeeded}`);
    // const [errors, setErrors] = useState([]);

    return(
        <div className="wrap">
                <h2>Update Course</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={courseUpdateData.title}></input>

                            <p>By Joe Smith</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={courseUpdateData.description}></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={courseUpdateData.estimatedTime}></input>

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={courseUpdateData.materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
            </div>
    )

}



export default UpdateCourse;