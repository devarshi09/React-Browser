import React from "react";

const Website = props => {
  return (
    <div className="website">
      <iframe
        className="iframe"
        title="myFrame"
        src={props.searchInput}
      ></iframe>
    </div>
  );
};

export default Website;
