'use client';
import React, { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { FileText, Save, Download, X, } from 'lucide-react';

// --- TYPE DEFINITIONS as requested ---

interface AgreementDraft {
    id: string;
    borrowerInfo: {
        name: string;
        phone: string;
        address: string;
        nid: string;
    };
    loanInfo: {
        amount: number;
        startDate: string;
        dueDate: string;
        repaymentPlan: 'monthly' | 'quarterly' | 'lump-sum';
    };
    // Simplified for a single rich text editor experience.
    // This holds the entire agreement as an HTML string.
    content: string;
}

interface EditAgreementProps {
    onCancel: () => void;
}

// Extend the window interface for TypeScript to recognize ReactQuill
declare global { interface Window { ReactQuill: undefined; } }


// --- MOCK DATA for demonstration ---

const mockDraft: AgreementDraft = {
    id: 'loan-agr-0012B',
    borrowerInfo: {
        name: 'Alice Johnson',
        phone: '+1-202-555-0189',
        address: '123 Meadow Lane, Springfield, IL 62704',
        nid: '9876543210',
    },
    loanInfo: {
        amount: 5000,
        startDate: '2024-09-01',
        dueDate: '2025-09-01',
        repaymentPlan: 'monthly',
    },
    content: `
    <h1 style="text-align: center;">Interest-Free Loan Agreement</h1>
    <p><br></p>
    <p>This Loan Agreement ("Agreement") is made and entered into as of {{startDate}}, by and between:</p>
    <p><strong>Lender:</strong> [Your Company Name/Your Name]</p>
    <p><strong>Borrower:</strong> <strong class="placeholder">{{borrowerName}}</strong> (NID: <strong class="placeholder">{{borrowerNID}}</strong>)</p>
    <p>Residing at: <strong class="placeholder">{{borrowerAddress}}</strong></p>
    <p><br></p>
    <h2>1. Loan Amount</h2>
    <p>The Lender agrees to lend the Borrower the principal sum of <strong>$<span class="placeholder">{{loanAmount}}</span></strong>.</p>
    <h2>2. Repayment Terms</h2>
    <p>The loan shall be repaid on a <strong class="placeholder">{{repaymentPlan}}</strong> basis, starting from {{startDate}} and concluding by the due date of <strong>{{dueDate}}</strong>.</p>
    <h2>3. Terms and Conditions</h2>
    <ul>
        <li>This is an interest-free loan. No interest will be accrued on the principal amount.</li>
        <li>Late payments may be subject to a penalty as agreed upon separately.</li>
    </ul>
    <h2>4. Custom Clauses</h2>
    <p><em>Add any custom clauses here. This section is fully editable.</em></p>
    <p><br></p>
    <p><br></p>
    <hr>
    <p><strong>Lender's Signature:</strong> _________________________</p>
    <p><br></p>
    <p><strong>Borrower's Signature:</strong> _________________________</p>
  `,
};


// --- The Main Page Component ---

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

