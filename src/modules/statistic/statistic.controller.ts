import { Order } from "@modules/order";
import { Product } from "@modules/product";
import { Request, Response, NextFunction } from "express";
import { StatisticService } from ".";

class StatisticController {
  async getProAndOrderStatistics(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Tổng tiền đơn hàng
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);

    // Tổng sản phẩm đã bán
    const totalSoldProducts = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$sold_quantity" },
        },
      },
    ]);

    // Tổng số đơn
    const totalOrders = await Order.countDocuments();

    // Tổng số sản phẩm
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalSoldProducts: totalSoldProducts[0]?.total || 0,
      totalOrders,
      totalProducts,
    });
  }
  async getRevenueByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        next({
          success: false,
          message: "Start date and end date are required.",
        });
      }
      // Chuyển đổi sang kiểu Date
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const statistics = await StatisticService.getStatistics(start, end);
      res.status(200).json({
        success: true,
        data: statistics,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new StatisticController();
