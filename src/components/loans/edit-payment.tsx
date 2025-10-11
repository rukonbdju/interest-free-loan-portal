import { useMemo, useState } from "react";
import Modal from "../shared/modal";
import { Calendar, DollarSign, Edit, Plus, Wallet } from "lucide-react";
import { InputField, SelectField } from "../shared/input-field";
import { Button } from "../shared/button";
import { formatDate } from "@/utils/date-format";
import { useAuth } from "@/contexts/auth-context";
import AlertBox from "../shared/alert";
import { baseUrl } from "@/utils/api-url";
import { useLoanPayment } from "@/contexts/loan-payment-context";

const EditPayment = ({ id }: { id: string }) => {
    const { user } = useAuth()
    const { loan, updatePayment } = useLoanPayment()
    const [alert, setAlert] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const payment = useMemo(() => {
        const totalPaid = loan?.payments.reduce((total, payment) => total + payment.paymentAmount, 0) || 0
        const remainingBalance = loan?.amount ? loan.amount - totalPaid : 0;
        const paymentData = loan?.payments.find(item => item._id === id)
        return { ...paymentData, remainingBalance }
    }, [loan, id])

    const [formData, setFormData] = useState({
        paymentDate: formatDate(payment.paymentDate || ''),
        paymentMethod: payment?.paymentMethod,
        paymentAmount: payment.remainingBalance
    })

    const handleClose = () => {
        setIsOpen(false)
        setAlert({ type: '', message: '' })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            console.log(formData)
            const res = await fetch(baseUrl + '/payments', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ ...formData, borrower: loan?.borrower._id, loan: loan?._id, createdBy: user?._id })
            })
            const result = await res.json()
            if (result.success) {
                setAlert({ type: '', message: '' })
                updatePayment(result.data)
                setIsOpen(false)
            }
            if (!result?.success) {
                setAlert({ type: 'error', message: result?.message || "Something went wrong, try again." })
            }
            console.log(result);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <button onClick={() => setIsOpen(true)} className="cursor-pointer hover:text-blue-500">
                <Edit size={18} />
            </button>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <h1 className="text-2xl font-semibold mb-3">Payment</h1>
                {(alert.message && alert.type) && <AlertBox type={alert.type as 'info' | 'error' | 'warning' | 'success'} message={alert.message} />}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <InputField
                        required={true}
                        onChange={handleChange}
                        value={formData.paymentDate}
                        max={formatDate(Date().toString(), 'YYYY-MM-DD')}
                        icon={<Calendar size={16} />}
                        label="Date"
                        name="paymentDate"
                        type="date" />
                    <InputField
                        required={true}
                        onChange={handleChange}
                        icon={<DollarSign size={16} />}
                        label="Amount"
                        name="paymentAmount"
                        type="number"
                        value={formData.paymentAmount}
                        max={payment.remainingBalance}
                    />
                    <SelectField
                        required={true}
                        onChange={handleChange}
                        icon={<Wallet size={16} />}
                        name="paymentMethod"
                        label="Payment Method">
                        <option value="">Select payment method</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank</option>
                        <option value="Online">Online</option>
                    </SelectField>
                    <div className="flex justify-end">
                        <Button disabled={loading} icon={<Plus size={18} />} type="submit">Edit</Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EditPayment;