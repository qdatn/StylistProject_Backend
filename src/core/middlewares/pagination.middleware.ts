import { Request, Response, NextFunction } from "express";

const pagination = async (
  req: Request,
  res: Response,
  data: any[],
  next: NextFunction
) => {
  try {
    // Parse query parameters for pagination
    const page: number = parseInt(req.query.page as string) || 1; // default to page 1
    const limit: number = parseInt(req.query.limit as string) || 10; // default to 10 items per page

    // Calculate the number of documents to skip
    // const skip: number = (page - 1) * limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Fetch the products with pagination
    // const results = await model.find().skip(skip).limit(limit);
    const results = await data.slice(startIndex, endIndex);

    // Get the total count for pagination metadata
    // const totalItems = await model.countDocuments();
    const totalItems = data.length;

    // Send the response with pagination metadata
    res.locals.pagination = {
      data: results,
      pagination: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        pageSize: results.length,
      },
    };
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default pagination;
