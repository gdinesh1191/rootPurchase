"use client";

import { useEffect, useState } from "react";
import { apiCall } from "../../../../utils/api";
import DatePicker from "@/app/utils/datepicker";

interface CompletedPattiyal {
  id: number;
  traderName: string;
  date: string;
  amount: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface CompletedPattiyalTableProps {
  onSidebarToggle: () => void;
}

const CompletedPaymentTable: React.FC<CompletedPattiyalTableProps> = ({ onSidebarToggle }) => {
  const [completedPattiyals, setCompletedPattiyals] = useState<CompletedPattiyal[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});
const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const fetchCompletedPattiyals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for completed pattiyals
      const mockData = [
        {
          id: 1,
          traderName: "John Doe",
          date:"01/06/2024",
          amount: "15000.00",
          bankName: "State Bank of India",
          accountNumber: "XXXXXXXXXXXX1234",
          ifscCode: "SBIN0000001",
        },
        {
          id: 2,
          traderName: "John Doe",
          date:"01/06/2024",
          amount: "22500.50",
          bankName: "HDFC Bank",
          accountNumber: "XXXXXXXXXXXX5678",
          ifscCode: "HDFC0000002",
        },
        {
          id: 3,
          traderName: "John Doe",
          date:"01/06/2024",
          amount: "10000.00",
          bankName: "ICICI Bank",
          accountNumber: "XXXXXXXXXXXX9101",
          ifscCode: "ICIC0000003",
        },
        {
          id: 4,
          traderName: "John Doe",
          date:"01/06/2024",
          amount: "30000.75",
          bankName: "Axis Bank",
          accountNumber: "XXXXXXXXXXXX1122",
          ifscCode: "UTIB0000004",
        },
        {
          id: 5,
          traderName: "John Doe",
          date:"01/06/2024",
          amount: "5000.00",
          bankName: "Canara Bank",
          accountNumber: "XXXXXXXXXXXX3344",
          ifscCode: "CNRB0000005",
        },
        {
          id: 6,
          traderName: "John Doe",
          date:"25//10/2024",
          amount: "30000.75",
          bankName: "Axis Bank",
          accountNumber: "XXXXXXXXXXXX1122",
          ifscCode: "UTIB0000004",
        },
        {
          id: 7,
          traderName: "John Doe",
          date:"25//10/2024",
          amount: "5000.00",
          bankName: "Canara Bank",
          accountNumber: "XXXXXXXXXXXX3344",
          ifscCode: "CNRB0000005",
        },
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setCompletedPattiyals(mockData);
      
    } catch (err) {
      console.error("Error fetching completed pattiyals:", err);
      setError("Failed to fetch completed pattiyals");
      setCompletedPattiyals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedPattiyals();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? completedPattiyals.map((p) => p.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleRefresh = () => {
    fetchCompletedPattiyals();
  };

  // Filter handlers
  const handleFilterToggle = () => {
    setIsFilterOpen(true);
    setLocalFilters(filters);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilterInputChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = (appliedFilters: any) => {
    setFilters(appliedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
  };

  useEffect(() => {
    setSelectAll(completedPattiyals.length > 0 && selectedIds.length === completedPattiyals.length);
  }, [selectedIds, completedPattiyals]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg font-medium text-gray-700">Loading Completed Payment...</div>
        <div className="text-sm text-gray-500">Please wait while we fetch the data</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 flex-col">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-2 mb-2">
          <span className="block sm:inline">{error}</span>
          <button onClick={handleRefresh} className="ml-2 underline hover:no-underline">Retry</button>
        </div>
      </div>
    );
  }

  if (completedPattiyals.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">No completed pattiyals available</div>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
        <div className="flex items-center space-x-2 ml-2">
          {!selectedIds.length && (
            <>
              <button className="btn-sm btn-hover">
                <i className="ri-table-fill mr-1"></i>
                <span className="text-sm">Table</span>
                <i className="ri-arrow-down-s-line ml-1"></i>
              </button>

              <div className="relative inline-block">
                <button id="viewModeBtn" className="btn-sm btn-visible-hover">
                  <i className="ri-layout-5-line"></i>
                </button>
              </div>

              <button className="btn-sm btn-visible-hover" id="bulkActionsBtn" onClick={() => { setSelectAll(true); setSelectedIds(completedPattiyals.map((p) => p.id)); }}>
                <i className="ri-stack-fill mr-1"></i>
                Bulk Actions
              </button>
            </>
          )}

          {selectedIds.length > 0 && (
            <div className="bulk-actions flex items-center space-x-2">
              <button className="btn-sm btn-hover" id="printBtn">
                <i className="ri-printer-line mr-1"></i>
                Print
              </button>
              <button className="btn-sm btn-hover" id="summaryBtn">
                <i className="ri-sticky-note-line mr-1"></i>
                Summary
              </button>
              <button className="btn-sm btn-hover" id="downloadBtn">
                <i className="ri-arrow-down-line mr-1"></i>
                Download
              </button>
              <button className="btn-sm btn-hover" id="deleteBtn">
                <i className="ri-delete-bin-6-line mr-1"></i>
                Delete
              </button>
              <button className="btn-sm btn-visible-hover" id="cancelSelectionBtn" onClick={() => setSelectedIds([])}>
                <i className="ri-close-line mr-1"></i>
                Cancel Bulk Actions
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center relative space-x-2">
          <input className="form-control !h-[31px]" type="text" placeholder="Search Trader Name" />
          <button className="btn-sm btn-visible-hover" onClick={handleFilterToggle}>
            <i className="ri-sort-desc"></i>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#ebeff3]">
        {selectedIds.length > 1 && (
          <div className="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 badge-selected">
            {selectedIds.length} Completed Payments selected
          </div>
        )}

        <div className="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
          <div className="h-full overflow-y-auto">
            <table className="w-full">
              <thead className="sticky-table-header">
                <tr>
                  <th className="th-cell" id="checkboxColumn">
                    <input type="checkbox" id="selectAll" className="form-check" checked={selectAll} onChange={handleSelectAll} />
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>S.No.</span>
                    </div>
                  </th>
                   <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Trader Name</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Date</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Amount</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Bank Name</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Account Number</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="last-th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>IFSC Code</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {completedPattiyals.map((payment, index) => (
                  <tr key={payment.id} className={`tr-hover group ${selectedIds.includes(payment.id) ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}`}>
                    <td className="td-cell">
                      <input type="checkbox" className="form-check" checked={selectedIds.includes(payment.id)} onChange={() => handleCheckboxChange(payment.id)} />
                    </td>
                    <td className="td-cell">
                      <span className="float-left">{index + 1}</span>
                      <span className="float-right">
                        <i className="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i>
                      </span>
                    </td>
                    <td className="td-cell">{payment.traderName}</td>
                    <td className="td-cell">{payment.date}</td>
                    <td className="td-cell">{payment.amount}</td>
                    <td className="td-cell">{payment.bankName}</td>
                    <td className="td-cell">{payment.accountNumber}</td>
                    <td className="td-cell">{payment.ifscCode}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
        <span className="text-sm">
          Showing <span className="text-red-600">{completedPattiyals.length}</span> of <span className="text-blue-600">{completedPattiyals.length}</span>
        </span>
      </div>

      {/* Filter Modal */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)]"
          onClick={handleFilterClose}
        ></div>
        {/* Sidebar Content */}
        <div
          className={`offcanvas-sidebar flex flex-col ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="filter-header">
            <h5 className="">Add Filters</h5>
            <button onClick={handleFilterClose} className="cursor-pointer">
              <i className="ri-close-line"></i>
            </button>
          </div>
          {/* Scrollable Content */}
          <div className="p-4 overflow-y-auto flex-1">
            <div className="mb-4">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-35">
                  <label className="filter-label block mb-1">From Date</label>
                  <DatePicker
                    id="fromDate"
                    name="trip_start_date"
                    placeholder="Select start date"
                    selected={fromDate}
                    onChange={setFromDate}
                    // Max date for "From Date" is "To Date" (if set), otherwise no max.
                    maxDate={toDate}
                    className="w-full"
                  />
                </div>
                <div className="w-35">
                  <label className="filter-label block mb-1">To Date</label>
                  <DatePicker
                    id="toDate"
                    name="trip_end_date"
                    placeholder="Select end date"
                    selected={toDate}
                    onChange={setToDate}
                    // Min date for "To Date" is "From Date" (if set), otherwise no min.
                    minDate={fromDate}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button className="btn-sm btn-light" onClick={handleClearFilters}>
              Reset All
            </button>
            <button
              className="btn-sm btn-primary"
              onClick={() => {
                handleApplyFilters(localFilters);
                handleFilterClose();
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedPaymentTable; 