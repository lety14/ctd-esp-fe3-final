import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { faqsData } from "constants/faqs/faqsData";
import { Box } from "@mui/material";
import IFaq from "types/IFaq.type";

const endpoint = process.env.LOCAL_API_URL;

interface Props {
  faqs: IFaq[];
}

const Faqs: NextPage<Props> = ({ faqs }) => {
  return (
    <>
      <Head>
        <title>Faqs</title>
        <meta
          name="description"
          content="Preguntas frecuentes del uso del sitio DH MARVEL"
        />
      </Head>
      <Box px={2} sx={{ maxWidth: 1500 }}>
        <BodySingle title={"Preguntas Frecuentes"}></BodySingle>
        {faqs.map((faq) => {
          return (
            <>
              <Accordion key={faq.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${endpoint}faqs`);
  const data: IFaq[] = await response.json();
  return {
    props: {
      faqs: data,
    },
  };
};

export default Faqs;
