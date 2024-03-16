import { useDrop } from "react-dnd";

type TBugerDropBunArea = { children: React.ReactNode | React.ReactNode[] };
const BugerDropBunArea = ({ children }: TBugerDropBunArea) => {
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

export default BugerDropBunArea;
