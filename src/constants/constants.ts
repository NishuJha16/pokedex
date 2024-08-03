import { FC, SVGProps } from "react";
import {
  Normal,
  Fire,
  Water,
  Electric,
  Grass,
  Ice,
  Fighting,
  Poison,
  Ground,
  Flying,
  Psychic,
  Bug,
  Rock,
  Ghost,
  Dragon,
  Dark,
  Steel,
  Fairy,
} from "./images";

export const backgrounds: { [key: string]: string } = {
  normal: "rgb(159, 163, 157)",
  fire: "rgb(255, 153, 0)",
  water: "rgb(20, 168, 255)",
  electric: "rgb(255, 222, 0)",
  grass: "rgb(28, 216, 14)",
  ice: "rgb(46, 228, 198)",
  fighting: "rgb(255, 33, 91)",
  poison: "rgb(241, 73, 255)",
  ground: "rgb(255, 107, 13)",
  flying: "rgb(137, 189, 255)",
  psychic: "rgb(255, 108, 100)",
  bug: "rgb(123, 207, 0)",
  rock: "rgb(216, 188, 90)",
  ghost: "rgb(78, 106, 255)",
  dragon: "rgb(0, 118, 255)",
  dark: "rgb(90, 86, 106)",
  steel: "rgb(35, 161, 189)",
  fairy: "rgb(255, 118, 255)",
};

export const pokeTypes: {
  [key: string]: FC<SVGProps<SVGSVGElement>>;
} = {
  normal: Normal,
  fire: Fire,
  water: Water,
  electric: Electric,
  grass: Grass,
  ice: Ice,
  fighting: Fighting,
  poison: Poison,
  ground: Ground,
  flying: Flying,
  psychic: Psychic,
  bug: Bug,
  rock: Rock,
  ghost: Ghost,
  dragon: Dragon,
  dark: Dark,
  steel: Steel,
  fairy: Fairy,
};
