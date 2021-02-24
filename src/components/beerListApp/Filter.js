import React from "react";

export default function Filter({ handleInput, value }) {
  return (
    <label className="sorting_tools">
      Filter by Name{" "}
      <input
        className="input_field"
        type="text"
        value={value}
        onChange={handleInput}
        name="filterW"
      />
    </label>
  );
}
