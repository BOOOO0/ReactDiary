import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

const New = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
