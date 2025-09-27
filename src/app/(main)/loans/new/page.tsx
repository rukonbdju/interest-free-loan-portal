import CreateLoan from "@/components/loans/create-loan";
import { List } from "lucide-react";
import Link from "next/link";

const CreateLoanPage = () => {
    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2"></h1>
            <div className="flex items-center justify-between mb-6 gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800">
                    Create New Loan
                </h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <List size={20} />
                    <Link href={"/loans"} className="font-medium">Loan List</Link>
                </button>
            </div>
            <CreateLoan />
        </div>
    );
};

export default CreateLoanPage;
