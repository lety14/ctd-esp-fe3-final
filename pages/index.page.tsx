import type { NextPage } from "next";
import Head from "next/head";
import { Stack } from "@mui/material";
import PaginationComponent from "dh-marvel/components/pagination/pagination.component";
import { useEffect, useState } from "react";
import { IComicResponse } from "types/IComic.type";
import { getComicsByPage } from "dh-marvel/services/comic/comic.service";
import { useRouter } from "next/router";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import GridLayout from "dh-marvel/components/grid-layout/grid-layoout.component";

interface Props {
  comics: IComicResponse;
}

const QTY_OF_CARDS = 12;

const Index: NextPage<Props> = ({ comics }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [comicsData, setComicsData] = useState<IComicResponse>();

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (currentPage !== null) {
      router.push(`/?page=${currentPage}`, undefined, { shallow: true });

      getComicsByPage(QTY_OF_CARDS, currentPage).then(
        (data: IComicResponse) => {
          if (data.code === 200) {
            setComicsData(data);
          }
        }
      );
    }
  }, [currentPage]);

  const pagesQty: number =
    comics?.data?.total !== undefined ? Math.ceil(comics.data.total / 12) : 1;

  return (
    <>
      <Head>
        <title>DH MARVEL</title>
        <meta name="description" content="Sitio DH MARVEL" />
      </Head>
      <Stack
        component="section"
        maxWidth="xl"
        direction="column"
        spacing={10}
        alignItems="center"
        paddingY={15}
        paddingX={{ xs: 3, sm: 4, md: 4 }}
      >
        <GridLayout
          comics={
            comicsData === undefined
              ? comics.data?.results
              : comicsData.data?.results
          }
        />
        <PaginationComponent
          pagesQty={pagesQty}
          setCurrentPage={setCurrentPage}
        />
      </Stack>
    </>
  );
};

export async function getServerSideProps() {
  const comics = await getComics(0, QTY_OF_CARDS);
  return { props: { comics } };
}

export default Index;
