import React from "react";
import Table from "react-bootstrap/Table";

export default function BeerList({ beers, onBeerSelect }) {
  const handleClick = (e) => {
    if (e.target.dataset.id) onBeerSelect(Number(e.target.dataset.id));
  };
  return (
    <Table
      responsive
      striped
      bordered
      hover
      size="sm"
      variant="dark"
      onClick={handleClick}
    >
      <thead>
        <tr>
          <th className="sides_col">ID</th>
          <th>Name</th>
          <th className="sides_col">ABV</th>
        </tr>
      </thead>

      <tbody>
        {beers.map((beer) => (
          <tr key={beer.id}>
            <th className="sides_col" data-id={beer.id}>
              {beer.id}
            </th>
            <th className="center_col" data-id={beer.id}>
              {beer.name}
            </th>
            <th className="sides_col" data-id={beer.id}>
              {beer.abv}
            </th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
