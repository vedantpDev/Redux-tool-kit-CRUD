// import { createSlice } from "@reduxjs/toolkit";
// export const counterSlice = createSlice({
//   name: "counter",
//   initialState: { value: 0 },
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByDefault: (state, action) => {
//       state.value = action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByDefault } =
//   counterSlice.actions;

// export default counterSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TutorialDataService from "../services/tutorialService";
import { useDispatch, useSelector } from "react-redux";

const initialState = [];

export const createTutorial = createAsyncThunk(
  "tutorials/create",
  async ({ title, description }) => {
    const res = await TutorialDataService.create({ title, description });
    return res.data;
  }
);

export const retrieveTutorial = createAsyncThunk(
  "tutorials/retrieve",
  async () => {
    const res = await TutorialDataService.getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "tutorials/update",
  async (data) => {
    const res = await TutorialDataService.update(data.id, data);
    return res.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  "tutorials/delete",
  async (id) => {
    await TutorialDataService.delete(id);
    return { id };
  }
);

export const deleteAllTutorial = createAsyncThunk(
  "tutorials/deleteAll",
  async () => {
    const res = TutorialDataService.deleteAll();
    return res.data;
  }
);

export const findTutorialByTitle = createAsyncThunk(
  "/tutorial/findByTitle",
  async (title) => {
    const res = await TutorialDataService.findByTitle(title);
    return res.data;
  }
);

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  extraReducers: {
    [createTutorial.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTutorial.fulfilled]: (state, action) => {
      return action.payload.data;
    },
    [updateTutorial.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.id == action.payload.id
      );
      state[index] = { ...action.payload.tutorialData };
    },
    [deleteTutorial.fulfilled]: (state, action) => {
      let filteredData = state.filter((obj) => obj.id !== action.payload.id);
      return [...filteredData];
    },
    [deleteAllTutorial.fulfilled]: (state, action) => {
      return [];
    },
    [findTutorialByTitle.fulfilled]: (state, action) => {
      return [...action.payload.data];
    },
  },
});

const { reducer } = tutorialSlice;
export default reducer;
