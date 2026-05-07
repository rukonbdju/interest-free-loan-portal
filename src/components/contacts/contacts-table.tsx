'use client';
import React, { useState, useEffect } from "react";
import { Eye, Pencil, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import DeleteContact from "./delete-contact";
import { useContacts } from "@/contexts/contact-context";
import Pagination from "../shared/pagination";
import Modal from "../shared/modal";
import { EditContactForm } from "./edit-contact";

const ContactsTable = () => {
    const { contacts, total, totalPages, loading, fetchContacts } = useContacts();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);
    
    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<any>(null);

    // Fetch contacts when page, search term, or limit changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchContacts(currentPage, limit, searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [currentPage, searchTerm, limit, fetchContacts]);

    // Reset to page 1 when search term or limit changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, limit]);

    const handleEditClick = (contact: any) => {
        setSelectedContact(contact);
        setIsEditModalOpen(true);
    };

    // Calculate "Showing X to Y of Z" stats
    const startRange = (currentPage - 1) * limit + 1;
    const endRange = Math.min(currentPage * limit, total);

    return (
        <div className="space-y-4">
            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                {selectedContact && (
                    <EditContactForm 
                        contact={selectedContact} 
                        onSuccess={() => setIsEditModalOpen(false)} 
                    />
                )}
            </Modal>

            {/* Top Bar: Search and Limit */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2">
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">View:</span>
                    <div className="relative">
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-4 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-sm transition-all"
                        >
                            <option value={1}>1</option>
                            <option value={8}>8</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white relative min-h-[400px]">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center transition-opacity">
                        <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-blue-600"></div>
                            <span className="text-sm font-medium text-gray-500">Updating list...</span>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Address</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {contacts && contacts.length > 0 ? (
                                contacts.map((contact) => (
                                    <tr key={contact._id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            {contact.contactId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                                            {contact.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                                            {contact.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {contact.email || <span className="text-gray-200 italic text-xs">N/A</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                                            {contact.address}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                            <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <Link
                                                    title='View'
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"
                                                    href={"/contacts/" + contact._id}
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleEditClick(contact)}
                                                    title="Edit"
                                                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <DeleteContact id={contact._id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                                        {loading ? "" : "No contacts match your search."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Bar: Stats and Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-sm text-gray-500 font-medium order-2 sm:order-1">
                    Showing <span className="text-gray-900 font-bold">{total > 0 ? startRange : 0}</span> to <span className="text-gray-900 font-bold">{endRange}</span> of <span className="text-gray-900 font-bold">{total}</span> contacts
                </p>

                <div className="order-1 sm:order-2">
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages || 1}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactsTable;