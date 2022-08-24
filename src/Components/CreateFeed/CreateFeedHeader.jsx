import { Link, useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

const CreateFeedHeader = () => {
    const navigate = useNavigate();

    return (
        <Grid container style={{ alignItems: "center", textAlign: "center", width: "80%", margin: "auto", marginTop: 70, top: 0, position: "sticky" }}>
            <Grid item xs={4}>
                    <IconButton onClick={() => {navigate("/home")}} style={{ padding: 0 }}>
                        <ArrowBackIcon fontSize="large" color="primary"/>
                    </IconButton>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h4">
                    새 게시물
                </Typography>
            </Grid>
            <Grid item xs={4}>
                
            </Grid>
        </Grid>
    )
}

export default CreateFeedHeader;