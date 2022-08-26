import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';

function App() {
  
  return (
    <>
      <Header />

      <Routes>
        <Route exact path='/courses' element={ <Courses />} />
        <Route path='/' element={ <Navigate to="/courses" />} />
        <Route path='/courses/:id' element={ <CourseDetail />} />
        <Route path='/signin' element={ <UserSignIn />} />
        <Route path='/signup' element={ <UserSignUp /> } />
        <Route path='/courses/create' element={ <CreateCourse />} />
        <Route path='/courses/:id/update' element={ <UpdateCourse />} />
        <Route path='/signout' element={ <UserSignOut />} />
      </Routes>
    </>
  );
}

export default App;
