"use client";
import DatePicker from "@/app/utils/datepicker";
import { Button } from "@/components/ui/button"; // For a reset button example

import { useEffect, useState } from "react";
// import { apiCall } from "../../../../utils/api";

interface PattiyalPayment {
  id: number;
  sNo: number;
  pattiyalNo: string;
  waymentNo: string;
  vehicleNo: string;
  amount: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  paymentDate: string;
  status: "Completed" | "Failed";
}

interface CompletedPaymentTableProps {
  onSidebarToggle: () => void;
}

const CompletedPaymentTable: React.FC<CompletedPaymentTableProps> = ({
  onSidebarToggle,
}) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  // Optional: Function to reset both dates
  const handleResetDates = () => {
    setFromDate(undefined);
    setToDate(undefined);
  };

  const [pattiyalPayments, setPattiyalPayments] = useState<PattiyalPayment[]>(
    []
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states (kept in case you want to re-introduce filtering for static data or future API)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});

  // Static data for Completed Pattiyal Payments
  const staticCompletedPattiyalPayments: PattiyalPayment[] = [
    {
      id: 101,
      sNo: 1,
      pattiyalNo: "PP2023050",
      waymentNo: "WM2023101",
      vehicleNo: "TN05G7890",
      amount: "18500.00",
      bankName: "Axis Bank",
      accountNumber: "XXXXXXXXXXXX4321",
      ifscCode: "UTIB0000006",
      paymentDate: "2023-05-10",
      status: "Completed",
    },
    {
      id: 102,
      sNo: 2,
      pattiyalNo: "PP2023051",
      waymentNo: "WM2023102",
      vehicleNo: "MH12H1234",
      amount: "25000.00",
      bankName: "Punjab National Bank",
      accountNumber: "XXXXXXXXXXXX8765",
      ifscCode: "PUNB0000007",
      paymentDate: "2023-05-12",
      status: "Completed",
    },
    {
      id: 103,
      sNo: 3,
      pattiyalNo: "PP2023052",
      waymentNo: "WM2023103",
      vehicleNo: "RJ14I5678",
      amount: "12000.00",
      bankName: "Bank of Baroda",
      accountNumber: "XXXXXXXXXXXX2345",
      ifscCode: "BARB0000008",
      paymentDate: "2023-05-15",
      status: "Completed",
    },
    {
      id: 104,
      sNo: 4,
      pattiyalNo: "PP2023053",
      waymentNo: "WM2023104",
      vehicleNo: "DL01J9101",
      amount: "7500.00",
      bankName: "Union Bank of India",
      accountNumber: "XXXXXXXXXXXX6789",
      ifscCode: "UBIN0000009",
      paymentDate: "2023-05-18",
      status: "Completed",
    },
    {
      id: 105,
      sNo: 5,
      pattiyalNo: "PP2023054",
      waymentNo: "WM2023105",
      vehicleNo: "UP16K1122",
      amount: "35000.00",
      bankName: "Indian Bank",
      accountNumber: "XXXXXXXXXXXX0987",
      ifscCode: "IDIB0000010",
      paymentDate: "2023-05-20",
      status: "Completed",
    },
  ];

  const fetchPattiyalPayments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Commented out the API call for actual data fetching
      /*
      const payload = {
        token: "getCompletedPattiyalPaymentsList", // Assuming a different token for completed payments
        data: {
          columns: [
            "id",
            "no",
            "createdAt",
            "pattiiyalNo",
            "vehicleNumber",
            "amount",
            "bankName",
            "accountNumber",
            "ifscCode",
            "paymentDate",
            "status"
          ],
          status: "completed" // Or whatever status indicates completion
        }
      };

      const response = await apiCall(payload);

      if (response?.status === "success" && response?.data?.length > 0) {
        const mappedData = response.data.map((item: any) => ({
          id: parseInt(item.id),
          sNo: item.sNo || 'N/A', // Assuming sNo comes from API or can be generated
          pattiyalNo: item.no || 'N/A',
          waymentNo: item.pattiiyalNo || 'N/A', // Mapping pattiiyalNo to waymentNo
          vehicleNo: item.vehicleNumber || 'N/A',
          amount: item.amount || 'N/A',
          bankName: item.bankName || 'N/A',
          accountNumber: item.accountNumber || 'N/A',
          ifscCode: item.ifscCode || 'N/A',
          paymentDate: item.paymentDate ? new Date(item.paymentDate).toLocaleDateString('en-IN') : 'N/A',
          status: item.status === "1" ? "Completed" : "Failed", // Assuming '1' means completed
        }));
        setPattiyalPayments(mappedData);
      } else {
        setPattiyalPayments([]);
      }
      */

      // Using static data for demonstration
      setPattiyalPayments(staticCompletedPattiyalPayments);
    } catch (err) {
      console.error("Error fetching completed pattiyal payments:", err);
      setError(
        "Error loading static data (simulated error if API call were active)"
      ); // Simulate error for static data
      setPattiyalPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPattiyalPayments();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? pattiyalPayments.map((p) => p.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRefresh = () => {
    fetchPattiyalPayments();
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
    setSelectAll(
      pattiyalPayments.length > 0 &&
        selectedIds.length === pattiyalPayments.length
    );
  }, [selectedIds, pattiyalPayments]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg font-medium text-gray-700">
          Loading completed pattiyal payments...
        </div>
        <div className="text-sm text-gray-500">
          Please wait while we fetch the data
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 flex-col space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mx-4 max-w-2xl">
          <div className="flex items-center mb-2">
            <i className="ri-error-warning-line text-red-600 text-xl mr-2"></i>
            <h3 className="font-semibold text-lg">Connection Error</h3>
          </div>
          <p className="text-sm mb-3">{error}</p>
          <div className="text-xs text-red-600 mb-3">
            <strong>Possible solutions:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Check if the API server is running and accessible</li>
              <li>Verify the API endpoint URL is correct</li>
              <li>Check for CORS configuration on the server</li>
              <li>Ensure you have internet connectivity</li>
            </ul>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            <i className="ri-refresh-line mr-1"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (pattiyalPayments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">
          No completed pattiyal payments available
        </div>
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

              <button
                className="btn-sm btn-visible-hover"
                id="bulkActionsBtn"
                onClick={() => {
                  setSelectAll(true);
                  setSelectedIds(pattiyalPayments.map((p) => p.id));
                }}
              >
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
              <button
                className="btn-sm btn-visible-hover"
                id="cancelSelectionBtn"
                onClick={() => setSelectedIds([])}
              >
                <i className="ri-close-line mr-1"></i>
                Cancel Bulk Actions
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center relative space-x-2">
          <input
            className="form-control !h-[31px]"
            type="text"
            placeholder="Enter Pattiyal / Wayment Number"
          />
          <button
            className="btn-sm btn-visible-hover"
            onClick={handleFilterToggle}
          >
            <i className="ri-sort-desc"></i>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#ebeff3]">
        {selectedIds.length > 1 && (
          <div className="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 badge-selected">
            {selectedIds.length} Pattiyal Payments selected
          </div>
        )}

        <div className="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
          <div className="h-full overflow-y-auto">
            <table className="w-full">
              <thead className="sticky-table-header">
                <tr>
                  <th className="th-cell" id="checkboxColumn">
                    <input
                      type="checkbox"
                      id="selectAll"
                      className="form-check"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>S.No.</span>
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
                      <span>Wayment No</span>
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
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>IFSC Code</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Payment Date</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="last-th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Status</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pattiyalPayments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`tr-hover group ${
                      selectedIds.includes(payment.id)
                        ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]"
                        : ""
                    }`}
                  >
                    <td className="td-cell">
                      <input
                        type="checkbox"
                        className="form-check"
                        checked={selectedIds.includes(payment.id)}
                        onChange={() => handleCheckboxChange(payment.id)}
                      />
                    </td>
                    <td className="td-cell">
                      <span className="float-left">{index + 1}</span>
                      <span className="float-right">
                        <i className="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i>
                      </span>
                    </td>
                    <td className="td-cell">{payment.pattiyalNo}</td>
                    <td className="td-cell">{payment.waymentNo}</td>
                    <td className="td-cell">{payment.vehicleNo}</td>
                    <td className="td-cell">{payment.amount}</td>
                    <td className="td-cell">{payment.bankName}</td>
                    <td className="td-cell">{payment.accountNumber}</td>
                    <td className="td-cell">{payment.ifscCode}</td>
                    <td className="td-cell">{payment.paymentDate}</td>
                    <td className="last-td-cell">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          payment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "Failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {payment.status}
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
          Showing{" "}
          <span className="text-red-600">{pattiyalPayments.length}</span> of{" "}
          <span className="text-blue-600">{pattiyalPayments.length}</span>
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
