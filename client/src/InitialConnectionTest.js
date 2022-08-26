// import React, { useEffect, useState } from 'react';
// import config from './config';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const user = `${config.apiBaseUrl}/courses`;
//     axios.get(user)
//       .then(response => setData(response.data.courses), console.log('success connecting to your REST API!'))
//       .catch(error => console.log('Error fetching and parsing data', error))
//   }, []);
//   return (
//     <ul>
                // // maps over the data and pulls the title
//       { data.map((data) => <li>{data.title}</li>)}
//     </ul>
//   );
// }

// export default App;
