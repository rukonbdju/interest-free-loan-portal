'use client'
import { useLoanPayment } from "@/contexts/loan-payment-context";
import { User, Phone, Mail, MapPin, Hash } from "lucide-react";

const ContactInfoCard = () => {
    const { loan } = useLoanPayment()
    const contact = loan?.contact;

    if (!contact) return null;

    return (
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-50 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-inner">
                    {contact.name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">{contact.name}</h3>
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest flex items-center gap-1">
                        <Hash size={12} /> {contact.contactId}
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                <DetailRow 
                    icon={<Phone size={18} />} 
                    label="Phone Number" 
                    value={contact.phone} 
                />
                <DetailRow 
                    icon={<Mail size={18} />} 
                    label="Email Address" 
                    value={contact.email || "N/A"} 
                />
                <DetailRow 
                    icon={<MapPin size={18} />} 
                    label="Physical Address" 
                    value={contact.address || "No address provided"} 
                />
            </div>
        </div>
    )
}

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-start gap-4 group">
        <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-800 leading-relaxed">{value}</p>
        </div>
    </div>
);

export default ContactInfoCard;