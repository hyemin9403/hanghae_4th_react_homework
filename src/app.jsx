import "./index.css";
import React from "react";
import styled from "styled-components";

import { Route, Switch, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadBucketFB } from "./redux/modules/bucket";

// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import Progress from "./components/Progress";
import BucketList from "./components/BucketList";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import Spinner from "./components/Spinner";
import CreateWords from "./components/CreateWords";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.bucket.is_loaded);

  React.useEffect(async () => {
    dispatch(loadBucketFB());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={BucketList} />
          <Route exact path="/detail/:index" component={Detail} />
          <Route exact path="/create" component={CreateWords} />
          <Route component={NotFound} />
        </Switch>
      </div>
      {!is_loaded && <Spinner />}
      <Link to="/create">
        <i className="fas fa-plus"></i>
      </Link>
    </div>
  );
}

export default App;
