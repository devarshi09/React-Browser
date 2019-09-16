import React, { Fragment } from "react";

const History = props => {
    
  return (
    <div>
      {props.history.map(element => {
        return (
          <Fragment>
            <div class="history">
              {element.name}{" "}
              <span style={{ backgroundColor: "blue", marginLeft: "15px" }}>
                time
              </span>{" "}
              - {element.date.getHours()}:{element.date.getMinutes()}:
              {element.date.getSeconds()}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default History;
