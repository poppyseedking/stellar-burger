import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

function ProfileOrders({ title }) {
  const useTitle = (title) => {
    const { setTitle } = useOutletContext();

    useEffect(() => {
      setTitle(title);
    }, [setTitle, title]);
  };

  useTitle(title);
  return (
    <React.Fragment>
      <div className="d-flex flex-direction-column">
        <p className="text text_type_main-medium text_color_inactive mb-20">
          Здесь будут заказы
        </p>
      </div>
    </React.Fragment>
  );
}

ProfileOrders.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProfileOrders;
