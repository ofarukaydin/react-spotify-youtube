import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid} from '@material-ui/core';
import MediaCard from "../components/MediaCard"
import Spotify from "../Spotify/Spotify"





const Categories = (props) => {

    const [getCategories, setCategories] = useState([])

  useEffect(() => {
    (async () => {
      let categories = await Spotify.getCategories();
      setCategories(categories.categories.items)
    })();

  }, []);

 const categories = getCategories.map((category) => {
    const iconList = category.icons.map((icon) => icon.url)
    return {
        image: iconList[0],
        id: category.id,
        name: category.name
    }
 })

let categoryCards = categories.map((category) => (

    <Grid item xs={2} wrap="nowrap">
      <MediaCard
        key={category.id}
        link={`/categories/${category.id}`}
        img={category.image}
        content={category.name}
      />
      </Grid>
))


  return (

    <Grid container
      direction="row"
      justify="flex-start"
      alignItems="center"
     spacing={16} style={{marginBottom: "90px", width: '100%' }}>

    {categoryCards}
    </Grid>

  );
};

export default Categories;
