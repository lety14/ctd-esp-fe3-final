import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ICharacter, ICharacterResponse } from "types/ICharacter.type";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import {
  getCharacter,
  getCharacters,
} from "dh-marvel/services/marvel/marvel.service";
import { IComic, IComicResponse } from "types/IComic.type";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { getComicsByCharacterId } from "dh-marvel/services/comic/comic.service";

const Img = styled("img")({
  margin: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
});

interface Props {
  character: ICharacter;
}

const Character: NextPage<Props> = ({ character }) => {
  const [comics, setComics] = useState<IComic[]>();
  const [isLoadingComics, setLoadingComics] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const limit = 6;
    setLoadingComics(true);

    if (character) {
      getComicsByCharacterId(character.id, limit).then(
        (data: IComicResponse) => {
          if (data.code === 200) {
            setComics(data.data?.results);
            setLoadingComics(false);
          }
        }
      );
    }
  }, [character]);

  if (router.isFallback) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>DH-MARVEL</title>
        <meta
          name="description"
          content={`${character.name}.${character.description}`}
        />
      </Head>
      <Box component="section" maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item>
            <Img
              alt={character.name}
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Typography gutterBottom variant="subtitle1" component="div">
              {character.name}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              {character.description}
            </Typography>
            <Box>
              {isLoadingComics ? (
                <Typography>loading...</Typography>
              ) : (
                comics?.map((comic) => {
                  return (
                    <NextLink href={`/comics/${comic.id}`} key={comic.id}>
                      <Typography>{comic.title}</Typography>
                    </NextLink>
                  );
                })
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

//

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const data = await getCharacter(id);

  return {
    props: {
      character: data,
    },
  };
};

//
export const getStaticPaths: GetStaticPaths = async () => {
  const data: ICharacterResponse = await getCharacters();

  const paths = data.data.results.map((character) => {
    return { params: { id: character.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default Character;
