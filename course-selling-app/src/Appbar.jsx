import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Appbar({userEmail,setUserEmail}) {
    const navigate = useNavigate();
    // const [userEmail, setUserEmail] = useState(null);

    // useEffect(() => {
    //     fetch('http://localhost:3000/admin/me', {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     })
    //     .then(res => res.json())
    //     .then((data) => {
    //         if (data.username) {
    //             setUserEmail(data.username);
    //         }
    //     });
    // }, []);

    if (userEmail) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>
                    <Typography variant={"h6"}>Nucleus</Typography>
                </div>
                <div>{userEmail}</div>
                <div>
                    <Button variant={"contained"} onClick={() => {
                        localStorage.setItem("token", null);
                        // navigate("/logout");
                        setUserEmail(null);
                    }}>
                        Logout
                    </Button>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>
                    <Typography variant={"h6"}>Nucleus</Typography>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                        <Button variant={"contained"} onClick={() => navigate("/signin")}>
                            Signup
                        </Button>
                    </div>
                    <div>
                        <Button variant={"contained"} onClick={() => navigate("/login")}>
                            Signin
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Appbar;
