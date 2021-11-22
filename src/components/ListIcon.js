import React from "react";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

const ListIcon = ({ toggleList, onToggle, e }) => {
  if (toggleList) {
    return (
      <FaPlusSquare
        style={{
          fontSize: "0.75rem",
          paddingRight: "0.25rem",
          cursor: "pointer",
        }}
        onClick={() => onToggle(e.id)}
      />
    );
  } else {
    return (
      <FaMinusSquare
        style={{
          fontSize: "0.75rem",
          paddingRight: "0.25rem",
          cursor: "pointer",
        }}
        onClick={() => onToggle(e.id)}
      />
    );
  }
};

export default ListIcon;
