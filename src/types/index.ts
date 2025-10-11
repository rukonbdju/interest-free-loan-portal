export type UserRole = 'borrower' | 'lender' | 'admin';

export interface Borrower {
    _id: string;
    name: string;
    phone: string;
    email: string;
    borrowerId: string;
    address: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface Loan {
    _id: string;
    loanId: string;
    borrower: Borrower;
    amount: number;
    currency: string;
    payments: Payment[];
    disbursementDate: string;
    disbursementMethod: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface Payment {
    _id: string;
    loan: Loan;
    borrower: Borrower;
    paymentAmount: number;
    paymentMethod: string;
    paymentDate: string;
    createdAt: string;
    updatedAt: string;
}


export type LoanFormData = {
    borrowerId: string;
    totalAmount: string;
    currency: string;
    disbursementDate: string;
    disbursementMethod: string;
    repaymentPlan: string;
};
