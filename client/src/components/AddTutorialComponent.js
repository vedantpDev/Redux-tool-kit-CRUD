import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTutorial } from "../slices/tutorials";

const Add_tutorial_component = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [clickCheck, setClickCheck] = useState(false);

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const saveTutorial = (e) => {
    e.preventDefault();
    setClickCheck(true);
  };

  const newTutorial = (e) => {
    e.preventDefault();
    dispatch(
      createTutorial({
        title: formData.title,
        description: formData.description,
      })
    );
  };

  return (
    <div className="container">
      {clickCheck ? (
        <div>
          <h4>You Submitted Successfully</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <form>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={changeHandler}
              value={formData.title}
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              name="description"
              type="text"
              onChange={changeHandler}
              value={formData.description}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            type="submit"
            onClick={saveTutorial}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Add_tutorial_component;
