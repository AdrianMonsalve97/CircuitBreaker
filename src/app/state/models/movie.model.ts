export class Movie {
  constructor(
    public imdbID: string,
    public title: string,
    public year: string,
    public poster: string,
    public country: string,
    public actors: string
  ) {}

  static fromJson(data: any): Movie {
    return new Movie(
      data.imdbID,
      data.Title,
      data.Year,
      data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/150',
      data.Country,
      data.Actors
    );
  }
}
