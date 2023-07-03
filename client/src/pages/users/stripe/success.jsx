import { useEffect } from "react";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const { success } = router.query;
    if (success === "true") {
      // La compra fue exitosa, puedes realizar las acciones necesarias aquí
      console.log("Payment successful!");
    }
  }, [router.query]);

  return (
    <div>
      {router.query.success === "true" && <h2>¡Compra exitosa!</h2>}
    </div>
  );
};

export default Success;


