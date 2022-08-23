import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, Button } from "@mui/material";

import { getDocs, query, collection, where } from "firebase/firestore";

import { db } from "../../Env/Firebase";
import EditHeader from "./MyFeedHeader";

const MyFeed = () => {
    const navigate = useNavigate();
    const id = sessionStorage.getItem("user_id");
    const [data, setData] = useState();

    useEffect(() => {
        const q = query(collection(db, "users"), where("id", "==", id));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setData({
                    name: doc.data().name,
                    userImage: doc.data().image,
                    countFeed: doc.data().count_feed,
                    introduce: doc.data().introduce
                })
            });
        });
    }, []);

    const onClickEdit = () => {
        navigate("/edit", {
            state: {
                name: data.name,
                introduce: data.introduce,
                userImage: data.userImage
            }
        });
    }

    return (
        <>
            <EditHeader />
            <Grid container style={{ alignItems: "center", textAlign: "center", width: "80%", margin: "auto", marginTop: 50 }}>
                <Grid item xs={6}>
                    {data && <img src={data.userImage} style={{ width: "50%", height: 250, borderRadius: "50%" }} />}
                </Grid>
                <Grid item xs={6}>
                    {data && data.countFeed}
                    <Typography>
                        게시물
                </Typography>
                </Grid>
                <Grid item xs={6} style={{ marginTop: 10 }}>
                    <Typography>
                        {data && data.name}
                    </Typography>
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6} style={{ marginTop: 10 }}>
                    <Typography>
                        {data && data.introduce}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 30 }}>
                    <Button variant="contained" onClick={onClickEdit} style={{ width: "60%", backgroundColor: "black", color: "white" }}>
                        프로필 편집
                </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default MyFeed;