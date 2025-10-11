'use client'
import { useState } from "react";
import DeleteConfirmationModal from "../shared/delete-modal"
import { Trash, } from "lucide-react";
import { baseUrl } from "@/utils/api-url";
import { useLoans } from "@/contexts/loan-context";

const DeleteLoan = ({ id }: { id: string }) => {
    const { deleteLoan } = useLoans()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = async () => {
        try {
            const res = await fetch(baseUrl + `/loans/${id}`, {
                method: "DELETE",
                credentials: 'include'
            })
            const result = await res.json()
            console.log(result)
            if (result?.success) {
                deleteLoan(id)
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
            >
                <Trash size={18} />
            </button>
        </>
    )
}

export default DeleteLoan;