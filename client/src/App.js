import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';

function App() {
  
  return (
    <>
      <Header />

      <Routes>
        <Route exact path='/' element={ <Courses />} />
        <Route path='/courses/:id' element={ <CourseDetail />} />
      </Routes>
    </>
  );
}

export default App;
