'use client';
import React, { useState } from 'react';
import type { FC } from 'react';
import { FileText, Save, Download, X, } from 'lucide-react';

interface EditAgreementProps {
    onCancel: () => void;
}



const EditAgreementPage: FC<EditAgreementProps> = ({ onCancel }) => {

    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        setIsSaving(false);
    };

    const handleGeneratePDF = async () => {
        setIsGenerating(true);
        setIsGenerating(false);
    };

    return (
        <>
            <div className="">
                <div className="w-full mx-auto">
                    {/* Header and Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                                <FileText className="text-blue-600" size={32} />
                                Edit Loan Agreement Draft
                            </h1>
                            <p className="text-slate-500 mt-1">
                                Loan ID: <span className="font-semibold text-slate-600">{123}</span> | Borrower: <span className="font-semibold text-slate-600">Rukon</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={onCancel} className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors duration-200">
                                <X size={18} /> Cancel
                            </button>
                            <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-wait">
                                <Save size={18} /> {isSaving ? 'Saving...' : 'Save Draft'}
                            </button>
                            <button onClick={handleGeneratePDF} disabled={isGenerating} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-green-300 disabled:cursor-wait">
                                <Download size={18} /> {isGenerating ? 'Generating...' : 'Generate PDF'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default function App() {

    const handleCancel = () => {
        console.log("Cancelled");
    };

    return (
        <div>
            <EditAgreementPage
                onCancel={handleCancel}
            />
        </div>
    );
}

