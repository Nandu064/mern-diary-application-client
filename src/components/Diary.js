import React from "react";
import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();
  console.log("params: ", params);
  return <div>Diary</div>;
};

export default Diary;
