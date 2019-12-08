import React, { useEffect, useState } from "react";
import CardMedia from "../CardMedia/CardMedia";
import Spotify from "../Spotify/Spotify";

const Categories = props => {
  const [getCategories, setCategories] = useState([]);

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
      url={`/categories/${category.id}`}
      image={category.image}
      title={category.name}
    />
  ));

  return <div className="card-grid-container">{categoryCards}</div>;
};

export default Categories;
