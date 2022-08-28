import { useQuery } from 'react-query';

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

import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../Env/Firebase";

const fetchMyFeeds = async () => {
    let feeds = [];
    const q = query(collection(db, "feeds"), where("id", "==", sessionStorage.getItem("user_id")));
    await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            feeds.push(doc.data());
        });
    })
    return feeds;
}

const MyFeedMain = () => {
    const { isLoading, data } = useQuery(["user_feeds"], fetchMyFeeds, {refetchOnWindowFocus: false});

    if (isLoading) return <div>wait..</div>

    return (
        <Grid container spacing={3} style={{ alignItems: "center", width: "80%", margin: "auto", marginTop: 50 }}>
            {data.map((item, idx) => {
                return(
                    <Grid key={idx} item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                    <Avatar src={item.user_image} />
                                }
                                action={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={item.name}
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
            })}
        </Grid>
    )
}

export default MyFeedMain;