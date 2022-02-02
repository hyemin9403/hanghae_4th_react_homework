// bucket.js
import { db } from "../../firebase";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions type
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";
const LOADED = "bucket/LOADED";
const CHANGE = "bucket/CHANGE";

const initialState = {
  is_loaded: false,
  list: [
    // {
    //   text: "apple",
    //   meaning: "애플",
    //   completed: false,
    //   example: "Do you know apple?",
    //   translate: "애플을 아십니까",
    // },
  ],
};

// Action Creators
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}

export function createBucket(bucket) {
  return { type: CREATE, bucket: bucket };
}

export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}

export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}

export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}

export function changeBucket(bucket_index, bucket) {
  return { type: CHANGE, bucket_index, bucket };
}

// middlewares

export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));
    console.log(bucket_data);

    let bucket_list = [];

    bucket_data.forEach((doc) => {
      bucket_list.push({ id: doc.id, ...doc.data() });
    });
    // console.log(bucket_list);

    dispatch(loadBucket(bucket_list));
  };
};

export const createBucketFB = (bucket) => {
  return async function (dispatch) {
    dispatch(isLoaded(false));
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    const _bucket = await getDoc(docRef);
    const bucket_data = { id: _bucket.id, ..._bucket.data() };
    // console.log((await getDoc(docRef)).data());
    console.log(bucket_data);

    dispatch(createBucket(bucket_data));
  };
};

export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    // console.log(bucket_id);
    const docRef = doc(db, "bucket", bucket_id);
    await updateDoc(docRef, { completed: true });

    // console.log(getState().bucket);
    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(updateBucket(bucket_index));
  };
};

export const changeBucketFB = (bucket_id, bucket) => {
  // console.log("FB 요청왔다!", bucket_id, bucket);

  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id);
    await updateDoc(docRef, bucket);

    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });

    dispatch(changeBucket(bucket_index, bucket));
  };
};

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      window.alert("아이디가 없네요");
      return;
    }

    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);

    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(deleteBucket(bucket_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list, is_loaded: true };
    }

    case "bucket/CREATE": {
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list, is_loaded: true };
    }

    case "bucket/UPDATE": {
      // console.log(state, action);
      const new_bucket_list = state.list.map((l, idx) => {
        if (parseInt(action.bucket_index) === idx) {
          if (l.completed === true) {
            return { ...l, completed: false };
          } else {
            return { ...l, completed: true };
          }
        } else {
          return l;
        }
      });

      return { ...state, list: new_bucket_list };
    }

    case "bucket/CHANGE": {
      // console.log("reducer 요청왔다!");
      const new_bucket_list = state.list.map((l, idx) => {
        if (parseInt(action.bucket_index) === idx) {
          return {
            ...l,
            text: action.bucket.text,
            meaning: action.bucket.meaning,
            example: action.bucket.example,
            translate: action.bucket.translate,
          };
        } else {
          return l;
        }
      });
      console.log(new_bucket_list);
      return { ...state, list: new_bucket_list };
    }

    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { ...state, list: new_bucket_list };
    }

    case "bucket/LOADED": {
      return { ...state, is_loaded: action.loaded };
    }

    default:
      return state;
  }
}
