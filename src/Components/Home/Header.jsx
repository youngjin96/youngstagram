import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { getDocs, query, collection, where } from "firebase/firestore";

import { db } from "../../Env/Firebase";

const Header = () => {
    const navigate = useNavigate();
    const id = sessionStorage.getItem("user_id");
    const [userImage, setUserImage] = useState("");

    /** 로그인할 때 유저의 id를 세션스토리지에 저장했다.
     *  이를 이용해 쿼리문을 만들어 users 테이블에서 id 필드값이 일치하는 것을 찾는다.
     *  필드값이 일치하는 문서를 가져와 유저의 대표이미지를 불러온다.
     */
    useEffect(() => {
        const image = sessionStorage.getItem("user_image");
        if (image) {
            setUserImage(image);
        } else {
            const q = query(collection(db, "users"), where("id", "==", id));
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    sessionStorage.setItem("user_image", doc.data().image);
                    setUserImage(doc.data().image);
                });
            });
        }
    }, []);

    /** 왼쪽 사진 클릭시 내 피드로 넘어가기 */
    const onClickMyFeed = () => {
        navigate("/myFeed");
    }

    /** 오른쪽 플러스 아이콘 클릭시 피드 올리는 페이지로 이동하기 */
    const onClickCreateFeed = () => {
        navigate("/createFeed");
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
                <IconButton onClick={onClickCreateFeed} style={{ padding: 0 }}>
                    <AddCircleIcon fontSize="large" color="primary" />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default Header;