import BorrowersTable from '@/components/borrowers/borrowers-table';
import { Button } from '@/components/shared/button';
import { BorrowerProvider } from '@/contexts/borrower-context';
import {
    Plus,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Loan Management | Borrowers",
};

const BorrowersPage = () => {

    return (
        <BorrowerProvider>
            <div className="min-h-screen">
                <div className="w-full mx-auto">
                    {/* Page Title & Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Borrowers</h1>
                        <Link href={"/borrowers/new"} className="font-medium">
                            <Button icon={<Plus size={20} />}>Add New Borrower</Button>
                        </Link>
                    </div>

                    {/* Card Container */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <BorrowersTable />
                    </div>
                </div>
            </div>
        </BorrowerProvider>

    );
};

export default BorrowersPage;
