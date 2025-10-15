
import { CreateLoan } from "@/components/loans/create-loan";
import { Button } from "@/components/shared/button";
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
                <Link href={"/loans"}>
                    <Button icon={<List size={20} />}>Loan List</Button>
                </Link>
            </div>
            <CreateLoan />
        </div>
    );
};

export default CreateLoanPage;
