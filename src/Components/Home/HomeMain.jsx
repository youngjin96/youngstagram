import {useState} from "react";
import { useQuery } from "react-query";

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
import { auth, db } from "../../Env/Firebase";

import Loader from "../../Env/Loader";

import { allFeeds } from "./fetchHomeData";

const resource = allFeeds();

// const fetchAllFeeds = async () => {
//     let feeds = [];
//     await getDocs(collection(db, "feeds")).then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             feeds.push(doc.data());
//         });
//     });
//     return feeds;
// }

const HomeMain = () => {
    const [data, setData] = useState(resource.read());
    // const { data } = useQuery(["all_feeds"], fetchAllFeeds, {
    //     refetchOnWindowFocus: false, 
    //     suspense: true
    // });

    return (
        <Grid container spacing={2} style={{ alignItems: "center", width: "50%", margin: "auto", marginTop: 50 }}>
            {data.map((item, idx) => {
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