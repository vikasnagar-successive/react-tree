import ListItem from "./ListItem";

const NewList = ({ list, onDelete, parent }) => {
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

export default NewList;
