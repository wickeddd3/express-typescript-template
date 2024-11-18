import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";

function validationMiddleware(schema: ZodSchema): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Parse and validate the request body
      const value = schema.parse(req.body);
      req.body = value; // Overwrite the request body with validated data
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract field-specific error messages
        const errors = error.errors.map((err) => ({
          field: err.path.join("."), // Path to the field with the error
          message: err.message, // Specific error message
        }));
        res.status(400).json({ errors }); // Return detailed errors
        return; // Explicitly return to stop further execution
      }
      // Pass any other type of error to the error-handling middleware
      next(error); // Ensure the function doesn't fall through
    }
  };
}

export default validationMiddleware;
