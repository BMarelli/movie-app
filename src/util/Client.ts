import { MovieInterface, MovieInfo } from "../types"


export interface ApiResponse<T> {
  page: number
  results: T
  total_pages: number
  total_results: number
}

export class FetchError extends Error {
  /*
    Error thrown when the fetch fails
  */

  constructor(status: string = 'Status not available') {
    super(status)
  }
}

export default class Client {
  /*
    Abstraction used to fetch data from api
  */

  /* URL of the api */
  private api: string;
  /* API key authentication */
  private token: string = 'efbc2b95033e7dde757b6c455744baa2';

  constructor(api: string) {
    this.api = api;
  }

  /*
    Parses the error from the response
    @param response: Response - the response to parse
    @returns Promise<string | undefined> - the error message or undefined
  */
  private async parseErrorFromResponse(response: Response): Promise<string | undefined> {
    try {
      return (await response.json()).status;
    } catch (error) {
      return undefined;
    }
  }

  /*
    Abstraction of the fetch method to make it easier to use
    @param endpoint: string - the endpoint to fetch from
    @param page: number | undefined - the page to fetch from
    @returns Promise<T> - the response from the fetch
  */
  private async fetch<T>(endpoint: string, page?: number): Promise<T> {
    const url = `${this.api}/${endpoint}?api_key=${this.token}${page ? `&page=${page}` : ''}`
    let response = await fetch(url);

    if (!response.ok) {
      const errorStatus = await this.parseErrorFromResponse(response);

      throw new FetchError(errorStatus);
    }

    return await response.json();
  }

  /*
    Fetches the movies information from the api
    @param page: number | undefined - the page to fetch from
    @returns Promise<MovieInfo[]> - the movies information from the API
  */
  public async getMovies(page?: number): Promise<MovieInfo[]> {
    const response = await this.fetch<ApiResponse<MovieInfo[]>>('trending/movie/week', page);
    return response.results;
  }

  /*
    Fetches a particular movie from the api
    @param id: number - the id of the movie to fetch
    @returns Promise<MovieInterface> - the movie from the API
  */
  public async getMovie(id: number): Promise<MovieInterface> {
    const response = await this.fetch<MovieInterface>(`movie/${id}`);
    return response;
  }
}