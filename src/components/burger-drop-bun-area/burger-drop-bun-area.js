import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
const BugerDropBunArea = ({ children }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "bun",
    drop: () => ({ type: "bun" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <div
      className={isActive || canDrop ? "burger-can_drop" : ""}
      ref={drop}
      data-testid="dustbin"
    >
      {children}
    </div>
  );
};

BugerDropBunArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default BugerDropBunArea;
