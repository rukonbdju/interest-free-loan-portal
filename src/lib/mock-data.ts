import { Loan } from "@/types";


// Dummy data for demonstration purposes, now typed with the Loan interface.
export const MOCK_LOANS: Loan[] = [
    {
        id: 'L001',
        borrower: 'John Doe',
        amount: 500.00,
        startDate: '2023-01-15',
        dueDate: '2023-03-15',
        status: 'Active',
        remainingBalance: 300.00,
    },
    {
        id: 'L002',
        borrower: 'Jane Smith',
        amount: 1200.00,
        startDate: '2022-12-01',
        dueDate: '2023-02-01',
        status: 'Paid',
        remainingBalance: 0.00,
    },
    {
        id: 'L003',
        borrower: 'Peter Jones',
        amount: 750.00,
        startDate: '2023-01-20',
        dueDate: '2023-02-20',
        status: 'Overdue',
        remainingBalance: 750.00,
    },
    {
        id: 'L004',
        borrower: 'Sarah Connor',
        amount: 2500.00,
        startDate: '2023-02-01',
        dueDate: '2023-05-01',
        status: 'Active',
        remainingBalance: 1500.00,
    },
    {
        id: 'L005',
        borrower: 'Michael Vance',
        amount: 900.00,
        startDate: '2023-01-10',
        dueDate: '2023-03-10',
        status: 'Paid',
        remainingBalance: 0.00,
    },
];