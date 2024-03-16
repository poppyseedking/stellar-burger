import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Page404,
  ForgotPassword,
  ResetPassword,
  Ingredient,
  Profile,
} from "../../pages";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { OnlyAuth, OnlyUnAuth } from "../protected-route-element";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/actions/user";
import ProfileIndex from "../../pages/profile-index";
import ProfileOrders from "../../pages/profile-orders";
import { AppDispatch } from "../../services/store";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const fromForgotPassword =
    location.state &&
    location.state.from &&
    location.state.from.pathname === "/forgot-password";

  const fromResetPassword = location.pathname === "/reset-password";

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (fromResetPassword && !fromForgotPassword) {
    return <Navigate to="/forgot-password" />;
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        {fromForgotPassword && (
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
        )}
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route
            index
            element={
              <ProfileIndex title="В этом разделе вы можете изменить свои персональные данные" />
            }
          />
          <Route
            path="orders"
            element={
              <ProfileOrders title="В этом разделе вы можете просмотреть свою историю заказов" />
            }
          />
        </Route>
        <Route path="/ingredients/:id" element={<Ingredient />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title={"Детали ингредиента"} onClose={handleModalClose}>
                <IngredientDetails ingredientData={null} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
