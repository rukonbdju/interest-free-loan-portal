import { CreateBorrowerForm } from "@/components/borrowers/add-borrower";
import { Button } from "@/components/shared/button";
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
                    <Link href={"/borrowers"} className="font-medium">
                        <Button icon={<List size={20} />}>Borrower List</Button>
                    </Link>
                </div>
                <CreateBorrowerForm />
            </div>
        </div>
    );
}
