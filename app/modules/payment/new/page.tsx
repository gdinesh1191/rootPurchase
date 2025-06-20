"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "../../../components/Layout";
import useInputValidation from "@/app/utils/inputValidations";
import DatePicker from "@/app/utils/datepicker";
import { paymentCustomerDetails, paymentTransactionData } from "@/app/JSON";

// Type definitions
interface BankDetails {
  id: number;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface InputProps {
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  "data-validate"?: string;
}

// Form field components for reusability
const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  children,
  className = "",
}) => (
  <div
    className={`mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4 ${className}`}
  >
    <label className="form-label w-1/2">
      {label}
      {required && <span className="form-required text-red-500">*</span>}
    </label>
    <div className="flex flex-col w-3/4">{children}</div>
  </div>
);

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  type = "text",
  className = "",
  ...props
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    className={`form-control ${className}`}
    {...props}
  />
);

export default function NewPayment() {
  const [activeTab, setActiveTab] = useState("details");
const [date, setDate] = useState<Date | undefined>(undefined);

 
  useInputValidation();
  const handleBankChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "accountNumber") {
      const numericValue = value.replace(/[^0-9]/g, "");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submission logic here
  };

  return (
    <Layout pageTitle="Payment New">
      <div className="min-h-screen">
        <main id="main-content" className="flex-1">
          <div className="flex-1 overflow-y-auto h-[calc(100vh-103px)]">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-6">
                <div className="space-y-6 lg:border-r lg:border-gray-300 lg:pr-4">
                  {/* Trader Info Block */}
                  <div className="bg-white rounded-lg border border-gray-200 p-2">
                    <h2 className="text-base font-semibold text-blue-600 mb-3 border-b border-gray-200 pb-1">
                      Trader’s Information
                    </h2>

                    <FormField label="Date" required>
                      <DatePicker
                    id="date"
                    name="date"
                    placeholder="Select date"
                    selected={date}
                    onChange={setDate}
                    // Max date for "From Date" is "To Date" (if set), otherwise no max.
                   
                    className="w-full"
                  />
                    </FormField>

                    <FormField label="Trader's Name" required>
                      <Input
                        name="traderName"
                        placeholder="Enter Trader's Name"
                        className="capitalize"
                        data-validate="required"
                      />
                    </FormField>

                    <FormField label="Amount" required>
                      <Input
                        name="amount"
                        placeholder="Enter Amount"
                        className="number_with_decimal"
                        data-validate="required"
                      />
                    </FormField>

                    <FormField label="Remarks" className="!mb-1">
                      <textarea
                        name="remarks"
                        id="remarks"
                        placeholder="Enter Remarks"
                        className="form-control capitalize h-[80px]"
                        data-validate="required"
                      ></textarea>
                    </FormField>
                  </div>

                  {/* Bank Details Block */}
                  <div className="bg-white rounded-lg border border-gray-200 p-2">
                    <h2 className="text-base font-semibold text-green-600 mb-3 border-b border-gray-200 pb-1">
                      Bank Details
                    </h2>

                    <FormField label="Account Number" required>
                      <Input
                        name="accountNumber"
                        type="text"
                        onChange={handleBankChange}
                        className="only_number"
                        placeholder="Enter Account Number"
                        data-validate="required"
                      />
                    </FormField>

                    <FormField label="IFSC Code" required>
                      <Input
                        name="ifscCode"
                        type="text"
                        onChange={handleBankChange}
                        placeholder="Enter IFSC Code"
                        data-validate="required"
                        className="alphanumeric"
                      />
                    </FormField>

                    <FormField label="Bank Name" required>
                      <Input
                        name="bankName"
                        type="text"
                        onChange={handleBankChange}
                        placeholder="Enter Bank Name"
                        className="capitalize"
                        data-validate="required"
                      />
                    </FormField>

                    <FormField label="Branch Name" required className="!mb-1">
                      <Input
                        name="branchName"
                        type="text"
                        onChange={handleBankChange}
                        placeholder="Enter Branch Name"
                        className="capitalize"
                        data-validate="required"
                      />
                    </FormField>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-[535px] overflow-hidden shadow-lg rounded-b-lg">
                    {/* Navigation Tabs */}
                    <ul className="nav nav-tabs bg-white  flex ">
                      <li className="nav-item text-sm mr-1">
                        <button
                          className={`nav-link px-4 py-2 font-medium transition-colors ${
                            activeTab === "details"
                              ? "text-[#fff] bg-green-600"
                              : "text-[#009333] bg-green-50"
                          }`}
                          onClick={() => setActiveTab("details")}
                        >
                          Trader's Information
                        </button>
                      </li>
                      <li className="nav-item text-sm mr-1">
                        <button
                          className={`nav-link px-4 py-2 font-medium transition-colors ${
                            activeTab === "transactions"
                              ? "text-[#fff] bg-green-600"
                              : "text-[#009333] bg-green-50"
                          }`}
                          onClick={() => setActiveTab("transactions")}
                        >
                          Transactions
                        </button>
                      </li>
                    </ul>

                    {/* Tab Content */}
                    <div className="tab-content p-2 h-full bg-white">
                      {/* Customer Details Tab */}
                      {activeTab === "details" && (
                        <div className="tab-pane fade show active h-[475px]">
                          <div className="customer-details overflow-auto h-full">
                            {paymentCustomerDetails.map((detail, index) => (
                              <div
                                key={index}
                                className="detail-row flex items-center text-sm py-2 border-b border-gray-100"
                              >
                                <span className="detail-label font-bold text-gray-500 w-48">
                                  {detail.label}
                                </span>
                                <span className="detail-separator font-bold text-gray-600 mx-4">
                                  :
                                </span>
                                <span
                                  className={`detail-value font-medium ${detail.class}`}
                                >
                                  {detail.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Transactions Tab */}
                      {activeTab === "transactions" && (
                        <div className="mx-2 h-[475px] overflow-hidden  bg-white">
                          <div className="h-full overflow-y-auto">
                            <table className="w-full border-collapse">
                              <thead className="sticky-table-header bg-gray-100">
                                <tr>
                                  <th className="th-cell border-l border-gray-200">
                                    <span>Date</span>
                                  </th>
                                  <th className="th-cell border-l border-gray-200">
                                    <span>Invoice</span>
                                  </th>
                                  <th className="th-cell border-l border-gray-200">
                                    <span>Amount</span>
                                  </th>
                                  <th className="th-cell border-l border-gray-200">
                                    <span>Balance</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {paymentTransactionData.map((transaction, index) => (
                                  <tr key={index} className="tr-hover group">
                                    <td className="td-cell border border-gray-200 px-2 py-1.5 text-sm text-gray-800">
                                      {transaction.date}
                                    </td>
                                    <td className="td-cell border border-gray-200 px-2 py-1.5 text-sm text-gray-800">
                                      {transaction.invoice}
                                    </td>
                                    <td className="td-cell border border-gray-200 px-2 py-1.5 text-sm text-gray-800">
                                      {transaction.amount}
                                    </td>
                                    <td className="td-cell border border-gray-200 px-2 py-1.5 text-sm text-gray-800">
                                      {transaction.balance}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>

        <footer className="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex justify-start gap-2">
          <button
            type="submit"
            onClick={handleSubmit as any}
            className="btn-sm btn-primary"
          >
            Save
          </button>
          <button type="button" className="btn-sm btn-secondary">
            Cancel
          </button>
        </footer>
      </div>
    </Layout>
  );
}
