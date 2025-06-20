// components/Reports/PaymentPending.tsx
'use client';
import DatePicker from "@/app/utils/datepicker";
import { RadioGroup } from '@/app/utils/form-controls';
import { useEffect, useState } from 'react';
 

// Define the Payment interface with new fields
interface Payment {
  id: number;
  customerName: string;
  PaymentNo: string;
  vehicleNo: string;
  materialType: string;
  variety: string;
  netWeight: string;
  place: string;
  // New fields for payment details
  pattiyalNo: string; // Corresponds to 'Pattiyal No'
  waymentNo: string; // Corresponds to 'Wayment No'
  amount: string; // Corresponds to 'Amount'
  bankName: string; // Corresponds to 'Bank Name'
  accountNumber: string; // Corresponds to 'Account Number'
  ifscCode: string; // Corresponds to 'IFSC Code'
}

interface PaymentPendingProps {
  activeReport: string | null;
  activeCategory: string | null;
}

const PaymentPending: React.FC<PaymentPendingProps> = ({ activeReport, activeCategory }) => {
    const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
    const [toDate, setToDate] = useState<Date | undefined>(undefined);
  
  const [Payment, setPayment] = useState<Payment[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<any>({}); // Applied filters
  const [localFilters, setLocalFilters] = useState<any>({}); // Filters being set in the sidebar

  const fetchPayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data for Payment with new fields
      const mockData: Payment[] = [
        { id: 1, customerName: "Kumar Traders", PaymentNo: "SAGO001", vehicleNo: "TN38AA1234", materialType: "Tapioca", variety: "நீலம்", netWeight: "2500 kg", place: "Salem", pattiyalNo: "PATT001", waymentNo: "WAY001", amount: "₹15000", bankName: "SBI", accountNumber: "1234567890", ifscCode: "SBIN0001234" },
        { id: 2, customerName: "Selvam Agencies", PaymentNo: "SAGO002", vehicleNo: "TN28BB5678", materialType: "Tapioca", variety: "குண்டு", netWeight: "2300 kg", place: "Namakkal", pattiyalNo: "PATT002", waymentNo: "WAY002", amount: "₹12000", bankName: "ICICI", accountNumber: "0987654321", ifscCode: "ICIC0005678" },
        { id: 3, customerName: "Rani Traders", PaymentNo: "SAGO003", vehicleNo: "TN30CC3456", materialType: "Other", variety: "நீலம்", netWeight: "1800 kg", place: "Rasipuram", pattiyalNo: "PATT003", waymentNo: "WAY003", amount: "₹9000", bankName: "HDFC", accountNumber: "1122334455", ifscCode: "HDFC0009012" },
        { id: 4, customerName: "Sabari Mill", PaymentNo: "SAGO004", vehicleNo: "TN32DD9012", materialType: "Tapioca", variety: "குண்டு", netWeight: "2000 kg", place: "Attur", pattiyalNo: "PATT004", waymentNo: "WAY004", amount: "₹10000", bankName: "Axis", accountNumber: "6677889900", ifscCode: "AXIS0003456" },
        { id: 5, customerName: "Sri Sago Co.", PaymentNo: "SAGO005", vehicleNo: "TN12EE8888", materialType: "Other", variety: "குண்டு", netWeight: "1900 kg", place: "Tiruchengode", pattiyalNo: "PATT005", waymentNo: "WAY005", amount: "₹9500", bankName: "PNB", accountNumber: "2233445566", ifscCode: "PUNB0007890" },
        { id: 6, customerName: "Vel Traders", PaymentNo: "SAGO006", vehicleNo: "TN29FF1122", materialType: "Tapioca", variety: "நீலம்", netWeight: "2600 kg", place: "Edappadi", pattiyalNo: "PATT006", waymentNo: "WAY006", amount: "₹13000", bankName: "Canara Bank", accountNumber: "3344556677", ifscCode: "CNRB0001011" },
        { id: 7, customerName: "Shree Mill", PaymentNo: "SAGO007", vehicleNo: "TN25GG3344", materialType: "Tapioca", variety: "குண்டு", netWeight: "2200 kg", place: "Mallasamudram", pattiyalNo: "PATT007", waymentNo: "WAY007", amount: "₹11000", bankName: "Union Bank", accountNumber: "4455667788", ifscCode: "UBIN0002022" },
        { id: 8, customerName: "Sundar & Sons", PaymentNo: "SAGO008", vehicleNo: "TN58HH5566", materialType: "Other", variety: "நீலம்", netWeight: "2100 kg", place: "Komarapalayam", pattiyalNo: "PATT008", waymentNo: "WAY008", amount: "₹10500", bankName: "Indian Bank", accountNumber: "5566778899", ifscCode: "IDIB0003033" },
        { id: 9, customerName: "Sago Gold Traders", PaymentNo: "SAGO009", vehicleNo: "TN20JJ7788", materialType: "Tapioca", variety: "நீலம்", netWeight: "2400 kg", place: "Tharamangalam", pattiyalNo: "PATT009", waymentNo: "WAY009", amount: "₹12000", bankName: "IOB", accountNumber: "7788990011", ifscCode: "IOBA0004044" },
        { id: 10, customerName: "Anbu Sago", PaymentNo: "SAGO010", vehicleNo: "TN45KK9900", materialType: "Other", variety: "குண்டு", netWeight: "1700 kg", place: "Paramathi Velur", pattiyalNo: "PATT010", waymentNo: "WAY010", amount: "₹8500", bankName: "BOB", accountNumber: "8899001122", ifscCode: "BARB0005055" },
        { id: 11, customerName: "Gopi Traders", PaymentNo: "SAGO011", vehicleNo: "TN14LL1234", materialType: "Tapioca", variety: "நீலம்", netWeight: "2500 kg", place: "Puduchatram", pattiyalNo: "PATT011", waymentNo: "WAY011", amount: "₹12500", bankName: "Karnataka Bank", accountNumber: "9900112233", ifscCode: "KARB0006066" },
        { id: 12, customerName: "Senthil Mill", PaymentNo: "SAGO012", vehicleNo: "TN11MM5678", materialType: "Other", variety: "நீலம்", netWeight: "1850 kg", place: "Konganapuram", pattiyalNo: "PATT012", waymentNo: "WAY012", amount: "₹9250", bankName: "Dena Bank", accountNumber: "1011223344", ifscCode: "DENA0007077" },
        { id: 13, customerName: "Lakshmi Traders", PaymentNo: "SAGO013", vehicleNo: "TN27NN3456", materialType: "Tapioca", variety: "குண்டு", netWeight: "2750 kg", place: "Vennandur", pattiyalNo: "PATT013", waymentNo: "WAY013", amount: "₹13750", bankName: "UCO Bank", accountNumber: "1122334455", ifscCode: "UCOB0008088" },
        { id: 14, customerName: "Maruthi Co.", PaymentNo: "SAGO014", vehicleNo: "TN23OO9012", materialType: "Other", variety: "குண்டு", netWeight: "1950 kg", place: "Veerapandi", pattiyalNo: "PATT014", waymentNo: "WAY014", amount: "₹9750", bankName: "Andhra Bank", accountNumber: "1234567890", ifscCode: "ANDB0009099" },
        { id: 15, customerName: "Senthil Mill", PaymentNo: "SAGO012", vehicleNo: "TN11MM5678", materialType: "Other", variety: "நீலம்", netWeight: "1850 kg", place: "Konganapuram", pattiyalNo: "PATT015", waymentNo: "WAY015", amount: "₹9250", bankName: "Dena Bank", accountNumber: "1011223344", ifscCode: "DENA0007077" },
        { id: 16, customerName: "Lakshmi Traders", PaymentNo: "SAGO013", vehicleNo: "TN27NN3456", materialType: "Tapioca", variety: "குண்டு", netWeight: "2750 kg", place: "Vennandur", pattiyalNo: "PATT016", waymentNo: "WAY016", amount: "₹13750", bankName: "UCO Bank", accountNumber: "1122334455", ifscCode: "UCOB0008088" },
        { id: 17, customerName: "Maruthi Co.", PaymentNo: "SAGO014", vehicleNo: "TN23OO9012", materialType: "Other", variety: "குண்டு", netWeight: "1950 kg", place: "Veerapandi", pattiyalNo: "PATT017", waymentNo: "WAY017", amount: "₹9750", bankName: "Andhra Bank", accountNumber: "1234567890", ifscCode: "ANDB0009099" },
        { id: 18, customerName: "Bala Traders", PaymentNo: "SAGO015", vehicleNo: "TN19PP8888", materialType: "Tapioca", variety: "நீலம்", netWeight: "2600 kg", place: "Sendamangalam", pattiyalNo: "PATT018", waymentNo: "WAY018", amount: "₹13000", bankName: "Bank of India", accountNumber: "1357924680", ifscCode: "BKID0001234" },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Apply filters to mockData
      let filteredData = mockData.filter(item => {
        let match = true;
        if (filters.customerName && !item.customerName.toLowerCase().includes(filters.customerName.toLowerCase())) {
          match = false;
        }
        if (filters.PaymentNo && !item.PaymentNo.toLowerCase().includes(filters.PaymentNo.toLowerCase())) {
          match = false;
        }
        if (filters.vehicleNo && !item.vehicleNo.toLowerCase().includes(filters.vehicleNo.toLowerCase())) {
          match = false;
        }
        if (filters.materialType && item.materialType !== filters.materialType) {
            match = false;
        }
        // Add more filter conditions as needed for new fields
        return match;
      });

      setPayment(filteredData);
    } catch (err) {
      console.error("Error fetching Payment:", err);
      setError("Failed to fetch Payment");
      setPayment([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, [filters]); // Refetch when filters change

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? Payment.map((t) => t.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRefresh = () => {
    setFilters({}); // Clear filters on refresh
    setLocalFilters({}); // Clear local filters
    fetchPayment();
  };

  const handleFilterToggle = () => {
    setIsSidebarOpen(true);
    setLocalFilters(filters); // Initialize local filters with currently applied filters
  };

  const handleFilterClose = () => {
    setIsSidebarOpen(false);
  };
 

  const handleApplyFilters = () => {
    setFilters(localFilters); // Apply the local filters to the main filters state
    setIsSidebarOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
    setIsSidebarOpen(false); // Close sidebar after clearing
  };

  useEffect(() => {
    setSelectAll(Payment.length > 0 && selectedIds.length === Payment.length);
  }, [selectedIds, Payment]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg font-medium text-gray-700">
          Loading Payment List...
        </div>
        <div className="text-sm text-gray-500">
          Please wait while we fetch the data
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 flex-col">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-2 mb-2">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={handleRefresh}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (Payment.length === 0 && Object.keys(filters).length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">No Payment data available.</div>
      </div>
    );
  } else if (Payment.length === 0 && Object.keys(filters).length > 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-lg text-gray-500">No Payment found matching your filters.</div>
        <button
          onClick={handleClearFilters}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <main className="flex-1">
      <h4 className="text-l font-medium p-2 text-[#009333]">
        {activeCategory} {activeReport} Report
      </h4>

      {/* Header Section */}
      <div className="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
        <div className="flex items-center space-x-2 ml-2">
          {!selectedIds.length && (
            <>
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm">
                <i className="ri-table-fill mr-1"></i>
                <span className="text-sm">Table</span>
                <i className="ri-arrow-down-s-line ml-1"></i>
              </button>

              <div className="relative inline-block">
                <button id="viewModeBtn" className="btn-sm !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm">
                  <i className="ri-layout-5-line"></i>
                </button>
              </div>

              <button
                className="btn-sm !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm"
                id="bulkActionsBtn"
                onClick={() => {
                  setSelectAll(true);
                  setSelectedIds(Payment.map((t) => t.id));
                }}
              >
                <i className="ri-stack-fill mr-1"></i>
                Bulk Actions
              </button>
            </>
          )}

          {selectedIds.length > 0 && (
            <div className="bulk-actions flex items-center space-x-2">
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="printBtn">
                <i className="ri-printer-line mr-1"></i>
                Print
              </button>
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="summaryBtn">
                <i className="ri-sticky-note-line mr-1"></i>
                Summary
              </button>
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="downloadBtn">
                <i className="ri-arrow-down-line mr-1"></i>
                Download
              </button>
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                <i className="ri-delete-bin-6-line mr-1"></i>
                Delete
              </button>
              <button
                className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm"
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
            placeholder="Search Wayment Number" 
          />
          <button
            className="btn-sm !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm"
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
            {selectedIds.length} Payments selected
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
                      <span>Customer</span>
                      <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Payment</span>
                      <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Pattiyal</span>
                      <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Wayment</span>
                      <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Vehicle</span>
                      <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                    </div>
                  </th>
                  
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Amount</span>
                      <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                    </div>
                  </th>
                  
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Account</span>
                      <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                    </div>
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {Payment.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`group hover:bg-[#f5f7f9] text-sm cursor-pointer ${
                      selectedIds.includes(payment.id)
                        ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]"
                        : ""
                    }`} >
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
                      <span className="float-right cursor-pointer">
                        <i className="p-1 rounded border border-[#cfd7df] text-[#4d5e6c] ri-pencil-fill opacity-0 group-hover:opacity-100"></i>
                      </span>
                    </td>
                    <td className="td-cell">{payment.customerName}</td>
                    <td className="td-cell">{payment.PaymentNo}</td>
                    <td className="td-cell">{payment.pattiyalNo}</td> {/* New */}
                    <td className="td-cell">{payment.waymentNo}</td> {/* New */}
                    <td className="td-cell">{payment.vehicleNo}</td>
                     <td className="td-cell">{payment.amount}</td> {/* New */}
                     <td className="td-cell">{payment.accountNumber}</td> {/* New */}
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
        <span className="text-sm">
          Showing <span className="text-red-600">{Payment.length}</span> of{" "}
          <span className="text-blue-600">{Payment.length}</span>
        </span>
      </footer>

      {/* Offcanvas Sidebar (Filters) */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)]"
          onClick={handleFilterClose}
        ></div>

        {/* Sidebar Content */}
        <div
          className={`relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}
        >
          {/* Header */}
          <div className="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center">
            <h5 className="text-sm text-[#12344d]">Add Filters</h5>
            <button onClick={handleFilterClose} className="text-[#12344d] cursor-pointer">
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
            <button className="btn-sm btn-primary" onClick={handleApplyFilters}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentPending;