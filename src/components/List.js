import ListItem from "./ListItem";

const List = ({ list, onDelete, parent, level }) => {
  const listLength = list.length;
  if (listLength) {
    return (
      <>
        {list.map((e) => (
          <ul type="none" key={e.id}>
            <ListItem
              item={e}
              onDelete={onDelete}
              parent={parent}
              level={level ? level : 0}
            />
          </ul>
        ))}
      </>
    );
  }
  return null;
};

export default List;
