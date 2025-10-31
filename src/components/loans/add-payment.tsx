import { useEffect, useState } from "react";
import Modal from "../shared/modal";
import { Calendar, DollarSign, Plus, PlusCircle, Wallet } from "lucide-react";
import { InputField, SelectField } from "../shared/input-field";
import { Button } from "../shared/button";
import { formatDate } from "@/utils/date-format";
import { useAuth } from "@/contexts/auth-context";
import AlertBox from "../shared/alert";
import { baseUrl } from "@/utils/api-url";
import { useLoanPayment } from "@/contexts/loan-payment-context";

const AddPayment = () => {
    const { user } = useAuth()
    const { loan, addNewPayment, remainingBalance } = useLoanPayment()
    const [alert, setAlert] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const [formData, setFormData] = useState({
        paymentDate: formatDate(Date().toString(), 'YYYY-MM-DD'),
        paymentMethod: '',
        paymentAmount: remainingBalance
    })

    console.log(formData.paymentAmount)
    useEffect(() => {
        setFormData(prev => ({ ...prev, paymentAmount: remainingBalance }))
    }, [remainingBalance])

    const handleClose = () => {
        setIsOpen(false)
        setFormData({
            paymentDate: formatDate(Date().toString(), 'YYYY-MM-DD'),
            paymentMethod: '',
            paymentAmount: remainingBalance
        })
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
                addNewPayment(result.data)
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
            <Button disabled={remainingBalance === 0} onClick={() => setIsOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                <PlusCircle size={18} />
                Add Payment
            </Button>
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
                        min={0}
                        max={remainingBalance}
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
                        <Button disabled={loading || Number(formData.paymentAmount) === 0} icon={<Plus size={18} />} type="submit">Add</Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddPayment;