import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

function ProfileOrders({ title }: { title: string }) {
  const useTitle = (title: string) => {
    const { setTitle }: { setTitle: (title: string) => void } =
      useOutletContext();

    useEffect(() => {
      setTitle(title);
    }, [setTitle, title]);
  };

  useTitle(title);
  return (
    <>
      <div className="d-flex flex-direction-column">
        <p className="text text_type_main-medium text_color_inactive mb-20">
          Здесь будут заказы
        </p>
      </div>
    </>
  );
}

ProfileOrders.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProfileOrders;
