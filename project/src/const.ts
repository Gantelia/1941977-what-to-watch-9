export enum AppRoute {
    Main = '/',
    SignIn = '/login',
    MyList = '/mylist',
    Film = '/films/:id',
    AddReview = '/films/:id/review',
    Player = '/player/:id',
    NotFound = '*',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export const RATINGS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export const HOUR_IN_MINUTES = 60;

export enum Rating {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very Good',
  Awesome = 'Awesome',
}

export enum FilmsCount {
  MainScreen = 8,
  MovieScreen = 4,
  MyListScreen = 4,
}

export const REVIEWS_RENDER_STEP = 3;
