import Logo from '../../components/logo/logo';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">404<br /><small>Page was not found</small></h1>
      </header>
    </div>);
}

export default NotFoundScreen;
