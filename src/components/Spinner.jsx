import React from "react";
import styled from "styled-components";
import { Eco } from "@material-ui/icons";

const Spinner = () => {
  return (
    <Outter>
      <Eco style={{ color: "#673ab7", fontSize: "150px" }} />
    </Outter>
  );
};

const Outter = styled.div`
  background-color: #e5d6ff;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Spinner;
