import React, { Fragment,Component } from "react";

class History extends Component{

render(){
  return (
    <div>
      {this.props.history.map((element,i) => {
        return (
          <Fragment>
            <div key = {i} class="history">
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
}
};

export default History;
