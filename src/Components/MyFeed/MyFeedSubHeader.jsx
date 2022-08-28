
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

import { Grid, Typography, Button } from "@mui/material";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Env/Firebase";

const fetchUserData = async() => {
    console.log("fetch")
    let userData = {};
    const docSnap = await getDoc(doc(db, "users", sessionStorage.getItem("user_id")));
    userData = docSnap.data();
    return userData;
}

const MyFeedSubHeader = () => {
    const navigate = useNavigate();
    const { isLoading, data } = useQuery(["user_data"], fetchUserData, {refetchOnWindowFocus: false});

    if (isLoading) return <div>wait..</div>;

    /** 프로필 편집 버튼 누를 시 state안의 자료형 보내면서 "/edit"으로 이동 */
    const onClickEdit = () => {
        navigate("/myProfileEdit", {
            state: {
                name: data.name,
                introduce: data.introduce,
                userImage: data.image
            }
        });
    }

    return (
        <Grid container style={{ alignItems: "center", textAlign: "center", width: "80%", margin: "auto", marginTop: 50 }}>
            <Grid item xs={6}>
                <img src={data.image} style={{ width: "50%", height: 250, borderRadius: "50%" }} />
            </Grid>
            <Grid item xs={6}>
                {data.count_feed}
                <Typography>
                    게시물
                </Typography>
            </Grid>
            <Grid item xs={6} style={{ marginTop: 10 }}>
                <Typography>
                    {data.name}
                </Typography>
            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={6} style={{ marginTop: 10 }}>
                <Typography>
                    {data.introduce}
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 30 }}>
                <Button variant="contained" onClick={onClickEdit} style={{ width: "60%", backgroundColor: "black", color: "white" }}>
                    프로필 편집
                </Button>
            </Grid>
        </Grid>
    )
}

export default MyFeedSubHeader;