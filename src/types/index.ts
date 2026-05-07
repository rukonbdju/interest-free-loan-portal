export type UserRole = 'contact' | 'lender' | 'admin';

export interface Contact {
    _id: string;
    name: string;
    phone: string;
    email: string;
    contactId: string;
    address: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface Loan {
    _id: string;
    loanId: string;
    contact: Contact;
    amount: number;
    currency: string;
    payments: Payment[];
    disbursementDate: string;
    disbursementMethod: string;
    dueDate: string;
    loanType: 'one-time' | 'installment';
    installments: number;
    createdAt: string;
    updatedAt: string;
}

export interface Payment {
    _id: string;
    loan: Loan;
    contact: Contact;
    paymentAmount: number;
    paymentMethod: string;
    paymentDate: string;
    createdAt: string;
    updatedAt: string;
}

export type LoanFormData = {
    contactId: string;
    totalAmount: string;
    currency: string;
    disbursementDate: string;
    disbursementMethod: string;
    repaymentPlan: string;
};
