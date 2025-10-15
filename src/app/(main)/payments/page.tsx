import PaymentTable from "@/components/payment/payment-table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Loan Management | Payments",
};
const PaymentHistoryPage = () => {
    return (
        <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Payment History</h1>
            <PaymentTable />
        </div>
    )
}

export default PaymentHistoryPage;