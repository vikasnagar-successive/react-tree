import List from "./List";

const TreeList = ({ data, onDelete }) => {
  return (
    <div className="list">
      {data.length ? <List list={data} onDelete={onDelete} /> : "No List"}
    </div>
  );
};

export default TreeList;
