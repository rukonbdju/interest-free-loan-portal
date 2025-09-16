'use client';

import { FileText, List, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef } from 'react';

// Interfaces and types for a structured component, following Next.js/React best practices.
// In a real-world app, these would be in a separate types file.
interface Document {
    id: string;
    fileName: string;
    type: string;
    size: number;
    previewUrl?: string; // For image previews
    file: File;
}

interface BorrowerForm {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    nid: string;
    notes: string;
    documents: Document[];
}

// Main component, exported as 'App' to fit the single-file React component principle.
export default function App() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<Omit<BorrowerForm, 'documents'>>({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        nid: '',
        notes: '',
    });

    const [documents, setDocuments] = useState<Document[]>([]);
    const [formErrors, setFormErrors] = useState<Partial<BorrowerForm>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Document types for the dropdown menu.
    const documentTypes = [
        'NID Front',
        'NID Back',
        'Passport',
        'Utility Bill',
        'Other',
    ];

    // Handles form field changes and updates state.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Validates the form fields.
    const validateForm = () => {
        const errors: Partial<BorrowerForm> = {};
        if (!formData.fullName.trim()) {
            errors.fullName = 'Full Name is required.';
        }
        if (!formData.phone.trim() || !/^\+?[0-9\s()\-]{10,15}$/.test(formData.phone)) {
            errors.phone = 'Phone number is required and must be valid.';
        }
        if (!formData.nid.trim() || !/^\d{10}$/.test(formData.nid.trim())) {
            errors.nid = 'NID is required and must be exactly 10 digits.';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handles file selection via click.
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(Array.from(e.target.files));
        }
    };

    // Handles files from both drag-and-drop and file picker.
    const handleFiles = (files: File[]) => {
        const newDocuments: Document[] = [];
        const currentTotal = documents.length;
        const remainingSpace = 5 - currentTotal;

        if (files.length > remainingSpace) {
            alert(`You can only upload a maximum of 5 files. You have already selected ${currentTotal} files.`);
            return;
        }

        files.forEach(file => {
            const fileId = `${file.name}-${Date.now()}`;
            const fileType = file.type.startsWith('image/') ? 'NID Front' : 'Other'; // Default type
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} is larger than 5MB and will not be uploaded.`);
                return;
            }
            if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                alert(`File ${file.name} has an unsupported format and will not be uploaded.`);
                return;
            }

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newDocuments.push({
                        id: fileId,
                        fileName: file.name,
                        type: fileType,
                        size: file.size,
                        previewUrl: e.target?.result as string,
                        file: file,
                    });
                    setDocuments(prev => [...prev, ...newDocuments]);
                };
                reader.readAsDataURL(file);
            } else {
                newDocuments.push({
                    id: fileId,
                    fileName: file.name,
                    type: fileType,
                    size: file.size,
                    file: file,
                });
                setDocuments(prev => [...prev, ...newDocuments]);
            }
        });
    };

    // Handles drag over events.
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    // Handles drag leave events.
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    // Handles file drop events.
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    // Removes a single document.
    const removeDocument = (id: string) => {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
    };

    // Simulates the save action.
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSaving(true);
        setIsSuccess(false);
        setIsError(false);

        const fullFormData = { ...formData, documents };

        try {
            // This is a placeholder for the actual API call.
            // In a real app, this would be an async function provided as a prop.
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form Data Saved:', fullFormData);
            setIsSuccess(true);
        } catch (error) {
            console.error('Failed to save:', error);
            setIsError(true);
        } finally {
            setIsSaving(false);
            setTimeout(() => {
                setIsSuccess(false);
                setIsError(false);
            }, 3000);
        }
    };

    // Checks if the form is valid to enable the save button.
    const isFormValid = () => {
        return (
            formData.fullName.trim() !== '' &&
            formData.phone.trim() !== '' &&
            /^\d{10}$/.test(formData.nid.trim())
        );
    };

    return (
        <div className="min-h-screen">
            <div className=" w-full overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 gap-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800">
                        Add New Borrower
                    </h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <List size={20} />
                        <Link href={"/borrowers"} className="font-medium">Borrower List</Link>
                    </button>
                </div>

                <form onSubmit={handleSave} className="bg-white rounded-xl p-6 sm:p-8 space-y-8 ">
                    {/* Primary Form Section */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="e.g., John Doe"
                                required
                                aria-required="true"
                                aria-invalid={!!formErrors.fullName}
                                className={`mt-1 block w-full px-4 py-3 rounded-lg border shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-neutral-400 ${formErrors.fullName ? 'border-red-500' : 'border-neutral-300'}`}
                            />
                            {formErrors.fullName && (
                                <p className="mt-1 text-sm text-red-600" id="fullName-error">
                                    {formErrors.fullName}
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="e.g., +8801XXXXXXXXX"
                                required
                                aria-required="true"
                                aria-invalid={!!formErrors.phone}
                                className={`mt-1 block w-full px-4 py-3 rounded-lg border shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-neutral-400 ${formErrors.phone ? 'border-red-500' : 'border-neutral-300'}`}
                            />
                            {formErrors.phone && (
                                <p className="mt-1 text-sm text-red-600" id="phone-error">
                                    {formErrors.phone}
                                </p>
                            )}
                        </div>

                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g., john.doe@example.com"
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-neutral-300 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-neutral-400"
                            />
                        </div>

                        {/* NID */}
                        <div>
                            <label htmlFor="nid" className="block text-sm font-medium text-neutral-700 mb-1">
                                NID (National ID) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    id="nid"
                                    name="nid"
                                    value={formData.nid}
                                    onChange={handleChange}
                                    placeholder="10 digit number"
                                    pattern="\d{10}"
                                    title="NID must be 10 digits"
                                    required
                                    aria-required="true"
                                    aria-describedby="nid-hint"
                                    aria-invalid={!!formErrors.nid}
                                    className={`block w-full px-4 py-3 rounded-lg border shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-neutral-400 ${formErrors.nid ? 'border-red-500' : 'border-neutral-300'}`}
                                />
                            </div>
                            {formErrors.nid && (
                                <p className="mt-1 text-sm text-red-600" id="nid-error">
                                    {formErrors.nid}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                placeholder="e.g., 123 Main Street, Anytown"
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-neutral-300 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-neutral-400"
                            />
                        </div>

                        {/* Notes */}
                        <div className="md:col-span-2">
                            <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">
                                Notes
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Add any relevant notes here..."
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-neutral-300 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-neutral-400"
                            />
                        </div>
                    </section>

                    {/* Documents Upload Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-neutral-800 mb-2">Documents Upload</h2>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`p-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-neutral-300 bg-neutral-50'}`}
                        >
                            <div className="flex flex-col items-center justify-center text-center text-neutral-500">
                                {/* UploadCloud icon from lucide-react */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mb-2"
                                >
                                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                                    <path d="M12 12v9" />
                                    <path d="m16 16-4-4-4 4" />
                                </svg>
                                <p className="text-base font-medium">Drag & drop files here</p>
                                <p className="text-sm">or</p>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-2 px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-100 transition-colors"
                                >
                                    Browse Files
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    multiple
                                    accept=".jpg,.png,.pdf"
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-neutral-500 text-center">
                            Accepted formats: JPG, PNG, PDF | Max 5 files | Max 5MB each.
                        </p>
                    </section>

                    {/* Uploaded Documents Preview */}
                    {documents.length > 0 && (
                        <section className="space-y-4">
                            <h3 className="text-md font-medium text-neutral-700">
                                Uploaded Documents ({documents.length} of 5)
                            </h3>
                            <ul className="space-y-4">
                                {documents.map(doc => (
                                    <li
                                        key={doc.id}
                                        className="bg-neutral-50 p-4 rounded-lg flex items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            {doc.previewUrl ? (
                                                <Image height={64} width={64} src={doc.previewUrl} alt={doc.fileName} className="w-16 h-16 object-cover rounded-lg" />
                                            ) : (
                                                <div className="w-16 h-16 flex items-center justify-center bg-neutral-200 rounded-lg text-neutral-500">
                                                    <FileText className='size-6' />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-neutral-800 truncate">{doc.fileName}</p>
                                                <p className="text-sm text-neutral-500">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={doc.type}
                                                onChange={(e) => {
                                                    const updatedDocs = documents.map(d =>
                                                        d.id === doc.id ? { ...d, type: e.target.value } : d
                                                    );
                                                    setDocuments(updatedDocs);
                                                }}
                                                className="block px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:ring-2 focus:ring-indigo-500"
                                            >
                                                {documentTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => removeDocument(doc.id)}
                                                className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                {/* Trash2 icon from lucide-react */}
                                                <Trash2 className='size-5' />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-neutral-200">
                        <button
                            type="button"
                            className="px-6 py-3 rounded-full text-neutral-700 font-semibold border border-neutral-300 hover:bg-neutral-100 transition-colors"
                            onClick={() => {
                                setFormData({
                                    fullName: '',
                                    phone: '',
                                    email: '',
                                    address: '',
                                    nid: '',
                                    notes: '',
                                });
                                setDocuments([]);
                                setFormErrors({});
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 ${isFormValid() && !isSaving ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'}`}
                            disabled={!isFormValid() || isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Borrower'}
                        </button>
                    </div>
                </form>

                {/* Toast Messages */}
                {isSuccess && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
                        {/* CheckCircle icon from lucide-react */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-8.8" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Borrower added successfully!</span>
                    </div>
                )}
                {isError && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
                        {/* XCircle icon from lucide-react */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" x2="9" y1="9" y2="15" />
                            <line x1="9" x2="15" y1="9" y2="15" />
                        </svg>
                        <span>Failed to add borrower. Please try again.</span>
                    </div>
                )}
            </div>
        </div>
    );
}
