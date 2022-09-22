import type { NextPage } from "next";
import CardComponent from "dh-marvel/components/card/card.component";
import { Grid } from "@mui/material";
import { IComic } from "types/IComic.type";

interface Props {
  comics: IComic[];
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const GridLayout: NextPage<Props> = ({
  comics,
  xs = 12,
  sm = 12,
  md = 6,
  lg = 4,
  xl = 3,
}) => {
  const renderResults = () =>
    comics?.map((comic) => {
      return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={comic.id}>
          <CardComponent comic={comic} />
        </Grid>
      );
    });

  return (
    <Grid
      container
      alignItems="stretch"
      rowSpacing={{ xs: 3, sm: 2, md: 4 }}
      columnSpacing={{ sm: 2, md: 4 }}
    >
      {renderResults()}
    </Grid>
  );
};

export default GridLayout;
