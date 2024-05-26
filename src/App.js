import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  Grid,
} from "@mui/material";

function App() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState();

  const schema = {
    collection: "listingsAndReviews",
    database: "sample_airbnb",
    dataSource: "GenesisExotics",
  };

  const getToken = async () => {
    const key = await axios.post(
      "http://localhost:3000/api/atlas-access-token"
    );
    console.log(key);
    setToken(key.data);
  };

  const getAllUsers = async () => {
    const allUsers = await axios.post(
      "http://localhost:3000/fetchAllUsers",{
      token,
      schema}
    );
    setItems(allUsers.data);
  };

  useEffect(() => {
    if (token) {
      getAllUsers();
    } else {
      getToken();
    }
  }, [token]);

  return (
    <div className="App">
      <Grid container spacing={2}>
        {items &&
          items.map((item, index) => (
            <Grid item xs={6} md={4}>
              <Card
                sx={{ margin: "auto", maxWidth: 600, boxShadow: 3 }}
                key={index}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.images.picture_url}
                    alt="Random Unsplash Image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.summary}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default App;
