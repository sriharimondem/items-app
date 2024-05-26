import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, CardActionArea, Grid } from '@mui/material';

function App() {
  const [items, setItems] = useState([]);
  const schema = {collection: "listingsAndReviews",
  database: "sample_airbnb",
  dataSource: "GenesisExotics",}
  const fetchItems = async () => {
    try {
      let response = await axios.post(
        "https://us-east-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-aycdnfw/auth/providers/local-userpass/login",
        {
          username: "srihari.mondem@gmail.com",
          password: "mondem",
        }
      );
      let data = JSON.stringify(response);
      if (data) {
        let token = JSON.parse(data).data.access_token;
        await axios.post(
          "https://us-east-1.aws.data.mongodb-api.com/app/data-aycdnfw/endpoint/data/v1/action/find", schema,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
          }
          }
        ).then(response => {
          console.log(response.data);
          setItems(response.data.documents);
      })
      .catch(error => {
          console.error(error);
      });;
      }
      
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <Grid container spacing={2}>
      {items && items.map((item, index) => 
      <Grid item xs={6} md={4}>
      <Card sx={{ margin: 'auto', maxWidth: 600, boxShadow: 3 }} key={index}>
      <CardActionArea >
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
    )}

      </Grid>
      
    </div>
  );
}

export default App;
