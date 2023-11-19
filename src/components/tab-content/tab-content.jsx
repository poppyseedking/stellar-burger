import React from "react";
import PropTypes from "prop-types";

class TabContent extends React.Component {
  elem = React.createRef();

  shouldComponentUpdate(nextProps) {
    if (nextProps.active) {
      this.elem.current.scrollIntoView({ behavior: "smooth" });
    }
    return false;
  }

  render() {
    return <div ref={this.elem}>{this.props.children}</div>;
  }
}

TabContent.propTypes = {
  active: PropTypes.bool,
};

export default TabContent;
