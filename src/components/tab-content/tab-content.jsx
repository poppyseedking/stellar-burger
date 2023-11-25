import React, { memo } from "react";
import PropTypes from "prop-types";

const TabContent = function TabContent({ active, children }) {
  const elem = React.createRef();

  React.useEffect(() => {
    if (active === true) {
      elem.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [active, elem]);

  return <div ref={elem}>{children}</div>;
};

TabContent.propTypes = {
  active: PropTypes.bool,
};

export default TabContent;
