import React from "react";

const DiaryList = ({ diaryList }) => {
  return (
    <div>
      {diaryList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.deafaultProps = {
  diaryList: [],
};

export default DiaryList;
