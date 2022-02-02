// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBucket, updateBucket } from "../redux/modules/bucket";
import { updateBucketFB, deleteBucketFB } from "../redux/modules/bucket";

const BucketList = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  // 스토어에서 상태값 가져오기
  const my_lists = useSelector((state) => state.bucket.list);

  return (
    <ListStyle>
      {my_lists.map((list, index) => {
        return (
          <ItemStyle
            completed={list.completed}
            className="list_item"
            key={index}
            onClick={() => {
              history.push("/detail/" + index);
            }}
          >
            <div className="word-item">
              <label>단어</label>
              <p>{list.text}</p>

              <label>뜻</label>
              <p>{list.meaning}</p>

              <label>예문</label>
              <p>{list.example}</p>

              <label>예문 뜻</label>
              <p>{list.translate}</p>
            </div>
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;

  & > * {
    color: ${(props) => (props.completed ? "#fff" : "#333")};
    background-color: ${(props) => (props.completed ? "#673ab7" : "aliceblue")};
  }
  & label {
    color: ${(props) => (props.completed ? "#fff" : "#333")};
  }
  & p {
    margin: 0;
    padding: 0 10px;
    color: ${(props) => (props.completed ? "#fff" : "#333")};
  }
`;

export default BucketList;
