import { beers } from '../assets/array.js';
import { Beer } from './Beer.jsx';
import { useState } from 'react';
import { ChangeDolar } from './ChangeDolar.jsx';
const availableBeer = beers.filter(be => be.available)
const redBeer = beers.filter(be => be.beerStyle === 'Red').length
const ipaBeer = beers.filter(be => be.beerStyle === 'IPA').length
const typeBeer = beers.filter(be => be.beerStyle)
export const BeerList = () => {
  const [dollar, setDollar] = useState(1435);
  return (
    <>
      <h1>Change Dollar</h1>
      <ChangeDolar dollar={dollar} setDollar={setDollar} />
      <h1>Ejercicio 1</h1>
      {beers.map((beer) => {
        return (
          <div key={beer.id}>
            <Beer {...beer} dollar={dollar} />
          </div>
        );
      })}
      <br></br>
      <h1>Ejercicio 2</h1>
      {availableBeer.map((beer) => {
        return (
          <div key={beer.id}>
            <Beer {...beer} dollar={dollar} />
          </div>
        );
      })}
      <br></br>
      <h1>Ejercicio 3</h1>
      <h3>Cantidad de Red Beer:{redBeer}</h3>
      <h3>Cantidad de IPA Beer:{ipaBeer}</h3>
      {beers.map((beer) => {
        return (
          <div key={beer.id}>
            <Beer {...beer} dollar={dollar} />
          </div>
        );
      })}
      <h1>Ejercicio 4</h1>
      {typeBeer.map((beer) => {
        return (
          <div key={beer.id}>
            <Beer {...beer} dollar={dollar} />
          </div>
        );
      })}
    </>
  )
}