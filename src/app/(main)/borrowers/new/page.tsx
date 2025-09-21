import { CreateBorrowerForm } from "@/components/borrowers/add-borrower";
import { List } from "lucide-react";
import Link from "next/link";

export default function AddBorrowerPage() {

    return (
        <div className="min-h-screen">
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 gap-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800">
                        Add New Borrower
                    </h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <List size={20} />
                        <Link href={"/borrowers"} className="font-medium">Borrower List</Link>
                    </button>
                </div>
                <CreateBorrowerForm />
            </div>
        </div>
    );
}
