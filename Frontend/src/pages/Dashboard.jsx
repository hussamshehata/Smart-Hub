import { motion } from "framer-motion";
import OrdersTable from "../Components/Dashboard/OrdersTable.jsx";
import StatCard from "../Components/Dashboard/StatCard.jsx";

export default function Dashboard() {
    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="min-h-screen w-full p-4 md:p-8">

                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold">Dashboard</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Total Sales" amount="$25,024" desc="Last 24 Hours" />
                    <StatCard title="Total Expenses" amount="$14,160" desc="Last 24 Hours" />
                    <StatCard title="Total Income" amount="$10,864" desc="Last 24 Hours" />
                </div>

                {/* Recent Orders Table */}
                <OrdersTable />
            </div>
        </motion.div>
    );
}
