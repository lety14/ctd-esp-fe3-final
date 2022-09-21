import React, { FC, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Skeleton } from "@mui/material";
import { IComic, IComicResponse } from "types/IComic.type";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getComicsById } from "dh-marvel/services/comic/comic.service";

interface Props {
  comic: IComic;
}

const CardComponent: FC<Props> = ({ comic }) => {
  const router = useRouter();

  const handleBuy = async (id: number) => {
    const response: IComic = await getComicsById(id);

    if (response.stock > 0) {
      router.push({
        pathname: "/checkout",
        query: { comic: comic.id },
      });
    } else {
      router.push(`/comics/${id}`);
    }
  };

  return (
    <Card variant="outlined">
      <Box>
        <CardMedia
          component="img"
          height="350"
          image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {comic.title}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <NextLink href={`/comics/${comic.id}`}>
          <Button variant="seeMore">Ver detalles</Button>
        </NextLink>
        {/* <NextLink href={`/checkout`}> */}
        <Button variant="buyCard" onClick={() => handleBuy(comic.id)}>
          COMPRAR
        </Button>
        {/* </NextLink> */}
      </CardActions>
    </Card>
  );
};

export default CardComponent;
