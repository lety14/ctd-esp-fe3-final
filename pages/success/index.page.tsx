import { Button, Stack } from "@mui/material";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { Loader } from "dh-marvel/components/loading/loading.component";
import { useEffect, useState } from "react";
import { ICheckout } from "types/ICheckout.type";
import CardSuccessCheckout from "dh-marvel/components/card-succes-checkout/card-succes-checkout.component";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";

const SuccesCheckout: NextPage = () => {
  const router = useRouter();
  const [dataCheckout, setDataCheckout] = useState<ICheckout>();

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data !== null) {
      const obj = JSON.parse(data);
      setDataCheckout(obj);
    } else {
      router.push("/");
    }
  }, []);

  if (!dataCheckout) {
    return <Loader />;
  }

  return (
    <Stack paddingTop={20} direction="column" alignItems="center">
      <CardSuccessCheckout data={dataCheckout} />
      <NextLink href="/">
        <Button variant="outlined" sx={{ margin: 5 }}>
          Volver a la home
        </Button>
      </NextLink>
    </Stack>
  );
};
(SuccesCheckout as any).Layout = LayoutCheckout;

export default SuccesCheckout;
