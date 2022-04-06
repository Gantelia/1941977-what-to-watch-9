import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { isAuthorized } from '../../utils';

type PrivateRouteProps = {
    children: JSX.Element;
  }

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const {authorizationStatus} = useAppSelector(({USER}) => USER);


  return (
    isAuthorized(authorizationStatus)
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
