import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { signOut } from "firebase/auth";
// import { getDocs, query, collection, where } from "firebase/firestore";

import { db, auth } from "../../Env/Firebase";

const MyFeedHeader = () => {
    const navigate = useNavigate();
    // const id = sessionStorage.getItem("user_id");
    const userImage = sessionStorage.getItem("user_image");
    const [anchorElNav, setAnchorElNav] = useState(null);

    // useEffect(() => {
    //     const q = query(collection(db, "users"), where("id", "==", id));
    //     getDocs(q).then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             setUserImage(doc.data().image);
    //         });
    //     });
    // }, []);

    /** 세팅 메뉴 오픈 */
    const handleOpenSetting = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    /** 세팅 메뉴 오프 */
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /** 왼쪽 사진 클릭시 내 피드로 넘어가기 */
    const onClickMyFeed = () => {
        navigate("/myFeed");
    }

    /** 오른쪽 설정 아이콘 클릭시 나오는 메뉴 중 로그아웃 버튼을 누르면
     *  로그아웃을 진행한 후 로그인 화면으로 넘어간다.
     */
    const onClickLogout = () => {
        setAnchorElNav(null);
        signOut(auth).then(() => {
            sessionStorage.clear();
            navigate("/");
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <Grid container style={{ alignItems: "center", textAlign: "center", width: "80%", margin: "auto", marginTop: 70, top: 0, position: "sticky" }}>
            <Grid item xs={4}>
                {userImage &&
                    <IconButton onClick={onClickMyFeed} style={{ padding: 0 }}>
                        <img src={userImage} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                    </IconButton>
                }
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h4">
                    <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                        Youngstagram
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <IconButton
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenSetting}
                    style={{ padding: 0 }}
                >
                    <SettingsIcon fontSize="large" color="grey" />
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                >
                    <MenuItem onClick={onClickLogout}>
                        <Typography variant="button">
                            로그아웃
                        </Typography>
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    )
}

export default MyFeedHeader;