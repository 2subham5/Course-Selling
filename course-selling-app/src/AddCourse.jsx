import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from "react";
import axios from "axios";
function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage]= useState("");
    const[price,setPrice]= useState(0);
    return (
        <div style={{ display: "flex", justifyContent: "centre" }}>
            <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
                <TextField
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                />
                <Button size={"large "} variant="contained"
                    onClick={async() => {
                        // fetch("http://localhost:3000/admin/courses", {
                        //     method: "POST",
                        //     body: JSON.stringify({
                        //         title: title,
                        //         description: description
                        //     }),
                        //     headers: {
                        //         "Content-type": "application/json",
                        //         "Authorization": "Bearer " + localStorage.getItem("token")
                        //     }
                        // })
                        //     .then(res => {
                        //         if (!res.ok) {
                        //             throw new Error(`HTTP error! Status: ${res.status}`);
                        //         }
                        //         return res.json();
                        //     })
                        //     .then(() => {
                        //         alert("course added")
                        //     })
                        //     .catch(error => {
                        //         console.error("Error:", error.message);
                        //     });
                        await axios.post("http://localhost:3000/admin/courses",{
                            title:title,
                            description:description,
                            imageLink:image,
                            published: true,
                            price: price
                        },
                        {
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Course added!");
                    }}

                >Add Course</Button>
            </Card>
        </div>
    )
}

export default AddCourse;