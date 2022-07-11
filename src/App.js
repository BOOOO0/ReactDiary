import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";
//process.env.PUBLIC_URL public 폴더의 경로를 바로 쓸 수 있는 명령어
//<img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
function App() {
  return (
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
        <h2>App.js</h2>

        <MyButton
          text={"버튼"}
          onClick={() => alert("click!")}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("click!")}
          type={"negative"}
        />
        <MyButton text={"버튼"} onClick={() => alert("click!")} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/new" element={<New />} />
          <Route exact path="/edit" element={<Edit />} />
          <Route exact path="/diary:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
