import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Signup from './Signup'
import Signin from './Signin';
import AddCourse from './AddCourse';
import Appbar from './Appbar';
import Courses from './Courses';
import Course from './Course';

import './App.css'



function App() {
  // const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
      fetch('http://localhost:3000/admin/me', {
          method: "GET",
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
      .then(res => res.json())
      .then((data) => {
          if (data.username) {
              setUserEmail(data.username);
          }
      });
  }, []);

  return (
    <div style={{
      width: "100vw",
      height: "100vw",
      backgroundColor: "#eeeeee"
    }} >
      <Router>
        <Appbar userEmail={userEmail} setUserEmail={setUserEmail}></Appbar>
        <Routes>
        
        <Route path="/courses" element={<Courses />} /> 
        <Route path="/course/:courseId" element={<Course />} /> 
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signin" element={<Signup />} />
          {/* <Route path="/userSignup" element={<UserSignup />} /> */}
        </Routes>
      </Router>

    </div>
  )
}

export default App;
