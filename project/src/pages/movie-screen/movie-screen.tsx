import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import SignInOut from '../../components/sign-in-out/sign-in-out';
import { AppRoute, AuthorizationStatus, FilmsCount } from '../../const';
import MovieOverview from '../../components/movie-overview/movie-overview';
import { useEffect, useState } from 'react';
import MovieDetails from '../../components/movie-details/movie-details';
import MovieReviews from '../../components/movie-reviews/movie-reviews';
import FilmList from '../../components/film-list/film-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction, fetchSimilarAction } from '../../store/api-actions/api-film-actions';
import { fetchComments } from '../../store/api-actions/api-comments-action';
import LoadingScreen from '../loading - screen/loading-screen';

function MovieScreen(): JSX.Element {
  const {id} = useParams();
  const filmId = Number(id);

  const dispatch = useAppDispatch();

  const {film, similarFilms, comments, authorizationStatus, error} = useAppSelector((state) => state);

  const [navigation, setNavigation] = useState('Overview');
  const navigate = useNavigate();

  useEffect(() => {
    if (film === null || film?.id !== filmId) {
      dispatch(fetchFilmAction(filmId));
      dispatch(fetchSimilarAction(filmId));
      dispatch(fetchComments(filmId));
    }
  }, [film, filmId, dispatch]);

  if (error === 'Film id NaN does not exist') {
    navigate(AppRoute.NotFound);
  }

  if (!film || !similarFilms || !comments || film?.id !== filmId) {
    return <LoadingScreen />;
  }

  const overviewClass = navigation === 'Overview' ? 'film-nav__item--active' : '';
  const detailsClass = navigation === 'Details' ? 'film-nav__item--active' : '';
  const reviewsClass = navigation === 'Reviews' ? 'film-nav__item--active' : '';

  const {backgroundImage, name, genre, released, posterImage} = film;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <SignInOut />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => navigate (`/player/${filmId}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth && <Link to={`/films/${filmId}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={`film-nav__item ${overviewClass}`}>
                    <Link to={`/films/${filmId}`} className="film-nav__link"
                      onClick={() => setNavigation('Overview')}
                    >Overview
                    </Link>
                  </li>
                  <li className={`film-nav__item film-nav__item ${detailsClass}`}>
                    <Link to={`/films/${filmId}`} className="film-nav__link"
                      onClick={() => setNavigation('Details')}
                    >Details
                    </Link>
                  </li>
                  <li className={`film-nav__item film-nav__item ${reviewsClass}`}>
                    <Link to={`/films/${filmId}`} className="film-nav__link"
                      onClick={() => setNavigation('Reviews')}
                    >Reviews
                    </Link>
                  </li>
                </ul>
              </nav>

              {navigation === 'Overview' && <MovieOverview film = {film}/>}
              {navigation === 'Details' && <MovieDetails film = {film}/>}
              {navigation === 'Reviews' && <MovieReviews reviews = {comments}/>}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            {
              <FilmList
                filmCards={similarFilms}
                activeGenre={genre}
                filmsCount={FilmsCount.MovieScreen}
              />
            }
          </div>
        </section>

        <footer className="page-footer">
          <Logo isFooterLogo />
        </footer>
      </div>
    </>
  );
}

export default MovieScreen;
