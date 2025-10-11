'use client'
import { useState } from "react";
import DeleteConfirmationModal from "../shared/delete-modal"
import { Trash, } from "lucide-react";
import { baseUrl } from "@/utils/api-url";
import { useLoanPayment } from "@/contexts/loan-payment-context";

const DeletePayment = ({ id }: { id: string }) => {
    const { deletePayment } = useLoanPayment()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = async () => {
        try {
            const res = await fetch(baseUrl + `/payments/${id}`, {
                method: "DELETE",
                credentials: 'include'
            })
            const result = await res.json()
            console.log(result)
            if (result?.success) {
                deletePayment(id)
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
                description="You're about to permanently delete this item. Are you absolutely sure?"
            />

            <button
                onClick={() => setIsModalOpen(true)}
                title="Delete"
            >
                <Trash size={18} className="hover:text-red-500 cursor-pointer" />
            </button>
        </>
    )
}

export default DeletePayment;