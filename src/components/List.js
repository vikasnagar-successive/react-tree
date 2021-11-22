import ListItem from "./ListItem";

const List = ({ list, onDelete, parent }) => {
  console.log("🚀 ~ file: List.js ~ line 6 ~ List ~ list", list);

  const listLength = list.length;
  if (listLength) {
    return (
      <>
        {list.map((e) => (
          <ul type="none" key={e.id}>
            <ListItem item={e} onDelete={onDelete} parent={parent} />
          </ul>
        ))}
      </>
    );
  }
  return null;
};

export default List;
