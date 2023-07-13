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

  const handleGoBack = () => {
    router.push("http://localhost:3000/");
  };

  return (
    <div>
      {router.query.success === "true" && <h2>¡Compra exitosa!</h2>}
      <button className="flex items-center justify-center rounded-lg bg-blue-500 w-full mt-2 py-1 text-white duration-100 hover:bg-blue-600 text-sm" onClick={handleGoBack}>Volver</button>
    </div>
  );
};

export default Success;