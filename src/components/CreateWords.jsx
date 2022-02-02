import "../index.css";
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// useDispatch를 가져와요!
import { useDispatch, useSelector } from "react-redux";
// 액션생성함수도 가져오고요!
import {
  createBucket,
  loadBucketFB,
  createBucketFB,
} from "../redux/modules/bucket";

const CreateWords = () => {
  const text = React.useRef(null);
  const meaning = React.useRef(null);
  const example = React.useRef(null);
  const translate = React.useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const addBucketList = () => {
    dispatch(
      createBucketFB({
        text: text.current.value,
        meaning: meaning.current.value,
        example: example.current.value,
        translate: translate.current.value,
        completed: false,
      })
    );

    text.current.value = "";
    meaning.current.value = "";
    example.current.value = "";
    translate.current.value = "";

    history.push("/");
  };

  return (
    <Input>
      <label>단어</label>
      <input type="text" ref={text} />
      <label>뜻</label>
      <input type="text" ref={meaning} />
      <label>예문</label>
      <input type="text" ref={example} />
      <label>예문 뜻</label>
      <input type="text" ref={translate} />
      <button onClick={addBucketList}>추가하기</button>
    </Input>
  );
};

const Input = styled.div`
  height: 70vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    padding: 5px;
  }
  & input {
    border: 1px solid #888;
    width: 300px;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  & input:focus {
    border: 1px solid #a673ff;
    outline: none;
  }

  & button {
    width: 300px;
    color: #fff;
    border: #a673ff;
    background: #f1356d;
    padding: 10px 0;
  }
`;
export default CreateWords;
