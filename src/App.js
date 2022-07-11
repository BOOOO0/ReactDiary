import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";
import React, { useReducer, useRef } from "react";

//process.env.PUBLIC_URL public 폴더의 경로를 바로 쓸 수 있는 명령어
//<img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
// dispatch 함수들을 공급할 context
export const DiaryDispatchContext = React.createContext();
function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <MyHeader
              headText={"App"}
              leftChild={
                <MyButton
                  text={"왼쪽 버튼"}
                  onClick={() => alert("click!")}
                  type={"positive"}
                />
              }
              rightChild={
                <MyButton
                  text={"오른쪽 버튼"}
                  onClick={() => alert("click!")}
                  type={"negative"}
                />
              }
            />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/new" element={<New />} />
              <Route exact path="/edit" element={<Edit />} />
              <Route exact path="/diary:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
