import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';

import Swal from 'sweetalert2';

import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../Env/Firebase";
import Loader from "../Env/Loader";

const SignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        const { target: { id, value } } = event;
        if (id === "name") {
            setName(value);
        } else if (id === "email") {
            setEmail(value)
        } else if (id === "password") {
            setPassword(value)
        }
    }

    const onClickSignUp = () => {
        if (!name || !email || !password) {
            Swal.fire({
                icon: 'error',
                title: '회원가입 실패',
                html: "모두 작성해주세요.",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        } else {
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
                try {
                    await addDoc(collection(db, "users"), {
                        id: res._tokenResponse.localId,
                        email: email,
                        name: name,
                        image: ""
                    }).then(() => {
                        setIsLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: '회원가입 완료',
                            html: '회원가입이 정상적으로 완료되었습니다.',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        }).then(() => {
                            sessionStorage.setItem("uid", res._tokenResponse.localId);
                            navigate("/home");
                        });
                    });
                } catch (e) {
                    setIsLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: '회원가입 실패',
                        html: "다시 시도해주세요.",
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                }
            }).catch(() => {
                setIsLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: '회원가입 실패',
                    html: "다시 시도해주세요.",
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            });
        }
    }

    if (isLoading) return <Loader />

    return (
        <Box
            style={{
                width: 350,
                height: "100vh",
                alignItems: "center",
                display: "flex",
                textAlign: "center",
                margin: "auto"
            }}
        >
            <Grid container>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <InstagramIcon fontSize="large" style={{ color: "black" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{ color: "black" }}>
                            Youngstagram
                    </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 10 }}>
                        <Typography variant="subtitle1" style={{ color: "grey" }}>
                            가입하고 우리만의 추억을 공유해봐요.
                    </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 50 }}>
                    <TextField
                        id="name"
                        label="Name"
                        value={name}
                        variant="outlined"
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
                <Grid item xs={12} style={{ marginTop: 10 }}>
                    <TextField
                        id="email"
                        label="Email"
                        value={email}
                        variant="outlined"
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
                <Grid item xs={12} style={{ marginTop: 10 }}>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        variant="outlined"
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
                <Grid item xs={12} style={{ marginTop: 40 }}>
                    <Button
                        variant="contained"
                        style={{ width: 250, color: "white", height: 40 }}
                        onClick={onClickSignUp}
                    >
                        <Typography variant="subtitle1">
                            가입
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <Typography variant="subtitle2">
                        계정이 있으신가요? <a href="/" style={{ color: "#4e4dec", textDecoration: "none" }}>로그인</a>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SignUp;