import React from 'react';
import { FilmInfo } from '../../types/films';
import { convertMinutes } from '../../utils/utils';

type MovieDetailsProps = {
    film: FilmInfo;
}

function MovieDetails ({film}: MovieDetailsProps): JSX.Element {
  const {director, starring, runTime, genre, released} = film;


  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {
              starring.slice(0, -1).map((actor) => (
                <React.Fragment key={actor}>
                  {`${actor},`}<br />
                </React.Fragment>
              ))
            }
            {starring.slice(-1)}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{convertMinutes(runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;
