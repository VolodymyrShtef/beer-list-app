import React from "react";
import { Container } from "react-bootstrap";

export default function Modal({ beerShow, onCloseModal }) {
  return (
    <div className="Overlay">
      <div className="Modal" onClick={onCloseModal}>
        <Container fluid className="flex_container">
          <div className="image_wrapper">
            <img src={beerShow.image_url} alt={"current_beer"} />
          </div>
          <Container>
            <h1 className="modal_title">{beerShow.name}</h1>
            <br />
            <Container className="modal_description">
              <h2>Description:</h2>
              <p>{beerShow.description}</p>
              <br />
              <h4>Tagline:</h4>
              <p>{beerShow.tagline}</p>
              <br />
              <h4>Brewers Tips:</h4>
              <p>{beerShow.brewers_tips}</p>
            </Container>
          </Container>
        </Container>
      </div>
    </div>
  );
}
