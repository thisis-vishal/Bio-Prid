import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const { show } = item;

  return (
    <Link
      to={`/tv/${show.id}`}
      onClick={console.log("card clicked...")}
      className="bg-black relative transition duration-200 ease-in transform hover:scale-110"
    >
      <div className="h-[20rem] sm:h-[25rem] lg:h-[30rem]">
        <img
          src={
            show.image
              ? show.image.original
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          alt={show.name}
          className="rounded-t-md"
        />
      </div>
      <h1 className="text-center py-2 text-xl text-white">{show.name}</h1>
    </Link>
  );
};

export default Card;