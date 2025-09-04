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