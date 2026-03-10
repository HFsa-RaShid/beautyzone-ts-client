"use client";

import useAllOrders from "@/hooks/useAllOrders";
import { useState } from "react";

interface OrderItem {
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  transactionId?: string;
  customer?: {
    name: string;
  };
  orderDate: string;
  items?: OrderItem[];
  paidStatus: boolean;
}

const DashboardOrdersPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { orders, pagination, isLoading } = useAllOrders(page, 10);

  if (isLoading)
    return <div className="p-10 text-center font-bold">Loading orders...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Orders", value: pagination?.totalItems || 0, icon: "📦" },
          { title: "Processing", value: "12", icon: "⏳" },
          { title: "Pending Payments", value: "12", icon: "⚠️" },
          { title: "Revenue", value: "$91,526", icon: "📈" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
            <p className="text-xs text-gray-400 mb-2">{stat.title}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="border border-gray-200 rounded-xl p-6 mb-4 bg-white">
        <div className="flex gap-4 justify-between">
          <div className="w-[50%]">
            <input
              type="text"
              placeholder="Search by ID..."
              className="border border-gray-200 p-2 rounded-lg text-sm w-full outline-none"
            />
          </div>
          <div className="w-1/2 flex justify-between gap-2">
            <select className="border border-gray-200 p-2 rounded-lg text-sm w-[50%] outline-none">
              <option>All Payments</option>
              <option>Paid</option>
              <option>Failed</option>
            </select>
            <select className="border border-gray-200 p-2 rounded-lg text-sm w-[50%] outline-none">
              <option>All Status</option>
              <option>Delivered</option>
              <option>Shipped</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs uppercase">
            <tr>
              <th className="p-5">Transaction ID</th>
              <th className="p-5">Customer Name</th>
              <th className="p-5">Date</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: Order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 text-sm border-b last:border-none"
              >
                <td className="p-5 font-mono text-xs">
                  #{order.transactionId?.slice(-8)}
                </td>
                <td className="p-5">{order.customer?.name || "Guest"}</td>
                <td className="p-5">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="p-5 font-bold">
                  $
                  {order.items
                    ?.reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </td>
                <td className="p-5">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      order.paidStatus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.paidStatus ? "Paid" : "Failed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-5 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Page {pagination?.currentPage} of {pagination?.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-1 border rounded text-xs disabled:opacity-50 hover:bg-gray-50"
            >
              Prev
            </button>
            <button
              disabled={pagination && page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-1 border rounded text-xs disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrdersPage;