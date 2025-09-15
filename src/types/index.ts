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
    id: string;
    borrower: string;
    amount: number;
    startDate: string;
    dueDate: string;
    status: 'Active' | 'Paid' | 'Overdue';
    remainingBalance: number;
}

export interface Borrower {
    id: string;
    name: string;
    phone: string;
    totalLoansTaken: number;
    activeLoans: number;
    outstandingBalance: number;
    status: 'Active' | 'Overdue';
}