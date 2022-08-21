import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';

import Swal from 'sweetalert2';

import { signInWithEmailAndPassword,  setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../Env/Firebase";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        const { target: { id, value } } = event;
        if (id === "email") {
            setEmail(value)
        } else if (id === "password") {
            setPassword(value)
        }
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClickSignIn();
        }
    }

    const onClickSignIn = () => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password).then((res) => {
                console.log(res);
                sessionStorage.setItem("user_id", res._tokenResponse.localId);
                navigate("/home");
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: '로그인 실패',
                    html: "이메일 혹은 비밀번호를 확인해주세요.",
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            });
        }).catch(r => {
            console.log(r);
        })
    }

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
                    <InstagramIcon fontSize="large" style={{ color: "black" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" style={{ color: "black" }}>
                        Youngstagram
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 50 }}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        sx={{
                            "& .MuiInputLabel-root": { color: 'black' },
                            "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "black" } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { borderColor: "black" } },
                            "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "black" } },
                            width: 250
                        }}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10 }}>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        sx={{
                            "& .MuiInputLabel-root": { color: 'black' },
                            "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "black" } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { borderColor: "black" } },
                            "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "black" } },
                            width: 250
                        }}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 40 }}>
                    <Button
                        variant="contained"
                        style={{ width: 250, color: "white", height: 40 }}
                        onClick={onClickSignIn}
                    >
                        <Typography variant="subtitle1">
                            로그인
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <Typography variant="subtitle2">
                        계정이 없으신가요? <a href="/signup" style={{color: "#4e4dec", textDecoration: "none"}}>가입하기</a>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SignIn;