"use client";

import { useEffect, useState } from "react";
import { apiCall } from "../../../../utils/api";

interface CompletedPattiyal {
  id: number;
  date: string;
  weightNo: string;
  pattiyalNo: string;
  vehicleNo: string;
  partLoad: string;
  inTime: string;
  outTime: string;
  completedDate: string;
  totalAmount: string;
  paymentStatus: string;
  deliveryStatus: string;
}

interface CompletedPattiyalTableProps {
  onSidebarToggle: () => void;
}

const CompletedPattiyalTable: React.FC<CompletedPattiyalTableProps> = ({ onSidebarToggle }) => {
  const [completedPattiyals, setCompletedPattiyals] = useState<CompletedPattiyal[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});

  const fetchCompletedPattiyals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for completed pattiyals
      const mockData = [
        {
          id: 1,
          date: "2024-01-10",
          weightNo: "WT101",
          pattiyalNo: "PT101",
          vehicleNo: "TN29N1212",
          partLoad: "Full Load",
          inTime: "08:30 AM",
          outTime: "06:45 PM",
          completedDate: "2024-01-12",
          totalAmount: "₹25,000",
          paymentStatus: "Paid",
          deliveryStatus: "Delivered"
        },
        {
          id: 2,
          date: "2024-01-11",
          weightNo: "WT102",
          pattiyalNo: "PT102",
          vehicleNo: "TN45Z2321",
          partLoad: "Partial Load",
          inTime: "09:15 AM",
          outTime: "07:30 PM",
          completedDate: "2024-01-13",
          totalAmount: "₹18,500",
          paymentStatus: "Paid",
          deliveryStatus: "Delivered"
        },
        {
          id: 3,
          date: "2024-01-12",
          weightNo: "WT103",
          pattiyalNo: "PT103",
          vehicleNo: "TN37A5678",
          partLoad: "Full Load",
          inTime: "07:45 AM",
          outTime: "08:15 PM",
          completedDate: "2024-01-14",
          totalAmount: "₹32,000",
          paymentStatus: "Pending",
          deliveryStatus: "Delivered"
        },
        {
          id: 4,
          date: "2024-01-13",
          weightNo: "WT104",
          pattiyalNo: "PT104",
          vehicleNo: "TN10B1234",
          partLoad: "Partial Load",
          inTime: "10:00 AM",
          outTime: "05:30 PM",
          completedDate: "2024-01-15",
          totalAmount: "₹22,750",
          paymentStatus: "Paid",
          deliveryStatus: "Delivered"
        },
        {
          id: 5,
          date: "2024-01-14",
          weightNo: "WT105",
          pattiyalNo: "PT105",
          vehicleNo: "TN11C5678",
          partLoad: "Full Load",
          inTime: "07:15 AM",
          outTime: "09:00 PM",
          completedDate: "2024-01-16",
          totalAmount: "₹28,900",
          paymentStatus: "Paid",
          deliveryStatus: "Delivered"
        }
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
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading completed pattiyals...</div>
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
          <input className="form-control !h-[31px]" type="text" placeholder="Enter Completion Date" />
          <button className="btn-sm btn-visible-hover" onClick={handleFilterToggle}>
            <i className="ri-sort-desc"></i>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#ebeff3]">
        {selectedIds.length > 1 && (
          <div className="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 badge-selected">
            {selectedIds.length} Completed Pattiyals selected
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
                      <span>Date</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Weight No</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Pattiyal No</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Vehicle No</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Part Load</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Completed Date</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Total Amount</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="last-th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Payment Status</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {completedPattiyals.map((pattiyal, index) => (
                  <tr key={pattiyal.id} className={`tr-hover group ${selectedIds.includes(pattiyal.id) ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}`}>
                    <td className="td-cell">
                      <input type="checkbox" className="form-check" checked={selectedIds.includes(pattiyal.id)} onChange={() => handleCheckboxChange(pattiyal.id)} />
                    </td>
                    <td className="td-cell">
                      <span className="float-left">{index + 1}</span>
                      <span className="float-right">
                        <i className="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i>
                      </span>
                    </td>
                    <td className="td-cell">{pattiyal.date}</td>
                    <td className="td-cell">{pattiyal.weightNo}</td>
                    <td className="td-cell">{pattiyal.pattiyalNo}</td>
                    <td className="td-cell">{pattiyal.vehicleNo}</td>
                    <td className="td-cell">{pattiyal.partLoad}</td>
                    <td className="td-cell">{pattiyal.completedDate}</td>
                    <td className="td-cell">{pattiyal.totalAmount}</td>
                    <td className="last-td-cell">
                      <span className={`px-2 py-1 rounded text-xs ${
                        pattiyal.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pattiyal.paymentStatus}
                      </span>
                    </td>
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
          isFilterOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
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
            <button
              onClick={handleFilterClose}
              className="cursor-pointer"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          {/* Scrollable Content */}
          <div className="p-4 overflow-y-auto flex-1">
            <div className="mb-4">
              <label className="filter-label">Completion Date</label>
              <input 
                type="date" 
                className="form-control"
                value={localFilters.completionDate || ''}
                onChange={(e) => handleFilterInputChange('completionDate', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="filter-label">Payment Status</label>
              <select 
                className="form-control"
                value={localFilters.paymentStatus || ''}
                onChange={(e) => handleFilterInputChange('paymentStatus', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button
              className="btn-sm btn-light"
              onClick={handleClearFilters}
            >
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

export default CompletedPattiyalTable; 