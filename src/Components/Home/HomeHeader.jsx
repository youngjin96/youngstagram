import { useEffect } from "react";
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
import Loader from "../../Env/Loader";
import { useHomeStore } from "../../Env/store";

const Header = () => {
    const { userInfo, setUserInfo } = useHomeStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!userInfo) {
            getDoc(doc(db, "users", sessionStorage.getItem("user_id"))).then((res) => {
                setUserInfo(res.data());
            })
        }
    }, []);

    if (!userInfo) return <Loader />

    /** 왼쪽 사진 클릭시 내 피드로 넘어가기 */
    const onClickMyFeed = () => {
        navigate("/myFeed");
    }

    /** 오른쪽 플러스 아이콘 클릭시 피드 올리는 페이지로 이동하기 */
    const onClickCreateFeed = () => {
        navigate("/createFeed");
    }

    /** 로그아웃 기능
     *  세션스토리지 클리어 후 로그인 페이지로 이동
     */
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
                        <Avatar src={userInfo.image} alt="user_image" />
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