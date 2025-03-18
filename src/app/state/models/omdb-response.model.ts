import { Movie } from './movie.model';

export class OmdbResponse {
  constructor(
    public search: Movie[],
    public totalResults: number,
    public response: boolean
  ) {}

  static fromJson(data: any): OmdbResponse {
    return new OmdbResponse(
      data.Search?.map(Movie.fromJson) || [],
      parseInt(data.totalResults) || 0,
      data.Response === 'True'
    );
  }
}
