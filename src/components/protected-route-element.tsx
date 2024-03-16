import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../services/store";

const ProtectedRouteElement = ({
  onlyUnAuth = false,
  component,
}: {
  onlyUnAuth: boolean;
  component: JSX.Element;
}) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  const isAuthChecked = useSelector(
    (store: RootState) => store.user.isAuthChecked
  );
  const user = useSelector((store: RootState) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = ({ component }: { component: JSX.Element }) => (
  <ProtectedRouteElement onlyUnAuth={false} component={component} />
);
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
