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

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Env/Firebase";

const fetchFeedData = async () => {
    let dataArr = [];
    await getDocs(collection(db, "feeds")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            dataArr.push(doc.data());
        });
    })
    return dataArr;
}

const HomeMain = () => {
    const { data } = useQuery("all_feeds", fetchFeedData, { 
        suspense: true, 
        refetchOnWindowFocus: false, 
    });

    return (
        <Grid container spacing={2} style={{ alignItems: "center", width: "80%", margin: "auto", marginTop: 50 }}>
            {data.map((item, idx) => {
                return (
                    <Grid key={idx} item xs={12}>
                        <Card sx={{ width: "80%", margin: "auto" }}>
                            <CardHeader
                                avatar={
                                    <Avatar src={item.user_image} />
                                }
                                title={item.user_name}
                                subheader={item.time_stamp.toDate().toDateString()}
                            />
                            <CardMedia
                                component="img"
                                height="300"
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