import React from "react";
import axios from "axios";
import { config  } from "../../config";

interface Country {
  name: string;
  sites: Site[];
}

interface Site {
  name: string,
  x: string,
  y: string,
}

interface Props {

}

export const Sites = (props: Props) => {

  const getSites = () => {
    axios.get(config.endpoints.blog.countries).then(response => {
      console.log(1)
    }).catch(error => {
      console.log(1)
    })
    return [{name: 'Mongolia', sites: [{name: 'klucz napoka', x: '12', y: '5'}]}]
  }

  return (
    <div>
      {getSites().map((country: Country, id: number) => <div>{country.name}</div>)}
    </div>
  );
};