import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Env/Firebase";

const SignIn = () => {
    const navigate = useNavigate();
    return (
        <div>signin</div>
    )
}

export default SignIn;