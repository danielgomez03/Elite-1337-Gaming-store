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

  const handleGoBack = () => {
    router.push("http://localhost:3000/");
  };

  return (
    <div>
      {router.query.success === "false" && <h2>Error en la compra</h2>}
      <button className="flex items-center justify-center rounded-lg bg-blue-500 w-full mt-2 py-1 text-white duration-100 hover:bg-blue-600 text-sm" onClick={handleGoBack}>Volver</button>
    </div>
  );
};

export default Cancel;
