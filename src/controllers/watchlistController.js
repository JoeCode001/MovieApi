import { watch } from "fs";
import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  // Validate input
  if (!req.user.id || !movieId) {
    return res.status(400).json({ error: "Please provide userId and movieId" });
  }

  //verify if the movie exists in the movies table
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  //checking if the watchlist already existed for the user and the movie
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (existingInWatchlist) {
    return res.status(400).json({ error: "Movie already in watchlist" });
  }

  // Create the watchlist item
  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED", // default status
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "success",
    message: "Movie added to watchlist successfully",
    data: {
      watchlistItem,
    },
  });
};

const removeFromWatchlist = async (req, res) => {
  const { id } = req.params;
  // find the watchlist item by id, check if it belongs to the user, and delete it if valid

  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: String(id) },
  });
  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "Forbidden, you can only delete your own watchlist items",
    });
  }

  await prisma.watchlistItem.delete({
    where: { id: String(id) },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist successfully",
  });
};

const updateFromWatchlist = async (req, res) => {
  const { id } = req.params;
  const { status, rating, notes } = req.body;
  // find the watchlist item by id, check if it belongs to the user, and update it if valid

  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: String(id) },
  });
  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "Forbidden, you can only update your own watchlist items",
    });
  }

  const updatedWatchlistItem = await prisma.watchlistItem.update({
    where: { id: String(id) },
    data: {
      status: status || watchlistItem.status,
      rating: rating !== undefined ? rating : watchlistItem.rating,
      notes: notes !== undefined ? notes : watchlistItem.notes,
    },
  });

  res.status(200).json({
    status: "success",
    message: "Watchlist item updated successfully",
    data: {
      watchlistItem: updatedWatchlistItem,
    },
  });
};

export { addToWatchlist, removeFromWatchlist, updateFromWatchlist };
