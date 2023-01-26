import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTutorial,
  retrieveTutorial,
  findTutorialByTitle,
} from "../slices/tutorials";
import Tutorial_component from "./Tutorial.component";

const Tutorial_list_component = () => {
  const dispatch = useDispatch();
  const [tutorialList, setTutorialList] = useState([]);
  const [printTutorial, setPrintTutorial] = useState([]);
  const [updateTutorialState, setUpdateTutorialState] = useState({
    id: 0,
    Title: "",
    Description: "",
  });
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const data = useSelector((state) => state.tutorials);

  useEffect(() => {
    dispatch(retrieveTutorial());
  }, []);

  useEffect(() => {
    setTutorialList(data);
  }, [data]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tutorialDetail = (id) => {
    const filteredData = tutorialList.filter((obj) => obj.id === id);
    setPrintTutorial(filteredData);
  };

  const deleteHandler = (id) => {
    dispatch(deleteTutorial(id));
    setPrintTutorial([]);
  };

  const updateHandler = (id) => {
    const filterTutorial = tutorialList.filter((obj) => obj.id === id);
    setUpdateTutorialState(filterTutorial[0]);
    handleShow();
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchBtnClick = () => {
    dispatch(findTutorialByTitle({ title: searchValue }));
  };

  return (
    <div>
      <div className="mb-3 d-flex" style={{ width: "50%" }}>
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          onChange={searchHandler}
          value={searchValue}
          id="exampleInputEmail1"
        />
        <button
          type="submit"
          onClick={searchBtnClick}
          className="btn btn-primary"
        >
          Search
        </button>
      </div>
      <div className="mb-3 d-flex">
        <div>
          <h3>Tutorial List</h3>
          <div>
            <ul className="list-group">
              {tutorialList.map((ele, i) => {
                return (
                  <div key={i}>
                    <li
                      style={{ cursor: "pointer" }}
                      className="list-group-item"
                      onClick={() => tutorialDetail(ele.id)}
                    >
                      {ele.Title}
                    </li>
                  </div>
                );
              })}
            </ul>
            {/* <button
              type="submit"
              style={{ marginTop: "9%" }}
              // onClick={saveTutorial}
              className="btn btn-danger"
            >
              Remove All
            </button> */}
          </div>
        </div>
        <div style={{ marginLeft: "4%" }}>
          <h3>Tutorial</h3>
          <div>
            {printTutorial.map((ele, i) => {
              return (
                <div key={i}>
                  <span>
                    <strong>Title</strong> : {ele.Title}
                  </span>
                  <div>
                    <strong>Description</strong> : {ele.Description}
                  </div>
                  <div>
                    <strong>Status</strong> : pending...
                  </div>
                  <button
                    type="submit"
                    style={{ marginTop: "9%" }}
                    onClick={() => deleteHandler(ele.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    style={{ marginTop: "9%", marginLeft: "10px" }}
                    onClick={() => updateHandler(ele.id, ele)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Tutorial_component
        updateTutorialState={updateTutorialState}
        show={show}
        handleClose={handleClose}
        setUpdateTutorialState={setUpdateTutorialState}
      />
    </div>
  );
};

export default Tutorial_list_component;
