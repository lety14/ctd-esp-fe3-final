import type { NextPage } from "next";
import Head from "next/head";
import CardComponent from "dh-marvel/components/card/card.component";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import PaginationComponent from "dh-marvel/components/pagination/pagination.component";
import { useEffect, useState } from "react";
import { IComicResponse } from "types/IComic.type";
import { getComicsByPage } from "dh-marvel/services/comic/comic.service";
import { useRouter } from "next/router";
import { getComics } from "dh-marvel/services/marvel/marvel.service";

interface Props {
  comics: IComicResponse;
}

const QTY_OF_CARDS = 12;

const Index: NextPage<Props> = ({ comics }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [comicsData, setComicsData] = useState<IComicResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentPage !== null) {
      router.push(`/?page=${currentPage}`, undefined, { shallow: true });

      getComicsByPage(QTY_OF_CARDS, currentPage).then(
        (data: IComicResponse) => {
          if (data.code === 200) {
            setComicsData(data);

            setLoading(false);
          }
        }
      );
    }
  }, [currentPage]);

  const pagesQty: number =
    comics?.data?.total !== undefined ? Math.ceil(comics.data.total / 12) : 1;

  const renderResults = () =>
    (comicsData === undefined
      ? comics.data?.results
      : comicsData.data?.results
    )?.map((comic) => {
      return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={comic.id}>
          <CardComponent comic={comic} />
        </Grid>
      );
    });

  return (
    <>
      <Head>
        <title>DH MARVEL</title>
        <meta name="description" content="Sitio DH MARVEL" />
      </Head>
      <Box component="section" maxWidth="xl">
        <Grid
          container
          alignItems="stretch"
          rowSpacing={{ xs: 3, sm: 2, md: 4 }}
          columnSpacing={{ sm: 2, md: 4 }}
        >
          {renderResults()}
        </Grid>
        <PaginationComponent
          pagesQty={pagesQty}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  const comics = await getComics(0, QTY_OF_CARDS);
  return { props: { comics } };
}

export default Index;
