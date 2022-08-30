import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, TextField, Button } from "@mui/material";

import { addDoc, collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Swal from 'sweetalert2';

import CreateFeedHeader from "./CreateFeedHeader";
import Loader from "../../Env/Loader";
import { db, storage } from "../../Env/Firebase";
import { useHomeStore } from "../../Env/store";

const CreateFeed = () => {
    const { userInfo } = useHomeStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState();
    const [image, setImage] = useState("")
    const [content, setContent] = useState("");

    const onChangeImage = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = (e) => {
            setFile(file);
            setImage(reader.result);
        }

        if (file) reader.readAsDataURL(file);
    }

    const onChange = (event) => {
        const { target: { id, value } } = event;
        if (id === "content") {
            setContent(value);
        }
    }

    const onClickComplete = () => {
        setIsLoading(true);
        const storageRef = ref(storage, `/user_feeds/${file.name}`);
        uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then((url) => {
                addDoc(collection(db, "feeds"), {
                    id: sessionStorage.getItem("user_id"),
                    name: userInfo.name,
                    image: url,
                    content: content,
                    time_stamp: serverTimestamp(),
                    user_image: userInfo.image
                });
                const q = query(collection(db, "users"), where("id", "==", sessionStorage.getItem("user_id")));
                getDocs(q).then(querySnapshot => {
                    querySnapshot.forEach((document) => {
                        const userRef = doc(db, "users", document.id);
                        updateDoc(userRef, {
                            count_feed: document.data().count_feed + 1
                        });
                        sessionStorage.setItem("user_count_feed", document.data().count_feed + 1);
                        setIsLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: '업로드 완료',
                            html: '업로드가 정상적으로 완료되었습니다.',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        }).then(() => {
                            navigate("/home");
                        });
                    });
                });
            });
        });
    }

    if (isLoading) return <Loader />

    return (
        <>
            <CreateFeedHeader />
            <Grid container style={{ alignItems: "center", textAlign: "center", width: "50%", margin: "auto", marginTop: 70, height: "auto" }}>
                <Grid item xs={12}>
                    {image ? <img src={image} style={{ width: "50%", height: 300 }} />
                        :
                        <img src="/img/default.png" style={{ width: "50%", height: 300 }} />
                    }
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="file"
                        id="contained-button-file"
                        style={{ display: 'none' }}
                        onChange={onChangeImage}
                    />
                    <label htmlFor="contained-button-file">
                        <Button color="primary" component="span">
                            사진 업로드
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <TextField
                        id="content"
                        label="Content"
                        multiline
                        rows={5}
                        sx={{
                            "& .MuiInputLabel-root": { color: 'black' },
                            "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "black" } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { borderColor: "black" } },
                            "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "black" } },
                            width: "50%"
                        }}
                        value={content}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 30 }}>
                    <Button variant="contained" onClick={onClickComplete} style={{ width: "50%", backgroundColor: "black", color: "white" }}>
                        완료
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default CreateFeed;