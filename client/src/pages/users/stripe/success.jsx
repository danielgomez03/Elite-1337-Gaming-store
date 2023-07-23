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
    <div className="flex flex-col items-center justify-center min-h-screen">
      {router.query.success === "true" && (
        <h2 className="text-3xl font-bold mb-4 text-green-500">
          ¡Compra exitosa!
        </h2>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={handleGoBack}
      >
        Volver
      </button>
    </div>
  );
};

export default Success;