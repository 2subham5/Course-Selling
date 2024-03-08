import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

function Course() {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams(); // Make sure this matches the route parameter name in your backend, i.e., petId

  useEffect(() => {
    // console.log("Fetching pet with ID:", petId);
    axios.get(`http://localhost:3000/admin/course/${courseId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        
        setCourse(res.data.course); //  pet data is returned as res.data.pet
      })
      .catch((error) => {
        console.error("Error fetching pet:", error);
      });
  }, [courseId]);

  if (!course) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div style={{display:"flex"}}>
    Course
     {/* courses is an object so need to stringify */}
     {/* {JSON.stringify(course)}  */}
     {/* {pet.map((petItem)=>{
         return <Course course={petItem} />
     })} */}
     <Card style={{
        border: "2px solid black",
        margin: 10,
        width: 300
    }}>
    {/* title description all these from backend */}
 <Typography textAlign={"centre"} variant="h4">{course.title}</Typography>
 <Typography textAlign={"centre"} variant="h4">{course.description}</Typography>
 <Typography textAlign={"centre"} variant="h4">{course.price}</Typography>
 <img style={{width:300, height:200}} src = {course.imageLink}></img>
 <UpdateCard course={course}/>
    </Card>
     </div>
   
  );
}

// update card

function UpdateCard({ course, onUpdate }) {
  const { courseId } = useParams();
  const [updatedCourse, setUpdatedCourse] = useState({
    title: course.title,
    description: course.description,
    price: course.price,
    imageLink: course.imageLink,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios.put(`http://localhost:3000/admin/course/${courseId}`, updatedCourse, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        onUpdate(res.data.course);
      })
      .catch((error) => {
        console.error("Error updating Course:", error);
      });
  };

  return (
    <Card style={{
      border: "2px solid black",
      margin: 10,
      width: 300
    }}>
      <TextField
        name="title"
        label="Title"
        value={updatedCourse.title}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        value={updatedCourse.description}
        onChange={handleChange}
      />
       <TextField
        name="price"
        label="Price"
        value={updatedCourse.price}
        onChange={handleChange}
      />
      <TextField
        name="imageLink"
        label="Image Link"
        value={updatedCourse.imageLink}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Update</Button>
    </Card>
  );
}



export default Course;
