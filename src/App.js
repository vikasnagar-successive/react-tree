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
      console.log(`*******************************************`);
      const data = await fetchData();
      console.log("🚀 ~ file: App.js ~ line 17 ~ getData ~ data", data);
      setData(data);
      const newParents = [];
      data.forEach((e) => {
        newParents.push(e);
      });
      // console.log("🚀 ~ file: App.js ~ line 22 ~ data.forEach ~ newParents", newParents)
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
      dataList.push(createObj);
    } else {
      dataList[obj.parent].push();
    }

    const res = await fetch(`http://localhost:5000/list`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataList),
    });
    await res.json();
    // setData(resData);

    const data = await fetchData();
    setData(data);
    const newParents = {};
    for (let key in data) {
      newParents[key] = "";
    }
    setParents(newParents);
  };

  const onDelete = async (obj) => {
    console.log(obj.delKey);
    console.log(dataList);
    const accessKey = obj.delKey.split(".");
    const accessLen = accessKey.length;
    console.log("accessKey", accessKey);
    let st = "";
    for (let i = 0; i < accessLen; i++) {
      console.log(i);
      console.log(accessKey[i]);
      st += `[${accessKey[i]}]`;
    }
    console.log([st]);
    console.log([accessKey[0]], [accessKey[1]]);
    console.log(dataList[st]);
    console.log(dataList[accessKey[0]][accessKey[1]]);
    console.log(Object.keys(dataList.accessKey).length);
    // openModal();
    // if (obj.heirarchy === "parent") {
    //   dataList[obj.text] = {};
    // } else {
    //   dataList[obj.parent][obj.text] = {};
    // }

    // const res = await fetch(`http://localhost:5000/list`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(dataList),
    // });
    // await res.json();
    // // setData(resData);

    // const data = await fetchData();
    // setData(data);
    // const newParents = {};
    // for (let key in data) {
    //   newParents[key] = "";
    // }
    // setParents(newParents);
  };

  return (
    <div className="App">
      <Header />
      <AddItem parents={parents} onAdd={addNewkey} />
      <TreeList data={dataList} onDelete={onDelete} />
      {showModal ? (
        <Modal className="modal" show={showModal} close={openModal}></Modal>
      ) : null}
    </div>
  );
}

export default App;
