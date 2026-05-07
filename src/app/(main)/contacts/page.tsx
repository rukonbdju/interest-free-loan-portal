'use client'
import React, { useState } from 'react';
import ContactsTable from '@/components/contacts/contacts-table';
import { Button } from '@/components/shared/button';
import { ContactProvider } from '@/contexts/contact-context';
import { Plus } from 'lucide-react';
import Modal from '@/components/shared/modal';
import { CreateContactForm } from '@/components/contacts/add-contact';

const ContactsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ContactProvider>
            <div className="min-h-screen">
                <div className="w-full mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Contact Directory</h1>
                            <p className="text-gray-500 mt-1 font-medium">Manage and organize your contacts list.</p>
                        </div>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            icon={<Plus size={20} />}
                        >
                            Add New Contact
                        </Button>
                    </div>

                    {/* Card Container */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <ContactsTable />
                    </div>
                </div>

                {/* Add Contact Modal */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <CreateContactForm onSuccess={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </ContactProvider>
    );
};

export default ContactsPage;
