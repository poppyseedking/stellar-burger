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
  OrderDetailsPage,
} from "../../pages";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { OnlyAuth, OnlyUnAuth } from "../protected-route-element";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/actions/user";
import ProfileIndex from "../../pages/profile-index";
import ProfileOrders from "../../pages/profile-orders";
import { useDispatch } from "../../services/store";
import Feed from "../../pages/feed";
import OrderDetail from "../order-detail/order-detail";
import AppHeader from "../app-header/app-header";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (fromResetPassword && !fromForgotPassword) {
    return <Navigate to="/forgot-password" />;
  }

  return (
    <>
      <AppHeader />
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
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderDetailsPage />} />
        <Route
          path="/profile/orders/:number"
          element={<OnlyAuth component={<OrderDetailsPage />} />}
        />
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
          <Route
            path="/feed/:number"
            element={
              <Modal
                title={"Детали заказа"}
                adjustToOrderDetail={true}
                onClose={handleModalClose}
              >
                <OrderDetail />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <OnlyAuth
                component={
                  <Modal
                    title={"Детали заказа"}
                    adjustToOrderDetail={true}
                    onClose={handleModalClose}
                  >
                    <OrderDetail />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
