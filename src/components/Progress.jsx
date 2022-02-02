import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Progress = () => {
  const bucket_list = useSelector((state) => state.bucket.list);

  let count = 0;

  bucket_list.map((b, idx) => {
    if (b.completed) {
      count++;
    }
  });

  return (
    <ProgressBar>
      <HightLight width={(count / bucket_list.length) * 100 + "%"} />
      <Dot />
    </ProgressBar>
  );
};

export default Progress;

const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

const HightLight = styled.div`
  background: #f1356d;
  transition: 1s width;
  width: ${(props) => props.width};
  height: 20px;
  border-radius: 10px;
`;

const Dot = styled.div`
  width: 40px;
  height: 40px;
  background: #fff;
  border: 5px solid #f1356d;
  border-radius: 40px;
  margin: 0 0 0 -20px;
`;
