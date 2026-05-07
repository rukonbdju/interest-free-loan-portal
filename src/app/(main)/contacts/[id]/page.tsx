'use client';

import React from "react";
import { User, Phone, Mail, MapPin, FilePenLine, List, Hash, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/date-format";
import { useParams } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";
import { Contact } from "@/types";
import PaymentHistory from "@/components/contacts/payment-history";
import LoanHistory from "@/components/contacts/loan-history";

const ContactDetailsPage = () => {
    const params = useParams();
    const { data: contact, loading } = useFetchData<Contact>(`/contacts/${params.id}`);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen pb-20 bg-slate-50/30">
            <div className="mx-auto w-full max-w-7xl">
                {/* Top Navigation & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <Link href="/contacts" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors mb-4 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Contacts
                        </Link>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Contact Profile</h1>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Link 
                            href={`/contacts/${params.id}/edit`} 
                            className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-gray-500"
                        >
                            <FilePenLine size={20} />
                        </Link>
                        <Link 
                            href={'/contacts'} 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                        >
                            <List size={18} className="stroke-[3]" />
                            View Directory
                        </Link>
                    </div>
                </div>

                {/* Profile Identity Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/20 border border-white overflow-hidden relative mb-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-40"></div>
                    
                    <div className="p-8 md:p-12 relative z-10">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
                            {/* Avatar Section */}
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-indigo-200 border-4 border-white">
                                {contact?.name?.charAt(0)}
                            </div>

                            {/* Name & Basic Info */}
                            <div className="flex-1 text-center md:text-left pt-2">
                                <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-3">{contact?.name}</h2>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <Badge icon={<Hash size={14} />} text={contact?.contactId || ""} />
                                    <Badge icon={<Calendar size={14} />} text={`Member since ${formatDate(contact?.createdAt || "")}`} />
                                </div>
                                
                                {/* Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                                    <InfoField 
                                        icon={<Phone size={18} />} 
                                        label="Phone Number" 
                                        value={contact?.phone || "N/A"} 
                                    />
                                    <InfoField 
                                        icon={<Mail size={18} />} 
                                        label="Email Address" 
                                        value={contact?.email || "No email provided"} 
                                    />
                                    <InfoField 
                                        icon={<MapPin size={18} />} 
                                        label="Primary Address" 
                                        value={contact?.address || "No address on file"} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Sections */}
                <div className="grid grid-cols-1 gap-10">
                    <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl p-8">
                        {params.id && <LoanHistory id={params.id?.toString()} />}
                    </div>
                    <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl p-8">
                        {params.id && <PaymentHistory id={params.id?.toString()} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Badge = ({ icon, text }: { icon: any, text: string }) => (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-xl text-xs font-bold text-gray-500 uppercase tracking-wider">
        {icon}
        {text}
    </div>
);

const InfoField = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-start gap-4 p-5 bg-slate-50/50 rounded-3xl border border-white group hover:bg-white hover:shadow-lg transition-all duration-300">
        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-gray-50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-bold text-gray-800 leading-relaxed">{value}</p>
        </div>
    </div>
);

export default ContactDetailsPage;
