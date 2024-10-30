import React from 'react'
 import { RingLoader } from "react-spinners";

function Loader() {
  return (
      <div
          style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height:"30vh"
          }}
      >
      <RingLoader color="#34d767"/>
    </div>
  );
}

export default Loader
