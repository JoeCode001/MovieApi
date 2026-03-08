import { z } from "zod";

const addToWatchlistSchema = z.object({
    movieId: z.string().uuid({ message: "A valid Movie ID (UUID) is required" }),
    
    status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
        invalid_type_error: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
    }).optional(),
    
    // FIX: Changed z.coerce() to z.coerce.number()
    rating: z.coerce.number()
        .int({ message: "Rating must be a whole number" })
        .min(0, { message: "Rating must be between 0 and 10" })
        .max(10, { message: "Rating must be between 0 and 10" })
        .optional(),
        
    notes: z.string()
        .max(500, { message: "Notes cannot exceed 500 characters" })
        .optional(),
});

export { addToWatchlistSchema };