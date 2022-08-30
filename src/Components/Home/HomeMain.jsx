import { useEffect } from "react";

import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Env/Firebase";
import { useAllFeedStore } from "../../Env/store";
import Loader from "../../Env/Loader";

const HomeMain = () => {
    const allFeed = useAllFeedStore((state) => state.allFeed);
    const setAllFeed = useAllFeedStore((state) => state.setAllFeed);

    useEffect(() => {
        let arr = [];
        getDocs(collection(db, "feeds")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
        }).then(() => {
            setAllFeed(arr);
        });
    }, []);

    if (!allFeed) return <Loader />;

    return (
        <Grid container spacing={2} style={{ alignItems: "center", width: "50%", margin: "auto", marginTop: 50 }}>
            {allFeed && allFeed.map((item, idx) => {
                return (
                    <Grid key={idx} item xs={12}>
                        <Card sx={{ width: "100%", margin: "auto" }}>
                            <CardHeader
                                avatar={
                                    <Avatar src={item.user_image} />
                                }
                                title={item.name}
                                subheader={item.time_stamp.toDate().toDateString()}
                            />
                            <CardMedia
                                component="img"
                                height="500"
                                image={item.image}
                                alt={item.name}
                                style={{ width: "100%" }}
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
            })}
        </Grid>
    )
}

export default HomeMain;