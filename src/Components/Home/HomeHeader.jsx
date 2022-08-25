import { Link, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';

import { Grid, Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { signOut } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db, auth } from "../../Env/Firebase";

/** 
 * users 컬렉션 중 아이디 필드 값이 로그인한 유저 아이디와 같은 문서를 가져오고
 * 문서 내에 image 필드 값 리턴
 */
const fetchUserImage = async () => {
    let image = "";
    const q = query(collection(db, "users"), where("id", "==", sessionStorage.getItem("user_id")));
    await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            image = doc.data().image;
        });
    });
    return image;
}

const Header = () => {
    const navigate = useNavigate();

    /** fetchUserImage 함수 실행 -> 세션스토리지에 유저 대표이미지 저장 */
    const { data } = useQuery("user_image", fetchUserImage, { 
        suspense: true,
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: data => {
            sessionStorage.setItem("user_image", data);
        }, 
    });

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
        }).catch((error) => {
            alert("다시 시도해주세요.");
        });
    }

    return (
        <Grid container style={{ alignItems: "center", textAlign: "center", width: "80%", margin: "auto", marginTop: 70 }}>
            <Grid item xs={4}>
                <Tooltip title="내 피드">
                    <IconButton onClick={onClickMyFeed} style={{ padding: 0 }}>
                        <img src={data} style={{ width: 40, height: 40, borderRadius: "50%" }} />
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