import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import { signOut } from "firebase/auth";
import { auth } from "../../Env/Firebase";

const userImage = sessionStorage.getItem("user_image");

const MyFeedHeader = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);

    /** 세팅 메뉴 오픈 */
    const handleOpenSetting = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    /** 세팅 메뉴 오프 */
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /** 클릭 시 내 피드 페이지로 이동 */
    const onClickMyFeed = () => {
        navigate("/myFeed");
    }

    /** 클릭 시 피드 생성 페이지로 이동 */
    const onClickCreateFeed = () => {
        navigate("/createFeed");
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
        <Grid container style={{ alignItems: "center", textAlign: "center", width: "80%", margin: "auto", marginTop: 70 }}>
            <Grid item xs={4}>
                <Tooltip title="내 피드">
                    <IconButton onClick={onClickMyFeed} style={{ padding: 0 }}>
                        <Avatar src={userImage} />
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
                    <IconButton onClick={onClickCreateFeed}>
                        <AddPhotoAlternateIcon fontSize="large" color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="환경설정">
                    <IconButton
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenSetting}
                        style={{ padding: 0, marginLeft: 20 }}
                    >
                        <SettingsIcon fontSize="large" color="grey" />
                    </IconButton>
                </Tooltip>
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