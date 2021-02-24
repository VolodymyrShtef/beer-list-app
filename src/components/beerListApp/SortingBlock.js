import React from "react";

export default function SortingBlock({ onSortingOrderChange }) {
  const handleChange = (e) => {
    onSortingOrderChange(e.target.name, e.target.value);
  };
  return (
    <>
      <label className="sorting_tools">
        Sort By{" "}
        <select name="sortby" onChange={handleChange}>
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="abv">ABV</option>
        </select>
      </label>

      <label className="sorting_tools">
        Order{" "}
        <select name="order" onChange={handleChange}>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </label>
    </>
  );
}
