import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ICharacter, ICharacterResponse } from "types/ICharacter.type";
import { Box } from "@mui/system";
import { Grid, Stack, Typography } from "@mui/material";
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
import { Loader } from "dh-marvel/components/loading/loading.component";
import CardComponent from "dh-marvel/components/card/card.component";
import GridLayout from "dh-marvel/components/grid-layout/grid-layoout.component";

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
  const router = useRouter();

  useEffect(() => {
    const limit = 6;
    if (character) {
      getComicsByCharacterId(character.id, limit).then(
        (data: IComicResponse) => {
          if (data.code === 200) {
            setComics(data.data?.results);
          }
        }
      );
    }
  }, [character]);

  if (router.isFallback) {
    return <Loader />;
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
      <Stack component="section" direction="column" alignItems="center">
        <Stack
          component="section"
          maxWidth="xl"
          direction="column"
          spacing={10}
          alignItems="center"
          paddingY={15}
          paddingX={{ xs: 3, sm: 4, md: 4 }}
        >
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{
              textTransform: "uppercase",
              fontWeight: "700",
              textShadow: "2px 2px 8px #6ae1ff",
            }}
          >
            {character.name}
          </Typography>
          <Box
            component="img"
            alt={character.name}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            sx={{
              maxWidth: 700,
              width: "100%",
              border: "3px solid #000",
              boxShadow: "12px 12px #000",
            }}
          />
          {character.description ? (
            <Typography gutterBottom component="div">
              {character.description}
            </Typography>
          ) : (
            <Typography gutterBottom component="div">
              No tiene descripción disponible.
            </Typography>
          )}
        </Stack>

        <Box
          sx={{
            background: "#f5f5f5",
            width: "100vw",
            padding: "0px",
            marging: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            component="section"
            maxWidth="xl"
            direction="column"
            alignItems="center"
            justifyContent="center"
            paddingY={15}
            paddingX={{ xs: 3, sm: 4, md: 4 }}
          >
            <Typography variant="h4" paddingBottom={10}>
              Otros comics de {character.name}
            </Typography>
            {comics && <GridLayout comics={comics} xl={4} />}
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const data = await getCharacter(id);

  return {
    props: {
      character: data,
    },
    revalidate: 10,
  };
};

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
