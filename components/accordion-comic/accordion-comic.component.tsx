import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { IComic } from "types/IComic.type";
import NextLink from "next/link";
import AccordionCollapsible from "../accordion-collapsible/accordion-collapsible.component";
import { getIdfromURI } from "../../utils/getIdFromURI";
import { FC } from "react";

interface Props {
  comic: IComic;
}

const AccordionComic: FC<Props> = ({ comic }) => {
  return (
    <Box>
      <AccordionCollapsible title={"Descripción"}>
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
                  href={`/characters/${getIdfromURI(character.resourceURI)}`}
                  key={character.name}
                >
                  <Button fullWidth variant="link" size="small">
                    {character.name}
                  </Button>
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
          {comic.creators.items.length ? (
            comic.creators.items.map((creator) => {
              return (
                <Typography
                  sx={{
                    fontSize: "13px",
                    padding: "4px 5px",
                  }}
                  key={creator.name}
                >
                  {creator.name} - {creator.role}
                </Typography>
              );
            })
          ) : (
            <Typography variant="body2">
              Sin listado de creadores disponible.
            </Typography>
          )}
        </Box>
      </AccordionCollapsible>
    </Box>
  );
};

export default AccordionComic;
