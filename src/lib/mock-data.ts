export interface Borrower {
    id: string;
    name: string;
    phone: string;
    totalLoansTaken: number;
    activeLoans: number;
    outstandingBalance: number;
    status: 'Active' | 'Overdue';
}

// Mock data to simulate a fetch from a database
export const MOCK_BORROWERS: Borrower[] = [
    {
        id: 'B001',
        name: 'Jane Doe',
        phone: '123-456-7890',
        totalLoansTaken: 5,
        activeLoans: 2,
        outstandingBalance: 1500,
        status: 'Active',
    },
    {
        id: 'B002',
        name: 'John Smith',
        phone: '987-654-3210',
        totalLoansTaken: 1,
        activeLoans: 1,
        outstandingBalance: 750,
        status: 'Overdue',
    },
    {
        id: 'B003',
        name: 'Sarah Connor',
        phone: '555-123-4567',
        totalLoansTaken: 12,
        activeLoans: 3,
        outstandingBalance: 3200,
        status: 'Active',
    },
    {
        id: 'B004',
        name: 'Michael Jordan',
        phone: '111-222-3333',
        totalLoansTaken: 8,
        activeLoans: 1,
        outstandingBalance: 500,
        status: 'Overdue',
    },
    {
        id: 'B005',
        name: 'Emily White',
        phone: '444-555-6666',
        totalLoansTaken: 3,
        activeLoans: 1,
        outstandingBalance: 900,
        status: 'Active',
    },
    {
        id: 'B006',
        name: 'David Brown',
        phone: '777-888-9999',
        totalLoansTaken: 6,
        activeLoans: 2,
        outstandingBalance: 1800,
        status: 'Active',
    },
    {
        id: 'B007',
        name: 'Olivia Davis',
        phone: '222-333-4444',
        totalLoansTaken: 2,
        activeLoans: 1,
        outstandingBalance: 250,
        status: 'Overdue',
    },
];