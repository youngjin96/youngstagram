import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';

import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Env/Firebase";
import { userImage } from "./fetchHomeData";

const resource = userImage();

const Header = () => {
    const [data, setData] = useState(resource.read());

    // const { data } = useQuery(["user_image"], resource.image.read(), {
    //     suspense: true,
    //     refetchOnWindowFocus: false,
    //     useErrorBoundary: false,
    //     onSuccess: data => {
    //         sessionStorage.setItem("user_image", data);
    //         console.log("success");
    //     },
    // });
    const navigate = useNavigate();

    /** 왼쪽 사진 클릭시 내 피드로 넘어가기 */
    const onClickMyFeed = () => {
        navigate("/myFeed");
    }

    /** 오른쪽 플러스 아이콘 클릭시 피드 올리는 페이지로 이동하기 */
    const onClickCreateFeed = () => {
        navigate("/createFeed");
    }

    const onClickLogout = () => {
        signOut(auth).then(() => {
            sessionStorage.clear();
            navigate("/");
        }).catch(() => {
            alert("다시 시도해주세요.");
        });
    }

    return (
        <Grid container style={{ alignItems: "center", textAlign: "center", width: "80%", margin: "auto", marginTop: 70 }}>
            <Grid item xs={4}>
                <Tooltip title="내 피드">
                    <IconButton onClick={onClickMyFeed} style={{ padding: 0 }}>
                        <Avatar src={data} />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h4">
                    <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                        Youngstagram
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Tooltip title="피드 작성">
                    <IconButton onClick={onClickCreateFeed} style={{ padding: 0 }}>
                        <AddPhotoAlternateIcon fontSize="large" color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="로그아웃">
                    <IconButton onClick={onClickLogout} style={{ padding: 0, marginLeft: 20 }}>
                        <ExitToAppIcon fontSize="large" color="grey" />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default Header;