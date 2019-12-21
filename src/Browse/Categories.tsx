import React, { useEffect, useState } from "react";
import CardMedia from "../CardMedia/CardMedia";
import Spotify from "../Spotify/Spotify";
import GridCardContainer from "../GridContainer/GridCardContainer";
import { Category } from "../Spotify/interfaces";

const Categories = () => {
  const [getCategories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      let categories = await Spotify.getCategories();
      setCategories(categories.categories.items);
    })();
  }, []);

  const categories = getCategories.map(category => {
    const iconList = category.icons.map(icon => icon.url);
    return {
      image: iconList[0],
      id: category.id,
      name: category.name
    };
  });

  let categoryCards = categories.map(category => (
    <CardMedia
      key={category.id}
      url={{
        pathname: `/categories/${category.id}`,
        state: {
          categoryName: category.name
        }
      }}
      image={category.image}
      title={category.name}
    />
  ));

  return (
    <>
      <h1 style={{ marginLeft: "30px" }}>Genres & Moods</h1>
      <GridCardContainer>{categoryCards}</GridCardContainer>
    </>
  );
};

export default Categories;
