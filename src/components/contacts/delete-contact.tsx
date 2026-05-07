'use client'
import { useState } from "react";
import DeleteConfirmationModal from "../shared/delete-modal"
import { Trash } from "lucide-react";
import { baseUrl } from "@/utils/api-url";
import { useContacts } from "@/contexts/contact-context";

const DeleteContact = ({ id }: { id: string }) => {
    const { deleteContact } = useContacts()
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleDelete = async () => {
        try {
            const res = await fetch(baseUrl + `/contacts/${id}`, {
                method: "DELETE",
                credentials: 'include'
            })
            const result = await res.json()
            if (result?.success) {
                deleteContact(id)
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                title="Delete"
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
            >
                <Trash size={18} />
            </button>

            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Contact"
                description="Are you sure you want to delete this contact? This action cannot be undone and will also delete all associated loans and payments."
            />
        </>
    );
};

export default DeleteContact;