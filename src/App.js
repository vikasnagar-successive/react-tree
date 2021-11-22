import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import Header from "./components/Header";
import Modal from "./components/modal";
import TreeList from "./components/TreeList";

function App() {
  // const [toggleKey, setToggleKey] = useState("");
  const [dataList, setData] = useState([]);
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setData(data);
      const newParents = [];
      data.forEach((e) => {
        newParents.push(e);
      });
      setParents(newParents);
    };

    getData();
  }, []);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const fetchData = async () => {
    const res = await fetch(`http://localhost:5000/list`);
    const data = await res.json();
    // console.log(data);
    return data;
  };

  const addNewkey = async (obj) => {
    const itemId = new Date();
    let createObj = {
      id: itemId,
      name: obj.text,
      childs: [],
    };

    if (obj.heirarchy === "parent") {
      await fetch(`http://localhost:5000/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createObj),
      });
    } else {
      const newData = dataList.filter(
        (e) => String(obj.parent) === String(e.id)
      )[0];

      newData.childs.push(createObj);
      await fetch(`http://localhost:5000/list/${obj.parent}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
    }

    const data = await fetchData();
    setData(data);
    const newParents = [];
    data.forEach((e) => {
      newParents.push(e);
    });
    setParents(newParents);
  };

  const onDelete = async (obj) => {
    // console.log(obj);
    // console.log(dataList);
    const data1 = dataList.filter((e) => String(e.id) === String(obj.delKey));
    if (data1.length) {
      // await fetch(`http://localhost:5000/list/${obj.delKey}`, {
      //   method: "DELETE",
      // });
      alert(`Contains multiple child`);
    } else {
      const data2 = dataList.map((e) => {
        return e.childs.filter((c) => String(c.id) === String(obj.delKey));
      });
      console.log("🚀 ~ file: App.js ~ line 86 ~ onDelete ~ data2", data2);
      // await fetch(`http://localhost:5000/list`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(createObj),
      // });
    }

    const data = await fetchData();
    setData(data);
    const newParents = [];
    data.forEach((e) => {
      newParents.push(e);
    });
    setParents(newParents);
    // openModal();
  };

  return (
    <div className="App">
      <Header />
      <AddItem parents={parents} onAdd={addNewkey} />
      <TreeList data={dataList} onDelete={onDelete} />
      {showModal ? (
        <Modal className="modal" show={showModal} close={openModal} />
      ) : null}
    </div>
  );
}

export default App;
