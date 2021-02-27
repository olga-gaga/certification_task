export const mockSearchMoviesData = {
  Actors: 'Tobey Maguire, Willem Dafoe, Kirsten Dunst, James Franco',
  Awards: 'Nominated for 2 Oscars. Another 16 wins & 61 nominations.',
  Country: 'USA',
  Director: 'Sam Raimi',
  Genre: 'Action, Adventure, Sci-Fi',
  Language: 'English',
  Metascore: '73',
  Plot: 'This is a story of Peter Parker who is a nerdy high-schooler. He was orphaned as a child, bullied by jocks, and can not confess his crush for his stunning neighborhood girl Mary Jane Watson. To say his life is "miserable" is an understatement. But one day while on an excursion to a laboratory a runaway radioactive spider bites him... and his life changes in a way no one could have imagined. Peter acquires a muscle-bound physique, clear vision, ability to cling to surfaces and crawl over walls, shooting webs from his wrist ... but the fun is not going to last. An eccentric millionaire Norman Osborn administers a performance enhancing drug on himself and his maniacal alter ego Green Goblin emerges. Now Peter Parker has to become Spider-Man and take Green Goblin to the task... or else Goblin will kill him. They come face to face and the war begins in which only one of them will survive at the end.',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg',
  Production: 'Marvel Films, Laura Ziskin Productions',
  Runtime: '121 min',
  Title: 'Spider-Man',
  Writer: 'Stan Lee (Marvel comic book), Steve Ditko (Marvel comic book), David Koepp (screenplay)',
  Year: '2002',
  imdbID: 'tt0145487',
  imdbRating: '7.3',
};

export const mockMoviesData = {
  tt0050083: {
    Title: '12 Angry Men',
    Genre: 'Crime, Drama',
    Year: '1957',
    imdbID: 'tt0050083',
  },
  tt0060196: {
    Title: 'The Good, the Bad and the Ugly',
    Genre: 'Western',
    Year: '1966',
    imdbID: 'tt0060196'
  },
  tt0068646: {
    Title: 'The Godfather',
    Genre: 'Crime, Drama',
    Year: '1972',
    imdbID: 'tt0068646'
  },
  tt0071562: {
    Title: 'The Godfather: Part II',
    Genre: 'Crime, Drama',
    Year: '1974',
    imdbID: 'tt0071562'
  },
  tt0108052: {
    Title: 'Schindler\'s List',
    Genre: 'Biography, Drama, History',
    Year: '1993',
    imdbID: 'tt0108052'
  },
  tt0109830: {
    Title: 'Forrest Gump',
    Genre: 'Drama, Romance',
    Year: '1994',
    imdbID: 'tt0109830'
  },
  tt0110912: {
    Title: 'Pulp Fiction',
    Genre: 'Crime, Drama',
    Year: '1994',
    imdbID: 'tt0110912'
  },
  tt0111161: {
    Title: 'The Shawshank Redemption',
    Genre: 'Drama',
    Year: '1994',
    imdbID: 'tt0111161'
  },
  tt0120737: {
    Title: 'The Lord of the Rings: The Fellowship of the Ring',
    Genre:'Action, Adventure, Drama, Fantasy',
    Year: '2001',
    imdbID: 'tt0120737'
  },
  tt0137523: {
    Title: 'Fight Club',
    Genre: 'Drama',
    Year: '1999',
    imdbID: 'tt0137523'
  },
  tt0167260: {
    Title: 'The Lord of the Rings: The Return of the King',
    Genre: 'Action, Adventure, Drama, Fantasy',
    Year: '2003',
    imdbID: 'tt0167260'
  },
  tt0468569: {
    Title: 'The Dark Knight',
    Genre: 'Action, Crime, Drama, Thriller',
    Year: '2008',
    imdbID: 'tt0468569'
  }
};

export const mockTop250IDs = [Object.keys(mockMoviesData)[0]];

export const mockError = { Error: true };

export const mockMoviesArray = Object.values(mockMoviesData);
