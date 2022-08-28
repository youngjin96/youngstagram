import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";

import { storage, db } from "../../Env/Firebase";
import Loader from "../../Env/Loader";
import Header from "../Home/HomeHeader";

const MyProfileEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = sessionStorage.getItem("user_id");
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState();
    const [name, setName] = useState(location.state.name);
    const [introduce, setIntroduce] = useState(location.state.introduce);
    const [userImage, setUserImage] = useState(location.state.userImage);

    const onChange = (event) => {
        const { target: { id, value } } = event;
        if (id === "name") {
            setName(value);
        } else if (id === "introduce") {
            setIntroduce(value);
        }
    }

    /** 프로필 사진 변경 누를 시 유저는 원하는 사진을 고른다.
     *  사진을 고르면 로딩 화면이 뜨고 Firebase Storage에 사진 저장
     *  사진 저장된 url을 가져와서 로딩 화면 끄고 유저에게 바뀐 사진 먼저 보여준다.
     *  그 후 users 테이블에 image 필드값 업데이트
     */
    const onChangeImage = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = (e) => {
            setFile(file);
            setUserImage(reader.result);
        }

        if (file) reader.readAsDataURL(file);

        const storageRef = ref(storage, `/user_image/${e.target.files[0].name}`);
        uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then((url) => {
                const q = query(collection(db, "users"), where("id", "==", id));
                getDocs(q).then(querySnapshot => {
                    querySnapshot.forEach((document) => {
                        const userRef = doc(db, "users", document.id);
                        updateDoc(userRef, {
                            image: url
                        });
                        sessionStorage.setItem("user_image", url);
                    });
                });
            });
        });
    }

    /** 완료 버튼 누를 시 유저가 입력한 이름과 소개를 users 테이블에 업데이트 */
    const onClickComplete = async () => {
        await updateDoc(doc(db, "users", sessionStorage.getItem("user_id")), {
            name: name,
            introduce: introduce
        });
        navigate("/myFeed");
    }

    if (isLoading) return <Loader />

    return (
        <>
            <Header />
            <Box
                style={{
                    width: 350,
                    height: "90vh",
                    alignItems: "center",
                    display: "flex",
                    textAlign: "center",
                    margin: "auto"
                }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <img src={userImage} style={{ width: "75%", height: 250, borderRadius: "50%" }} />
                        <Typography variant="subtitle1">
                            <input
                                type="file"
                                id="contained-button-file"
                                style={{ display: 'none' }}
                                onChange={onChangeImage}
                            />
                        </Typography>
                        <label htmlFor="contained-button-file">
                            <Button color="primary" component="span">
                                프로필 사진 변경
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 50 }}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={name}
                            sx={{
                                "& .MuiInputLabel-root": { color: 'black' },
                                "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "black" } },
                                "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { borderColor: "black" } },
                                "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "black" } },
                                width: 250
                            }}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 20 }}>
                        <TextField
                            id="introduce"
                            label="Introduce"
                            multiline
                            rows={4}
                            sx={{
                                "& .MuiInputLabel-root": { color: 'black' },
                                "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "black" } },
                                "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { borderColor: "black" } },
                                "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "black" } },
                                width: 250
                            }}
                            value={introduce}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 40 }}>
                        <Button
                            variant="contained"
                            style={{ width: 250, color: "white", height: 40 }}
                            onClick={onClickComplete}
                        >
                            <Typography variant="subtitle1">
                                완료
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default MyProfileEdit;