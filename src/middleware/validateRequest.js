export const validateRequest = (schema) => {
    return (req, res, next) => {
        // Using destructuring to get success status, the error (if any), and the parsed data
        const { success, error, data } = schema.safeParse(req.body);
        
        if (!success) { 
            return res.status(400).json({
                errors: error.errors.map((err) => ({
                    field: err.path.join('.'),      
                    message: err.message,
                })),    
                // FIX: Changed 'errors.map' to 'error.errors.map'
                message: error.errors.map((err) => err.message).join(', '), 
            });
        }
        
        // Optional but recommended: Replace req.body with the validated data
        // This strips out any unexpected fields the user sent that weren't in your schema
        req.body = data; 
        
        next();
    };
};