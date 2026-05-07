"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
    User, SendHorizonal, DollarSign, Calendar, Search, 
    ChevronRight, ChevronLeft, FileText, Download, CheckCircle2,
    Coins, ListOrdered, Quote
} from "lucide-react";
import { InputField, SelectField } from "../shared/input-field";
import { baseUrl } from "@/utils/api-url";
import { Button } from "../shared/button";
import AlertBox from "../shared/alert";
import { useAuth } from "@/contexts/auth-context";
import { Contact } from "@/types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// --- AGREEMENT CONTENT ---
const AGREEMENT_TITLE = "(ইসলামী মূল্যবোধের আলোকে একটি সুদমুক্ত সাহায্যকারী ঋণচুক্তি)";
const VERSE_1 = "“কে আছে যে আল্লাহকে উত্তম ঋণ দিবে, যাতে আল্লাহ তা বহুগুণে বৃদ্ধি করেন?” — সূরা বাকারা (২:২৪৫)";
const VERSE_2 = "“হে মুমিনগণ! তোমরা যখন নির্দিষ্ট মেয়াদের জন্য ঋণ লেনদেন করো, তখন তা লিখে রাখো। একজন লেখক তোমাদের মধ্যে ন্যায়সঙ্গতভাবে লিখে দিক। লেখক যেন আল্লাহ তাকে যা শিক্ষা দিয়েছেন, তা লিখতে অস্বীকার না করে লেখেন। যার দায় সে লেখাবে, এবং সে যেন আল্লাহকে ভয় করে এবং কিছু বাদ না দেয়……….” — সূরা বাকারা (২:২৮২)";

export const CreateLoan: React.FC = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const agreementRef = useRef<HTMLDivElement>(null);
    
    // Contact Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searching, setSearching] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    // Form Data
    const [formData, setFormData] = useState({
        amount: "",
        currency: "BDT",
        loanType: "one-time" as "one-time" | "installment",
        installments: "1",
        disbursementDate: new Date().toISOString().split('T')[0],
        disbursementMethod: "Cash",
        dueDate: "",
    });

    const [createdLoan, setCreatedLoan] = useState<any>(null);

    const handleSearch = useCallback(async (query: string) => {
        if (!user?._id) return;
        setSearching(true);
        try {
            const res = await fetch(`${baseUrl}/contacts/creator/${user._id}?search=${query}`, {
                credentials: 'include'
            });
            const result = await res.json();
            if (result.success) {
                setContacts(result.contacts);
            }
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setSearching(false);
        }
    }, [user?._id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length >= 2) handleSearch(searchQuery);
            else if (searchQuery.length === 0) setContacts([]);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, handleSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedContact) return;
        
        setLoading(true);
        setAlert({ type: '', message: '' });
        try {
            const payload = {
                ...formData,
                contact: selectedContact._id,
                amount: Number(formData.amount),
                installments: Number(formData.installments),
                createdBy: user?._id
            };

            const res = await fetch(baseUrl + '/loans', {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (result.success) {
                setCreatedLoan(result.data);
                setStep(3);
            } else {
                setAlert({ type: 'error', message: result?.message || 'Something went wrong!' });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to connect to server' });
        } finally {
            setLoading(false);
        }
    };

    const downloadAgreement = async () => {
        if (!agreementRef.current || !createdLoan) return;
        
        setLoading(true);
        try {
            const canvas = await html2canvas(agreementRef.current, {
                scale: 2,
                logging: false,
                useCORS: true,
                backgroundColor: "#ffffff"
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Loan_Agreement_${createdLoan.loanId}.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
            setAlert({ type: 'error', message: "Failed to generate PDF. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-2 font-sans">
            {alert.message && <AlertBox type={alert.type as any} message={alert.message} />}
            
            {/* Steps Indicator */}
            <div className="flex items-center justify-center mb-8 px-4">
                {[0, 1, 2, 3].map((s) => (
                    <React.Fragment key={s}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                            step >= s ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-200 text-gray-400'
                        }`}>
                            {s === 3 ? <CheckCircle2 size={20} /> : s + 1}
                        </div>
                        {s < 3 && (
                            <div className={`flex-1 h-1 mx-2 rounded-full ${
                                step > s ? 'bg-indigo-600' : 'bg-gray-100'
                            }`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Step 1: Search Contact */}
                {step === 0 && (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Borrower</h2>
                        <p className="text-gray-500 mb-6">Search for a contact by name, email, or phone number.</p>
                        
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text"
                                placeholder="Start typing name, phone or email..."
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="space-y-3 min-h-[300px]">
                            {searching ? (
                                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-500" /></div>
                            ) : contacts.length > 0 ? (
                                contacts.map(c => (
                                    <button
                                        key={c._id}
                                        onClick={() => {
                                            setSelectedContact(c);
                                            setStep(1);
                                        }}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                            selectedContact?._id === c._id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                                                {c.name.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-gray-900">{c.name}</h3>
                                                <p className="text-sm text-gray-500">{c.phone} • {c.contactId}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="text-gray-400" />
                                    </button>
                                ))
                            ) : searchQuery.length >= 2 ? (
                                <div className="text-center py-10 text-gray-500 italic">No contacts found.</div>
                            ) : (
                                <div className="text-center py-10 text-gray-400">Search results will appear here...</div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 2: Loan Details */}
                {step === 1 && (
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
                                <p className="text-gray-500">Configure terms for <span className="text-indigo-600 font-semibold">{selectedContact?.name}</span></p>
                            </div>
                            <button onClick={() => setStep(0)} className="text-sm text-indigo-600 hover:underline">Change Contact</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <InputField icon={<DollarSign size={18} />} label="Amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required />
                                <SelectField icon={<Coins size={18} />} label="Currency" name="currency" value={formData.currency} onChange={handleChange}>
                                    <option value="BDT">BDT</option>
                                    <option value="USD">USD</option>
                                </SelectField>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
                                    <button type="button" onClick={() => setFormData({...formData, loanType: 'one-time'})} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${formData.loanType === 'one-time' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}>One-time</button>
                                    <button type="button" onClick={() => setFormData({...formData, loanType: 'installment'})} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${formData.loanType === 'installment' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}>Installment</button>
                                </div>
                                {formData.loanType === 'installment' && (
                                    <InputField icon={<ListOrdered size={18} />} label="Installments (Months)" name="installments" type="number" min="1" value={formData.installments} onChange={handleChange} />
                                )}
                            </div>

                            <div className="space-y-4">
                                <InputField icon={<Calendar size={18} />} label="Disbursement Date" name="disbursementDate" type="date" value={formData.disbursementDate} onChange={handleChange} />
                                <SelectField icon={<FileText size={18} />} label="Disbursement Method" name="disbursementMethod" value={formData.disbursementMethod} onChange={handleChange}>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Online">Online</option>
                                </SelectField>
                            </div>

                            <div className="space-y-4">
                                <InputField icon={<Calendar size={18} />} label="Final Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="flex justify-between mt-10">
                            <Button type="button" onClick={() => setStep(0)} variant="secondary" icon={<ChevronLeft size={18} />}>Back</Button>
                            <Button type="button" onClick={() => setStep(2)} icon={<ChevronRight size={18} />} disabled={!formData.amount || !formData.dueDate}>Review Summary</Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Summary & Preview */}
                {step === 2 && (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Loan Summary</h2>
                        
                        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 mb-8 text-center">
                            <p className="text-indigo-800 text-sm italic mb-2 font-bold">{VERSE_1}</p>
                            <p className="text-indigo-800 text-xs italic opacity-80">{VERSE_2}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Borrower</p>
                                <p className="font-bold text-lg text-gray-900">{selectedContact?.name}</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Total Amount</p>
                                <p className="font-bold text-2xl text-indigo-600">{formData.currency} {formData.amount}</p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button type="button" onClick={() => setStep(1)} variant="secondary" icon={<ChevronLeft size={18} />}>Edit Terms</Button>
                            <Button onClick={handleSubmit} disabled={loading} icon={loading ? <Loader2 className="animate-spin" /> : <SendHorizonal size={18} />}>
                                {loading ? 'Creating Loan...' : 'Confirm & Create Loan'}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 4: Success & Download */}
                {step === 3 && createdLoan && (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Loan Recorded!</h2>
                        <p className="text-gray-500 mb-10 text-lg font-medium">Loan ID: <span className="text-indigo-600 font-bold">{createdLoan.loanId}</span></p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={downloadAgreement}
                                disabled={loading}
                                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
                                Download PDF Agreement
                            </button>
                            <button onClick={() => window.location.reload()} className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all">Create Another</button>
                        </div>

                        {/* SIMPLE AGREEMENT TEMPLATE FOR PDF */}
                        <div className="fixed left-[-9999px] top-0">
                            <div ref={agreementRef} style={{ width: '800px', padding: '40px', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'serif', lineHeight: '1.4' }}>
                                <div style={{ textAlign: 'center', borderBottom: '1px solid #000000', paddingBottom: '15px', marginBottom: '20px' }}>
                                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>LOAN AGREEMENT</h1>
                                    <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{AGREEMENT_TITLE}</p>
                                    <p style={{ fontSize: '13px', marginTop: '10px' }}>Loan ID: {createdLoan.loanId} | Date: {new Date().toLocaleDateString()}</p>
                                </div>

                                <div style={{ marginBottom: '25px', textAlign: 'center', padding: '15px', border: '1px solid #000000' }}>
                                    <p style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>{VERSE_1}</p>
                                    <p style={{ fontSize: '13px', lineHeight: '1.5' }}>{VERSE_2}</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                    <div style={{ border: '1px solid #000000', padding: '15px', textAlign: 'center' }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '10px', borderBottom: '1px solid #000000', paddingBottom: '4px', display: 'inline-block', width: '80%' }}>LENDER</p>
                                        <p style={{ fontWeight: 'bold', marginTop: '5px' }}>{user?.name || "The Principal User"}</p>
                                        <p style={{ fontSize: '13px' }}>{user?.email}</p>
                                    </div>
                                    <div style={{ border: '1px solid #000000', padding: '15px', textAlign: 'center' }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '10px', borderBottom: '1px solid #000000', paddingBottom: '4px', display: 'inline-block', width: '80%' }}>BORROWER</p>
                                        <p style={{ fontWeight: 'bold', marginTop: '5px' }}>{selectedContact?.name}</p>
                                        <p style={{ fontSize: '13px' }}>{selectedContact?.phone}</p>
                                        <p style={{ fontSize: '13px' }}>{selectedContact?.email || "N/A"}</p>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #000000', paddingBottom: '2px', textTransform: 'uppercase' }}>Loan Details</span>
                                    </div>
                                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr style={{ borderBottom: '1px solid #eeeeee' }}><td style={{ padding: '8px 0' }}>Principal Amount</td><td style={{ padding: '8px 0', fontWeight: 'bold' }}>{formData.currency} {formData.amount}</td></tr>
                                            <tr style={{ borderBottom: '1px solid #eeeeee' }}><td style={{ padding: '8px 0' }}>Repayment Type</td><td style={{ padding: '8px 0', fontWeight: 'bold' }}>{formData.loanType.toUpperCase()}</td></tr>
                                            {formData.loanType === 'installment' && (
                                                <tr style={{ borderBottom: '1px solid #eeeeee' }}><td style={{ padding: '8px 0' }}>Installments</td><td style={{ padding: '8px 0', fontWeight: 'bold' }}>{formData.installments} Months</td></tr>
                                            )}
                                            <tr style={{ borderBottom: '1px solid #eeeeee' }}><td style={{ padding: '8px 0' }}>Method</td><td style={{ padding: '8px 0', fontWeight: 'bold' }}>{formData.disbursementMethod}</td></tr>
                                            <tr><td style={{ padding: '8px 0' }}>Due Date</td><td style={{ padding: '8px 0', fontWeight: 'bold', color: '#ff0000' }}>{formData.dueDate}</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div style={{ marginBottom: '40px', fontSize: '13px', color: '#333333' }}>
                                    <p>1. The Borrower acknowledges receipt of the amount and agrees to repay as stated above.</p>
                                    <p>2. This is an interest-free (Qard al-Hasan) loan for mutual help.</p>
                                    <p>3. This document is a binding record of the transaction.</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '40px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ borderBottom: '1px solid #000000', height: '40px', marginBottom: '5px' }}></div>
                                        <p style={{ fontWeight: 'bold', fontSize: '11px' }}>Lender Signature</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ borderBottom: '1px solid #000000', height: '40px', marginBottom: '5px' }}></div>
                                        <p style={{ fontWeight: 'bold', fontSize: '11px' }}>Borrower Signature</p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ borderBottom: '1px solid #888888', height: '30px', marginBottom: '5px' }}></div>
                                        <p style={{ fontSize: '10px' }}>Witness 1 Signature & Name</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ borderBottom: '1px solid #888888', height: '30px', marginBottom: '5px' }}></div>
                                        <p style={{ fontSize: '10px' }}>Witness 2 Signature & Name</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Loader2 = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-loader-2 ${className}`}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);
