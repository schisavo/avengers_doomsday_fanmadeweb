export interface CrewWork {
  title: string;
  type: "movie" | "series";
  image: string;
  year: number;
  marvel?: boolean;
}

export interface CrewMember {
  name: string;
  role: "Director" | "Writer" | "Producer";
  image: string;
  work: CrewWork;
}

export const crew: CrewMember[] = [
  {
    name: "Anthony Russo",
    role: "Director",
    image: "/images/crew/anthony-russo.webp",
    work: {
      title: "Avengers: Endgame",
      type: "movie",
      image: "/images/movies/avengers-endgame.webp",
      year: 2019,
      marvel: true,
    },
  },

  {
    name: "Joe Russo",
    role: "Director",
    image: "/images/crew/joe-russo.webp",
    work: {
      title: "Avengers: Infinity War",
      type: "movie",
      image: "/images/movies/avengers-infinity-war.webp",
      year: 2018,
      marvel: true,
    },
  },

  {
    name: "Stephen McFeely",
    role: "Writer",
    image: "/images/crew/stephen-mcfeely.webp",
    work: {
      title: "Captain America: The Winter Soldier",
      type: "movie",
      image: "/images/movies/captain-america-winter-soldier.webp",
      year: 2014,
      marvel: true,
    },
  },

  {
    name: "Kevin Feige",
    role: "Producer",
    image: "/images/crew/kevin-feige.webp",
    work: {
      title: "Iron Man",
      type: "movie",
      image: "/images/movies/iron-man.webp",
      year: 2008,
      marvel: true,
    },
  },

  {
    name: "Louis D'Esposito",
    role: "Producer",
    image: "/images/crew/louis-desposito.webp",
    work: {
      title: "Captain America: The First Avenger",
      type: "movie",
      image: "/images/movies/captain-america-first-avenger.webp",
      year: 2011,
      marvel: true,
    },
  },

  {
    name: "Jonathan Schwartz",
    role: "Producer",
    image: "/images/crew/jonathan-schwartz.webp",
    work: {
      title: "Guardians of the Galaxy Vol. 2",
      type: "movie",
      image: "/images/movies/guardians-of-the-galaxy-vol-2.webp",
      year: 2017,
      marvel: true,
    },
  },
];

