import { useLoanPayment } from "@/contexts/loan-payment-context";
import { formatDate } from "@/utils/date-format";
import { Mail, MapPin, Phone, User } from "lucide-react";

const BorrowerInfoCard = () => {
    const { loan } = useLoanPayment()
    return (
        <div className="bg-white  rounded-xl shadow-md p-6 border border-gray-200 ">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={24} className="text-gray-500 " />
                </div>
                <div className='space-y-1.5'>
                    <div>
                        <p className="font-semibold text-gray-800 ">{loan?.borrower?.name}</p>
                        <p className="text-sm text-gray-500 ">
                            ID: {loan?.borrower?.borrowerId} | Created on {formatDate(loan?.borrower?.createdAt || '')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-600">{loan?.borrower?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-gray-600">{loan?.borrower?.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-gray-600">{loan?.borrower?.address}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BorrowerInfoCard;