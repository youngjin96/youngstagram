import { useEffect, useState } from "react";

import { getDocs, query, collection, where } from "firebase/firestore";

import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { db } from "../../Env/Firebase";

import Loader from "../../Env/Loader";

const MyFeedMain = () => {
    const id = sessionStorage.getItem("user_id");
    const [isLoading, setIsLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        let feedsArr = [];
        const q = query(collection(db, "feeds"), where("id", "==", id));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                feedsArr.push(doc.data());
            });
        }).then(() => {
            setFeeds(feedsArr);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <Loader />

    return (
        <Grid container spacing={3} style={{ alignItems: "center", width: "80%", margin: "auto", marginTop: 50 }}>
            {feeds ? feeds.map((item, idx) => {
                return(
                    <Grid key={idx} item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                    <Avatar src={sessionStorage.getItem("user_image")} />
                                }
                                action={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={sessionStorage.getItem("user_name")}
                                subheader={item.time_stamp.toDate().toDateString()}
                            />
                            <CardMedia
                                component="img"
                                height="300"
                                image={item.image}
                                alt={item.name}
                                style={{width: "100%"}}
                            />
                            <CardContent>
                                {item.content}
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }) : <div>게시물 없음</div>}
        </Grid>
    )
}

export default MyFeedMain;