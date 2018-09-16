import React from "react";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level
    };
  }

  render() {
    let className = "item level" + this.props.level;
    return <img className={className} src={this.props.id} ></img>;
  }
}

export default Item;
