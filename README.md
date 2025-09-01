# Interest-Free Loan App (Qard Hasan)

This is a community-driven platform that connects Muslims for **interest-free loans (Qard Hasan)**. The app allows multiple lenders to fund a single borrower’s request while ensuring transparency, trust, and Shariah compliance.  

---

## 🌙 Table of Contents
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [User Roles](#user-roles)  
4. [Functional Requirements](#functional-requirements)  
5. [Money Transfer Workflow](#money-transfer-workflow)  
6. [Tech Stack](#tech-stack)  

---

## Project Overview
This app connects borrowers and lenders within the Muslim community to facilitate **interest-free lending**. The platform builds trust using **verification, guarantors, and reputation scoring**.  

The app is designed for transparency, fairness, and scalability, allowing **multi-lender funding** without central funds.

---

## Features
- Borrowers can request loans with purpose, amount, and repayment schedule.  
- Lenders can fund requests partially or fully.  
- Auto-generated **Qard Hasan contracts** for each loan.  
- Repayment tracking and notifications.  
- Trust and verification system (KYC, guarantors, mosque endorsements).  
- Dashboard for borrowers and lenders.  
- Dispute resolution system.  
- Islamic guidance and motivational reminders.  

---

## User Roles

### Borrower
- Submit loan requests  
- Track repayment schedule  
- Receive reminders and notifications  
- Request rescheduling (with lender approval)  
- Option to mark part of the loan as forgiven (sadaqah)  

### Lender
- Browse loan requests  
- Fund loan partially or fully  
- Sign digital contracts  
- Track repayments and rate borrowers  

### Admin
- Verify users and approve requests  
- Manage disputes  
- Monitor system metrics and generate reports  

---

## Functional Requirements

### User Management
- Registration with name, email, phone, password  
- KYC verification (ID upload, phone OTP)  
- Borrower/Lender/Both role selection  

### Loan Management
- Multiple lenders can fund a single request  
- 100% funding required before loan activation  
- Auto-generate Shariah-compliant contract  
- Track repayment installments  
- Partial repayment distribution among lenders  

### Trust & Verification
- Borrower verification badges: ✅ID verified, 🕌 Community endorsed, ⭐ Good borrower  
- Reputation system based on repayment history  
- Optional guarantor for large loans  

### Notifications
- Loan submitted, funded, contract ready  
- Payment due & missed notifications  
- Motivational Islamic reminders  

### Dashboard & Reporting
- Borrower: active loans, repayment progress  
- Lender: total funded, repayments, outstanding  
- Admin: user and loan management, dispute resolution  

### Dispute Handling
- Borrower can request rescheduling  
- Lender can flag non-repayment  
- Admin can intervene for resolution  

### Islamic Compliance
- No interest  
- Repayment = principal only  
- Mercy options: loan forgiveness / reschedule  
- Integration with zakat/sadaqah optional  

---

## Money Transfer Workflow

1. Borrower submits loan request  
2. Community lenders pledge amounts (multi-lender)  
3. Loan request reaches **100% funding**  
4. Digital contract generated & signed by borrower + lenders  
5. Lenders transfer money **directly to borrower** (bank/mobile wallet)  
6. Repayment tracked & reminders sent  
7. Repayments proportionally split to each lender  
8. Optional forgiveness/rescheduling if borrower struggles  

---

## Tech Stack
- **Frontend:** Next.js+TailwindCSS  
- **Backend:** Express (API)  
- **Database:** MongoDB  
- **Authentication:** JWT   
- **Notifications:** Push / Email / SMS  

---

Building a trusted community for **interest-free loans**, guided by Islamic principles and the spirit of Qard Hasan.  
