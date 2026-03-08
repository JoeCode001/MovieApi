import { PrismaClient } from "../src/generated/prisma/index.js";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});
 
const userId = "74952195-39bd-4556-ae3c-6ef0803fc367"


const movies = [
  {
    title: "The Matrix",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=The+Matrix",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\".",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=Inception",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama", "Thriller"],
    runtime: 152,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=The+Dark+Knight",
    createdBy: userId,
  },
  {
    title: "Pulp Fiction",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    releaseYear: 1994,
    genres: ["Crime", "Thriller"],
    runtime: 154,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=Pulp+Fiction",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=Interstellar",
    createdBy: userId,
  },
  {
    title: "The Shawshank Redemption",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
    releaseYear: 1994,
    genres: ["Drama", "Crime"],
    runtime: 142,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=The+Shawshank+Redemption",
    createdBy: userId,
  },
  {
    title: "Fight Club",
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town.",
    releaseYear: 1999,
    genres: ["Drama", "Thriller", "Comedy"],
    runtime: 139,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=Fight+Club",
    createdBy: userId,
  },
  {
    title: "Forrest Gump",
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
    releaseYear: 1994,
    genres: ["Comedy", "Drama", "Romance"],
    runtime: 142,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=Forrest+Gump",
    createdBy: userId,
  },
  {
    title: "The Godfather",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers.",
    releaseYear: 1972,
    genres: ["Drama", "Crime"],
    runtime: 175,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=The+Godfather",
    createdBy: userId,
  },
  {
    title: "Goodfellas",
    overview: "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.",
    releaseYear: 1990,
    genres: ["Drama", "Crime"],
    runtime: 146,
    posterUrl: "https://placehold.co/500x750/1a1a1a/ffffff.png?text=Goodfellas",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("Seeding movies...");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }

  console.log("Seeding completed!");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
