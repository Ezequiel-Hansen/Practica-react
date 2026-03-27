export const Beer = ({ beerName, beerStyle, price, available ,dollar}) => {
  return (
    <ul>
      <l1>{beerName} - Estilo: {beerStyle} - Precio: ${price*dollar} - Disponibilidad: {available ? "Si" :"No"}</l1>
    </ul>
  );
};