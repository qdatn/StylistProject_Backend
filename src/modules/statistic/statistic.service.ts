import { Order } from "@modules/order";
import { OrderItem } from "@modules/orderItem";
import { Product } from "@modules/product";
import { Request, Response, NextFunction } from "express";

class StatisticService {
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

  async getStatistics(startDate: Date, endDate: Date) {
    // Tổng tiền đơn hàng trong khoảng thời gian
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);

    // Tổng sản phẩm đã bán
    // const totalSoldProducts = await Product.aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       total: { $sum: "$sold_quantity" },
    //     },
    //   },
    // ]);
    const totalSoldProducts = await OrderItem.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" },
        },
      },
    ]);

    // Tổng số đơn
    const totalOrders = await Order.countDocuments({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    // Tổng số sản phẩm
    const totalProducts = await Product.countDocuments({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    return {
      totalRevenue: totalRevenue[0]?.total || 0,
      // totalSoldProducts: totalSoldProducts[0]?.total || 0,
      totalSoldProducts: totalSoldProducts[0]?.total || 0,
      totalOrders,
      totalProducts,
    };
  }
}

export default new StatisticService();
