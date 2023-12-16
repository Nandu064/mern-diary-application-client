import React from "react";
import { useParams } from "react-router-dom";

const SingleDiaryView = () => {
  const { id } = useParams();
  console.log("id: ", id);
  return <div>{id}</div>;
};

export default SingleDiaryView;
