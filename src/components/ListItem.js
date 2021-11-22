import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ListIcon from "./ListIcon";
import NewList from "./NewList";

const ListItem = ({ item, onDelete, parent }) => {
  const e = item;
  const [toggleList, setToggle] = useState({});
  const [toggleKey, setToggleKey] = useState("");

  const onToggle = async (e) => {
    if (toggleList[e] === true || toggleList[e] === false) {
      toggleList[e] = !toggleList[e];
      setToggle(toggleList);
    } else {
      toggleList[e] = true;
      setToggle(toggleList);
    }

    if (toggleKey === e) {
      setToggleKey(null);
    } else {
      setToggleKey(e);
    }
  };

  const deletekey = async (p, e) => {
    console.log("Parent", p, "\nKey", e);
    // setDeleteToggle(!toggleDelete);
    let delKey = p ? `${p}.${e}` : e;
    console.log("Delete path -->", delKey);
    onDelete({ delKey });
  };

  return (
    <>
      <li value={e.id}>
        {e?.childs?.length ? (
          <ListIcon toggleList={!toggleList[e.id]} onToggle={onToggle} e={e} />
        ) : null}
        {e.name}{" "}
        <FaTrash
          style={{
            cursor: "pointer",
            float: "right",
            marginRight: "40rem",
            fontSize: "0.75rem",
          }}
          onClick={() => {
            const delKey = parent ? parent : "";
            deletekey(delKey, e.name);
          }}
        />
        {toggleList[e.id] ? (
          <NewList
            list={e.childs}
            onDelete={onDelete}
            parent={parent ? `${parent}.${e.id}` : e.id}
          />
        ) : null}
      </li>
    </>
  );
};

export default ListItem;
