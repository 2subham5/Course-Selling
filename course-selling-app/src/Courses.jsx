import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Courses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
    //     fetch("http://localhost:3000/admin/courses", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }  
    //     }).then((res) => {
    //         res.json().then((data) => {
    //             setCourses(data);
    //         })
    //     })
     axios.get("http://localhost:3000/admin/courses",{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>{
            setCourses(res.data);
        })
    }, []);
    return <div style={{display:"flex"}}>
        Courses
        {/* courses is an object so need to stringify */}
        {/* {JSON.stringify(courses)}  */}
        {courses.map((course)=>{
            return <Course course={course} />
        })}
        </div>
}

export function Course (props){
    const navigate = useNavigate();
    return <Card style={{
        border: "2px solid black",
        margin: 10,
        width: 300
    }}>
    {/* title description all these from backend */}
 <Typography textAlign={"centre"} variant="h4">{props.course.title}</Typography>
 <Typography textAlign={"centre"} variant="h4">{props.course.description}</Typography>
 <img style={{width:300, height:200}} src = {props.course.imageLink}></img>
 <div><Button onClick={()=>{
    // _id is the convention used for id's
    navigate("/course/" + props.course._id);
 }}>
    Edit
 </Button></div>
    </Card>
    }

export default Courses;