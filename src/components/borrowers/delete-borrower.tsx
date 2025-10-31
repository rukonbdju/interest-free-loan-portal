'use client'
import { useState } from "react";
import DeleteConfirmationModal from "../shared/delete-modal"
import { Trash, } from "lucide-react";
import { baseUrl } from "@/utils/api-url";
import { useBorrowers } from "@/contexts/borrower-context";

const DeleteBorrower = ({ id, }: { id: string }) => {
    const { deleteBorrower } = useBorrowers()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = async () => {
        try {
            const res = await fetch(baseUrl + `/borrowers/${id}`, {
                method: "DELETE",
                credentials: 'include'
            })
            const result = await res.json()
            if (result?.success) {
                deleteBorrower(id)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete This Item?"
                description="You're about to permanently delete this item. All associated data will be lost. Are you absolutely sure?"
            />

            <button
                onClick={() => setIsModalOpen(true)}
                title="Delete"
                className="text-gray-500 hover:text-gray-900 transition-colors"
            >
                <Trash size={18} />
            </button>
        </>
    )
}

export default DeleteBorrower;