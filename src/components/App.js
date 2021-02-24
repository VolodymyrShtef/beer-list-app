import React, { Component } from "react";

import BeerList from "./beerListApp/BeerList";
import Filter from "./beerListApp/Filter";
import SortingBlock from "./beerListApp/SortingBlock";
import Modal from "./beerListApp/Modal";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

import "../styles.css";
import axios from "axios";

export default class App extends Component {
  state = {
    beers: [],
    filterW: "",
    sortby: "id",
    order: "asc",
    modalShow: false,
    beerShow: {},
  };

  componentDidMount() {
    axios
      .get(`https://api.punkapi.com/v2/beers?per_page=80`)
      .then((response) => this.setState({ beers: response.data }))
      .catch((error) => console.log(error));
  }

  handleFilter = (e) => {
    this.setState({ filterW: e.target.value });
  };

  getFilteredBeers = () => {
    const { beers, filterW } = this.state;
    return beers.filter((beer) =>
      beer.name.toLowerCase().includes(filterW.toLowerCase())
    );
  };

  sortingOrderChange = (name, value) => {
    this.setState({ [name]: value });
  };

  sortBeers = (beers) => {
    if (this.state.beers.length < 1 || beers < 1) return beers;
    const sortingParam = this.state.sortby;

    if (this.state.order === "asc")
      if (typeof beers[0][sortingParam] === "string")
        return beers.sort((a, b) => {
          const nameA = a[sortingParam].toLowerCase();
          const nameB = b[sortingParam].toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      else {
        return beers.sort((a, b) => a[sortingParam] - b[sortingParam]);
      }

    if (typeof beers[0][sortingParam] === "string")
      return beers.sort((a, b) => {
        const nameA = a[sortingParam].toLowerCase();
        const nameB = b[sortingParam].toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    else {
      return beers.sort((a, b) => b[sortingParam] - a[sortingParam]);
    }
  };

  showModale = (beerID) => {
    const beerShow = this.state.beers.find((beer) => beer.id === beerID);
    this.setState({ modalShow: true, beerShow: beerShow });
    window.addEventListener("keydown", this.hideModal);
  };

  hideModal = (e) => {
    if (e.type === "click" || e.code === "Escape") {
      this.setState({ modalShow: false, beerShow: {} });
      window.removeEventListener("keydown", this.hideModal);
    }
  };

  render() {
    const filteredBeers = this.getFilteredBeers();
    const sortedBeers = this.sortBeers(filteredBeers);

    return (
      <>
        <Container className="title_wrapper">
          <h1>Beer List App</h1>
        </Container>

        <Container className="flex_container_spased">
          <Filter handleInput={this.handleFilter} value={this.state.filterW} />
          <SortingBlock onSortingOrderChange={this.sortingOrderChange} />
        </Container>

        <Container className="table_container">
          {this.state.beers && (
            <BeerList beers={sortedBeers} onBeerSelect={this.showModale} />
          )}
        </Container>
        {this.state.modalShow && (
          <Modal beerShow={this.state.beerShow} onCloseModal={this.hideModal} />
        )}
      </>
    );
  }
}
