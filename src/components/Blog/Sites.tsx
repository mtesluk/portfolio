import React from "react";
import axios from "axios";
import { config  } from "../../config";
import { connect } from "react-redux";

interface Country {
  name: string;
  sites: Site[];
}

interface Site {
  name: string,
  x: string,
  y: string,
}

const Sites = (props) => {
  const getSites = () => {
    axios.get(config.endpoints.blog.countries).then(response => {
      // console.log(1)
    }).catch(error => {
      // console.log(1)
    })
    return [{name: 'Mongolia', sites: [{name: 'klucz napoka', x: '12', y: '5'}]}]
  }

  return (
    <div>
      {getSites().map((country: Country, id: number) => <div key={id}>{country.name}</div>)}
    </div>
  );
};

export default connect()(Sites);