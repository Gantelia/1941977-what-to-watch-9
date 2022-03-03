export type Genre = {
    id: number;
    name: string;
  }

export type FilmInfo = {
id: number;
name: string;
posterImage: string;
previewImage: string;
backgroundImage: string;
backgroundColor: string;
videoLink: string;
previewVideoLink: string;
description: string;
rating: number;
scoresCount: number;
director: string;
starring: string[];
runTime: number;
genre: string;
released: number;
isFavorite: boolean;
}

export type UserReview = {
  comment: string;
  rating: number | null;
}

export type UserComment = {
  id: number,
  author: string,
  data: string,
  rating: string,
  text: string,
  userId: number,
}

export type ConvertRating = (param: number) => string;
