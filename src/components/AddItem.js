import { useState } from "react";

const AddItem = ({ parents, onAdd }) => {
  const [text, setText] = useState("");
  const [heirarchy, setHeirarchy] = useState("");
  const [parent, setParent] = useState("");

  const changeHeirarchy = (e) => {
    e.preventDefault();
    const data = e.target.value;
    setHeirarchy(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert(`Please enter item text`);
      return;
    }

    if (!heirarchy) {
      alert(`Please select heirarchy`);
      return;
    }

    if (heirarchy === "child" && !parent) {
      alert(`Please select parent`);
      return;
    }

    onAdd({ text, heirarchy, parent });
    setText("");
    setHeirarchy("");
    setParent("");
  };
  return (
    <div>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Enter Item</label>
          <input
            type="text"
            placeholder="Enter item"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
        </div>
        <div className="form-control">
          <label>Hierarchy</label>
          <select onChange={changeHeirarchy} value={heirarchy}>
            <option value="" defaultValue>
              Select
            </option>
            <option value="parent">Parent</option>
            {Object.keys(parents).length && (
              <option value="child">Child</option>
            )}
          </select>
        </div>
        {parents.length
          ? heirarchy === "child" && (
              <div className="form-control">
                <label>Parent</label>
                <select
                  onChange={(e) => {
                    setParent(e.target.value);
                  }}
                  value={parent}
                >
                  <option value="" defaultValue>
                    Select
                  </option>
                  {parents.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
            )
          : ""}
        <input type="submit" value="Submit" className="btn" />
      </form>
    </div>
  );
};

export default AddItem;
