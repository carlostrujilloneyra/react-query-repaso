import { useQuery } from "@tanstack/react-query";
import { Product } from "./types";
import { ProductCard } from "./components/ProductCard";
import { useState } from "react";

interface Info{
  queryKey: (number | string) [];
}

export const App = () => {

  const [page, setPage] = useState<number>(1);
  const [disabledButton, setDisabledButton] = useState(false);

  const getDataFromAPI = async({queryKey}: Info) => {
    const url = `https://peticiones.online/api/products?page=${queryKey[1]}`;
    const rpta = await fetch(url);
    return rpta.json();
	};
	
  const { data, status, isLoading, error } = useQuery(['products', page], getDataFromAPI);

  const handleNextPage = () => {
    setPage(page + 1);

    if (page >= 1) {
      setDisabledButton(true);
    }
  }

  return (
    <>
      <h1>Lista de productos:</h1>
      <button>Anterior</button>
      <button
        onClick={handleNextPage}
        disabled = {disabledButton}
      >Siguiente</button>

      {status === "loading" ? (
        <h2>Cargando datos...</h2>
      ) : (
        <div className="container-users">
          {data.results.map((product: Product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </div>
      )}
    </>
  );
};
