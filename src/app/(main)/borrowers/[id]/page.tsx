'use client';

import React from "react";
import { User, Phone, Mail, MapPin, FilePenLine, List } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/date-format";
import { useParams } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";
import { Borrower } from "@/types";
import PaymentHistory from "@/components/borrowers/payment-history";
import LoanHistory from "@/components/borrowers/loan-history";
import LoanSummary from "@/components/borrowers/loan-summary";


// Define prop types for components
interface InfoItemProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

const InfoItem = ({ icon: Icon, label, value }: InfoItemProps) => (
    <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400" />
        <div>
            <div className="text-sm font-medium text-gray-500">{label}</div>
            <div className="font-semibold text-gray-800">{value}</div>
        </div>
    </div>
);

const BorrowerPage = () => {
    const params = useParams()
    const { data: borrower } = useFetchData<Borrower>(`/borrowers/${params.id}`)

    return (
        <div className="min-h-screen">
            <div className="mx-auto w-full space-y-8">
                <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 ">Borrower Details</h1>
                        <p className="text-sm text-gray-500 ">ID: {borrower?.borrowerId} | Since {formatDate(borrower?.createdAt || "")} </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={`/borrowers/${params.id}/edit`} className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 ">
                            <FilePenLine size={20} />
                        </Link>
                        <Link href={'/borrowers'} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                            <List size={18} />
                            Borrower List
                        </Link>
                    </div>
                </header>
                {/* Borrower Info Card */}
                <div>
                    <div className="flex flex-col gap-8 rounded-xl bg-white p-6 shadow-md md:flex-row md:items-center">
                        <div className="flex flex-wrap gap-4 justify-between w-full">
                            <InfoItem icon={User} label="Name" value={borrower?.name || ""} />
                            <InfoItem icon={Phone} label="Phone" value={borrower?.phone || ""} />
                            <InfoItem icon={Mail} label="Email" value={borrower?.email || ""} />
                            <InfoItem icon={MapPin} label="Address" value={borrower?.address || ""} />
                        </div>
                    </div>
                </div>
                {/* <LoanSummary /> */}
                {params.id && <LoanHistory id={params.id?.toString()} />}
                {params.id && <PaymentHistory id={params.id?.toString()} />}
            </div>
        </div>
    );
};

export default BorrowerPage;
