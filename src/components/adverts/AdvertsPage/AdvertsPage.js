import { useEffect, useState, useRef, useContext, Fragment } from "react";
import Layout from "../../layout/Layout";
import { getAdverts } from "../service";
import AuthContext from "../../auth/context";
import { Link } from "react-router-dom";
import types, { func } from "prop-types";
import FilterArea from "./FilterArea";

//TODO: loader y gestor de errores al hacer llamada al api
//TODO: Falta implementar los filtros 'name' (regex) y price
//TODO: Falta crear componente Empty (se renderiza cuando (a) no hay anuncios del todo o (b) los filtros no corresponden a ningun artículo)
//el componente Empty debe ten un botón que redirija a 'crear anuncio'
//TODO: DUDA: ¿el filtro de tags debe filtrar por tags individuales y no sólo por todas las que tiene el anuncio?
//TODO: mi filtro no cumple con el requisito de hacer una única petición, intentar arreglar esto

export default function AdvertsPage({ ...props }) {
  function Empty(props) {
    return "Empty";
    //TODO: call to action para crear el primer anuncio
  }

  const [adverts, setAdverts] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    price: "",
    //price: "",
    sale: "",
    tags: [""],
  });

  useEffect(() => {
    getAdverts()
      //una opción: filtrar aquí con filter y renderizar cada vez que cambien los filtros (y arreglar loop de abajo)
      .then((adverts) => {
        setAdverts(adverts);

        console.log(adverts, adverts.length);
        /*         if (filters.name)
        console.log('name')
          setAdverts((adverts) =>
            adverts.filter((advert) => advert.name === filters.name)
          ); */
        if (filters.sale !== "") {
          console.log("sale");
          setAdverts((adverts) =>
            adverts.filter((advert) => advert.sale === filters.sale)
          );
        }

        if (JSON.stringify(filters.tags) !== '[""]') {
          console.log("tags", filters.tags);
          setAdverts((adverts) =>
            adverts.filter(
              (advert) =>
                JSON.stringify(advert.tags) === JSON.stringify(filters.tags)
            )
          );
        }
      })
      .catch((error) => console.log(error));
  }, [filters]);

  /*   useEffect(
    () => {
       setAdverts(filteredAdverts);  
      //otra opción: aprender el useEffect y devolver una función que me devuelva al estado sin filtros
      //return () => setFilters(() => filters.sale = prevState);
      return () => setAdverts()
      
    },
    [filters.sale]
  ); */

  return (
    <>
      <FilterArea
        /*  adverts={adverts}
        setAdverts={setAdverts} */
        filters={filters}
        setFilters={setFilters}
      />
      <Layout {...props}>
        <div className="">
          {adverts.length ? (
            <ul>
              {adverts
                /*                 .filter(
                  (advert) =>
                    advert.sale === filters.sale && advert.tags === filters.tags
                ) */
                .map((advert) => (
                  <li
                    key={
                      advert.id
                    } /* onClick={() => history.push(`/adverts/${id}`)} */
                  >
                    <Link to={`/adverts/${advert.id}`}>
                      <div className="item-card">
                        <h2>{advert.name}</h2>
                        <p>{advert.price}</p>
                        <p>{advert.sale ? "Venta" : "Compra"}</p>
                        <p>{advert.tags.join(" ")}</p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <Empty />
          )}
        </div>
      </Layout>
    </>
  );
}

AdvertsPage.propTypes = {};

//export default AdvertsPage;
