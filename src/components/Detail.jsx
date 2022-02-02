//Detail.js
// 리액트 패키지를 불러옵니다.
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  updateBucketFB,
  changeBucketFB,
  deleteBucketFB,
} from "../redux/modules/bucket";

const Detail = (props) => {
  const text = React.useRef(null);
  const meaning = React.useRef(null);
  const example = React.useRef(null);
  const translate = React.useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const bucket_index = params.index;

  // 스토어에서 상태값 가져오기
  const bucket_list = useSelector((state) => state.bucket.list);

  const changeBucket = () => {
    dispatch(
      changeBucketFB(bucket_list[bucket_index].id, {
        text: text.current.value,
        meaning: meaning.current.value,
        example: example.current.value,
        translate: translate.current.value,
      })
    );
    history.goBack();
  };

  return (
    <div className="change-word">
      <label>단어</label>
      <input
        ref={text}
        defaultValue={
          bucket_list[bucket_index] ? bucket_list[bucket_index].text : ""
        }
      />
      <label>뜻</label>
      <input
        ref={meaning}
        defaultValue={
          bucket_list[bucket_index] ? bucket_list[bucket_index].meaning : ""
        }
      />
      <label>예문</label>
      <input
        ref={example}
        defaultValue={
          bucket_list[bucket_index] ? bucket_list[bucket_index].example : ""
        }
      />
      <label>예문 뜻</label>
      <input
        ref={translate}
        defaultValue={
          bucket_list[bucket_index] ? bucket_list[bucket_index].translate : ""
        }
      />
      <div className="detail-btn">
        <button
          onClick={() => {
            dispatch(updateBucketFB(bucket_list[bucket_index].id));
            history.goBack();
          }}
        >
          완료하기
        </button>
        <button onClick={changeBucket}>수정하기</button>
        <button
          onClick={() => {
            dispatch(deleteBucketFB(bucket_list[bucket_index].id));
            history.goBack();
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default Detail;
