import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [curDate, setCurdate] = useState(new Date());
  // date 객체가 저장하고있는 시간의 연도를 가져오는 메소드
  // getMonth메소드는 1월을 0으로 반환하기 때문에 +1 해줘야한다
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // 날짜가 이동하면 해당 날짜에 대한 일기만 보여주기 위해서
  // useEffect를 사용해 dependency array에 curDate를 전달해줘서
  // 다른 월로 넘어가면서 상태가 변경되면 새로 렌더링 되게 했다
  useEffect(() => {
    // 해당 연 월의 1일을 ms로 구해서 할당
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0
    ).getTime();
    // 이 사이에 작성된 일기들을 추리면 해당 월 일기들만 추릴수있음
    setData(
      diaryList.filter((it) => it.date >= firstDay && it.date <= lastDay)
    );
    //dependency array에 diaryList를 넣어주지 않으면
    //diaryList에 대한 부분이 렌더링되지 않음
  }, [diaryList, curDate]);

  useEffect(() => {}, [data]);
  const increaseMonth = () => {
    // 새로운 데이터 객체를 생성해서 전달해주는데
    // Month가 1씩 증가하다가 최대치를 넘으면 year도 알아서 증가한다
    setCurdate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurdate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
