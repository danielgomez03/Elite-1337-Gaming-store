import { useEffect } from "react";
import { useRouter } from "next/router";

const Cancel = () => {
  const router = useRouter();

  useEffect(() => {
    const { success } = router.query;
    if (success === "false") {
      // La compra no fue exitosa, puedes realizar las acciones necesarias aquí
      console.log("Payment failed!");
    }
  }, [router.query]);

  return (
    <div>
      {router.query.success === "false" && <h2>Error en la compra</h2>}
    </div>
  );
};

export default Cancel;
