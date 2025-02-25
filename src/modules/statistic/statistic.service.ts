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
      // createdAt: {
      //   $gte: new Date(startDate),
      //   $lte: new Date(endDate),
      // },
    });

    return {
      totalRevenue: totalRevenue[0]?.total || 0,
      // totalSoldProducts: totalSoldProducts[0]?.total || 0,
      totalSoldProducts: totalSoldProducts[0]?.total || 0,
      totalOrders,
      totalProducts,
    };
  }

  async getOrdersByDateRange(startDate: Date, endDate: Date) {
    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
          averageTotalPrice: { $avg: "$total_price" }, // Tính giá trị trung bình của total_price
        },
      },
      {
        $project: {
          _id: 1,
          averageTotalPrice: { $round: ["$averageTotalPrice", 2] }, // Làm tròn 2 chữ số thập phân
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const dailyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
          totalRevenue: { $sum: "$total_price" }, // Tổng doanh thu theo ngày
          totalOrders: { $sum: 1 }, // Số lượng đơn hàng trong ngày
        },
      },
      {
        $sort: { _id: 1 }, // Sắp xếp theo ngày tăng dần
      },
    ]);

    const dailyOrderCounts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
          orderCount: { $sum: 1 }, // Đếm số lượng đơn hàng trong mỗi ngày
        },
      },
      {
        $sort: { _id: 1 }, // Sắp xếp theo ngày tăng dần
      },
    ]);

    return {
      orders,
      // totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      dailyRevenue,
      dailyOrderCounts,
    };
  }

  async getOrdersByDate(startDate: Date, endDate: Date) {
    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      // {
      //   $group: {
      //     _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
      //     averageTotalPrice: { $avg: "$total_price" }, // Tính giá trị trung bình của total_price
      //   },
      // },
      // {
      //   $sort: { _id: 1 },
      // },
    ]);
    return { orders };
  }
}

export default new StatisticService();
