export type UserRole = 'borrower' | 'lender' | 'admin';
export interface ActiveLoan {
    id: string;
    totalAmount: number;
    amountPaid: number;
    nextDueDate: string;
    status: 'Pending' | 'Funding' | 'Active' | 'Completed';
}

export interface LoanRequest {
    id: string;
    borrower: {
        name: string;
        reputation: 'Trusted' | 'Good' | 'New';
    };
    purpose: string;
    amountNeeded: number;
    amountFunded: number;
    deadline: string;
}

export interface Loan {
    _id: string;
    loanId: string;
    borrower: Borrower;
    amount: number;
    currency: string;
    disbursementDate: string;
    disbursementMethod: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

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

export type OneTimePlan = {
    dueDate: string;
};

export type InstallmentPlan = {
    numberOfInstallments: string;
    cycle: string;
    firstDueDate: string;
};

export type LoanFormData = {
    borrowerId: string;
    totalAmount: string;
    currency: string;
    disbursementDate: string;
    disbursementMethod: string;
    repaymentPlan: string;
    oneTimePlan: OneTimePlan;
    installmentPlan: InstallmentPlan;
};
