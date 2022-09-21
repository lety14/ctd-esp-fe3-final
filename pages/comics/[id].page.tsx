import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { IComic, IComicResponse } from "types/IComic.type";
import { useRouter } from "next/router";
import NextLink from "next/link";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import AccordionCollapsible from "dh-marvel/components/accordion-collapsible/accordion-collapsible.component";
import { getIdfromURI } from "../../utils/getIdFromURI";
import { percentageOff } from "../../utils/calcPercentageOff";
const Img = styled("img")({
  margin: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
});

interface Props {
  comic: IComic;
}

const Comic: NextPage<Props> = ({ comic }) => {
  const router = useRouter();

  if (router.isFallback === true) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{comic.title}</title>
        <meta
          name="description"
          content={`Comic de Marvel.${comic.title}.${comic.series}`}
        />
      </Head>
      <Box
        component="section"
        maxWidth="xl"
        sx={{
          padding: "50px 20px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              component={Img}
              alt={comic.title}
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              sx={{
                boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                paddingBottom: "90px",
              }}
            >
              <Typography gutterBottom variant="subtitle1" component="div">
                Serie: {comic.series.name}
              </Typography>
              <Typography gutterBottom variant="h5">
                {comic.title}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                ISBN: {comic.isbn}
              </Typography>
              <Box
                sx={{
                  padding: "30px 0px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  {comic.oldPrice && (
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{
                        textDecoration: "line-through",
                        marginBottom: "5px",
                        paddingRight: "15px",
                      }}
                    >
                      ${comic.oldPrice}
                    </Typography>
                  )}

                  {percentageOff() > 0 && (
                    <Typography variant="h6" color="text.secondary">
                      {percentageOff()}% OFF!
                    </Typography>
                  )}
                </Box>

                <Typography variant="h4">${comic.price}</Typography>
              </Box>

              <NextLink
                href={{ pathname: "/checkout/", query: `comic=${comic.id}` }}
              >
                <Button
                  variant="buyCard"
                  endIcon={<AddShoppingCartOutlinedIcon />}
                >
                  COMPRAR
                </Button>
              </NextLink>
            </Box>

            <Box>
              <AccordionCollapsible title={"Descripcion"}>
                <Typography variant="body2" gutterBottom>
                  {comic.description !== null && comic.description !== ""
                    ? comic.description
                    : "Sin descripción disponible."}
                </Typography>
              </AccordionCollapsible>
              <AccordionCollapsible title={"Personajes"}>
                <Box>
                  {comic.characters.items.length ? (
                    comic.characters.items.map((character) => {
                      return (
                        <NextLink
                          href={`/characters/${getIdfromURI(
                            character.resourceURI
                          )}`}
                          key={character.name}
                        >
                          <Typography
                            variant="body2"
                            sx={{ cursor: "pointer" }}
                          >
                            {character.name}
                          </Typography>
                        </NextLink>
                      );
                    })
                  ) : (
                    <Typography variant="body2">
                      Sin listado de personajes disponible.
                    </Typography>
                  )}
                </Box>
              </AccordionCollapsible>
              <AccordionCollapsible title={"Creadores"}>
                <Box>
                  {comic.creators.items.map((creator) => {
                    return (
                      <Typography variant="body2" key={creator.name}>
                        {creator.name} - {creator.role}
                      </Typography>
                    );
                  })}
                </Box>
              </AccordionCollapsible>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const data = await getComic(id);

  return {
    props: {
      comic: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: IComicResponse = await getComics();

  const paths = data.data.results.map((comic) => {
    return { params: { id: comic.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default Comic;
