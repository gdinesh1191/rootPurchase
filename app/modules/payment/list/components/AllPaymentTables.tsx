"use client";

import { useEffect, useState } from "react";
import { apiCall } from "../../../../utils/api";

interface Trader {
  id: number;
  traderName: string;
  companyName: string;
  contactNumber: string;
  email: string;
  location: string;
  totalOrders: number;
  activeOrders: number;
  totalAmount: string;
  lastOrderDate: string;
  status: string;
  rating: number;
}

interface TradersTableProps {
  onSidebarToggle: () => void;
}

const AllPaymentTable: React.FC<TradersTableProps> = ({ onSidebarToggle }) => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});

  const fetchTraders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for traders
      const mockData = [
        {
          id: 1,
          traderName: "Rajesh Kumar",
          companyName: "Kumar Enterprises",
          contactNumber: "9876543210",
          email: "rajesh@kumarenterprises.com",
          location: "Chennai",
          totalOrders: 45,
          activeOrders: 3,
          totalAmount: "₹12,50,000",
          lastOrderDate: "2024-01-18",
          status: "Active",
          rating: 4.5
        },
        {
          id: 2,
          traderName: "Priya Sharma",
          companyName: "Sharma Trading Co.",
          contactNumber: "9123456789",
          email: "priya@sharmatrading.com",
          location: "Mumbai",
          totalOrders: 32,
          activeOrders: 2,
          totalAmount: "₹8,75,000",
          lastOrderDate: "2024-01-17",
          status: "Active",
          rating: 4.2
        },
        {
          id: 3,
          traderName: "Anil Patel",
          companyName: "Patel Logistics",
          contactNumber: "9234567890",
          email: "anil@patellogistics.com",
          location: "Ahmedabad",
          totalOrders: 28,
          activeOrders: 1,
          totalAmount: "₹6,90,000",
          lastOrderDate: "2024-01-15",
          status: "Active",
          rating: 4.0
        },
        {
          id: 4,
          traderName: "Sunita Reddy",
          companyName: "Reddy Transport",
          contactNumber: "9345678901",
          email: "sunita@reddytransport.com",
          location: "Hyderabad",
          totalOrders: 52,
          activeOrders: 4,
          totalAmount: "₹15,20,000",
          lastOrderDate: "2024-01-19",
          status: "Active",
          rating: 4.7
        },
        {
          id: 5,
          traderName: "Vikram Singh",
          companyName: "Singh Brothers",
          contactNumber: "9456789012",
          email: "vikram@singhbrothers.com",
          location: "Delhi",
          totalOrders: 18,
          activeOrders: 0,
          totalAmount: "₹4,25,000",
          lastOrderDate: "2024-01-10",
          status: "Inactive",
          rating: 3.8
        },
        {
          id: 6,
          traderName: "Meera Nair",
          companyName: "Nair Cargo Services",
          contactNumber: "9567890123",
          email: "meera@naircargo.com",
          location: "Kochi",
          totalOrders: 38,
          activeOrders: 2,
          totalAmount: "₹9,80,000",
          lastOrderDate: "2024-01-16",
          status: "Active",
          rating: 4.3
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setTraders(mockData);
      
    } catch (err) {
      console.error("Error fetching traders:", err);
      setError("Failed to fetch traders");
      setTraders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? traders.map((t) => t.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleRefresh = () => {
    fetchTraders();
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
    setSelectAll(traders.length > 0 && selectedIds.length === traders.length);
  }, [selectedIds, traders]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ri-star-fill text-yellow-400"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-fill text-yellow-400"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line text-gray-300"></i>);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg font-medium text-gray-700">Loading Payment List...</div>
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

  if (traders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">No traders available</div>
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

              <button className="btn-sm btn-visible-hover" id="bulkActionsBtn" onClick={() => { setSelectAll(true); setSelectedIds(traders.map((t) => t.id)); }}>
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
          <input className="form-control !h-[31px]" type="text" placeholder="Search Traders" />
          <button className="btn-sm btn-visible-hover" onClick={handleFilterToggle}>
            <i className="ri-sort-desc"></i>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#ebeff3]">
        {selectedIds.length > 1 && (
          <div className="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 badge-selected">
            {selectedIds.length} Traders selected
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
                      <span>Company</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Contact</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Location</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Total Orders</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Total Amount</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Rating</span>
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
                {traders.map((trader, index) => (
                  <tr key={trader.id} className={`tr-hover group ${selectedIds.includes(trader.id) ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}`}>
                    <td className="td-cell">
                      <input type="checkbox" className="form-check" checked={selectedIds.includes(trader.id)} onChange={() => handleCheckboxChange(trader.id)} />
                    </td>
                    <td className="td-cell">
                      <span className="float-left">{index + 1}</span>
                      <span className="float-right">
                        <i className="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i>
                      </span>
                    </td>
                    <td className="td-cell">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{trader.traderName}</span>
                        <span className="text-xs text-gray-500">{trader.email}</span>
                      </div>
                    </td>
                    <td className="td-cell">{trader.companyName}</td>
                    <td className="td-cell">{trader.contactNumber}</td>
                    <td className="td-cell">{trader.location}</td>
                    <td className="td-cell">
                      <div className="flex flex-col">
                        <span className="font-medium">{trader.totalOrders}</span>
                        <span className="text-xs text-green-600">{trader.activeOrders} active</span>
                      </div>
                    </td>
                    <td className="td-cell font-semibold text-green-600">{trader.totalAmount}</td>
                    <td className="td-cell">
                      <div className="flex items-center gap-1">
                        <div className="flex text-sm">
                          {renderStars(trader.rating)}
                        </div>
                        <span className="text-xs text-gray-600">({trader.rating})</span>
                      </div>
                    </td>
                    <td className="last-td-cell">
                      <span className={`px-2 py-1 rounded text-xs ${
                        trader.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {trader.status}
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
          Showing <span className="text-red-600">{traders.length}</span> of <span className="text-blue-600">{traders.length}</span>
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
              <label className="filter-label">Company Name</label>
              <input 
                type="text" 
                placeholder="Enter company name" 
                className="form-control"
                value={localFilters.companyName || ''}
                onChange={(e) => handleFilterInputChange('companyName', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="filter-label">Location</label>
              <input 
                type="text" 
                placeholder="Enter location" 
                className="form-control"
                value={localFilters.location || ''}
                onChange={(e) => handleFilterInputChange('location', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="filter-label">Status</label>
              <select 
                className="form-control"
                value={localFilters.status || ''}
                onChange={(e) => handleFilterInputChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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

export default AllPaymentTable; 