'use client'
import { EditLoanForm } from "@/components/loans/edit-loan";
import { useFetchData } from "@/hooks/useFetchData";
import { Loan } from "@/types";
import { List } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AddLoanPage() {
    const params = useParams();
    const { data, loading } = useFetchData<Loan>(`/loans/${params?.id}`)

    if (!params?.id || !data) {
        return <div>Loan not found!</div>
    }
    if (loading) {
        return <>Loading...</>
    }
    return (
        <div className="min-h-screen">
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 gap-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800">
                        Edit Loan ({data.loanId})
                    </h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <List size={20} />
                        <Link href={"/loans"} className="font-medium">Loan List</Link>
                    </button>
                </div>
                <EditLoanForm loan={data} />
            </div>
        </div>
    );
}
