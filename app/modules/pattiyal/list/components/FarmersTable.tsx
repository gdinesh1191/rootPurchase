"use client";

import { useEffect, useState } from "react";
import { apiCall } from "../../../../utils/api";

interface Farmer {
  id: number;
  farmerName: string;
  farmName: string;
  contactNumber: string;
  village: string;
  district: string;
  cropType: string;
  farmSize: string;
  totalDeliveries: number;
  pendingDeliveries: number;
  totalAmount: string;
  lastDeliveryDate: string;
  paymentStatus: string;
  farmerCategory: string;
}

interface FarmersTableProps {
  onSidebarToggle: () => void;
}

const FarmersTable: React.FC<FarmersTableProps> = ({ onSidebarToggle }) => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for farmers
      const mockData = [
        {
          id: 1,
          farmerName: "Raman Krishnan",
          farmName: "Krishnan Organic Farm",
          contactNumber: "9876543210",
          village: "Thanjavur",
          district: "Thanjavur",
          cropType: "Rice",
          farmSize: "5.2 Acres",
          totalDeliveries: 12,
          pendingDeliveries: 2,
          totalAmount: "₹3,45,000",
          lastDeliveryDate: "2024-01-18",
          paymentStatus: "Paid",
          farmerCategory: "Organic"
        },
        {
          id: 2,
          farmerName: "Lakshmi Devi",
          farmName: "Devi Vegetable Farm",
          contactNumber: "9123456789",
          village: "Coimbatore",
          district: "Coimbatore",
          cropType: "Vegetables",
          farmSize: "3.8 Acres",
          totalDeliveries: 18,
          pendingDeliveries: 1,
          totalAmount: "₹2,80,000",
          lastDeliveryDate: "2024-01-17",
          paymentStatus: "Pending",
          farmerCategory: "Traditional"
        },
        {
          id: 3,
          farmerName: "Murugan Pillai",
          farmName: "Pillai Coconut Estate",
          contactNumber: "9234567890",
          village: "Pollachi",
          district: "Coimbatore",
          cropType: "Coconut",
          farmSize: "8.5 Acres",
          totalDeliveries: 8,
          pendingDeliveries: 0,
          totalAmount: "₹4,20,000",
          lastDeliveryDate: "2024-01-15",
          paymentStatus: "Paid",
          farmerCategory: "Commercial"
        },
        {
          id: 4,
          farmerName: "Kamala Subramaniam",
          farmName: "Subramaniam Spice Garden",
          contactNumber: "9345678901",
          village: "Madurai",
          district: "Madurai",
          cropType: "Spices",
          farmSize: "2.3 Acres",
          totalDeliveries: 15,
          pendingDeliveries: 3,
          totalAmount: "₹1,95,000",
          lastDeliveryDate: "2024-01-19",
          paymentStatus: "Partial",
          farmerCategory: "Organic"
        },
        {
          id: 5,
          farmerName: "Selvam Naidu",
          farmName: "Naidu Cotton Farm",
          contactNumber: "9456789012",
          village: "Erode",
          district: "Erode",
          cropType: "Cotton",
          farmSize: "12.0 Acres",
          totalDeliveries: 6,
          pendingDeliveries: 1,
          totalAmount: "₹5,60,000",
          lastDeliveryDate: "2024-01-16",
          paymentStatus: "Paid",
          farmerCategory: "Commercial"
        },
        {
          id: 6,
          farmerName: "Meenakshi Amma",
          farmName: "Amma Flower Garden",
          contactNumber: "9567890123",
          village: "Salem",
          district: "Salem",
          cropType: "Flowers",
          farmSize: "1.8 Acres",
          totalDeliveries: 22,
          pendingDeliveries: 4,
          totalAmount: "₹1,25,000",
          lastDeliveryDate: "2024-01-18",
          paymentStatus: "Pending",
          farmerCategory: "Traditional"
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setFarmers(mockData);
      
    } catch (err) {
      console.error("Error fetching farmers:", err);
      setError("Failed to fetch farmers");
      setFarmers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? farmers.map((f) => f.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleRefresh = () => {
    fetchFarmers();
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
    setSelectAll(farmers.length > 0 && selectedIds.length === farmers.length);
  }, [selectedIds, farmers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading farmers...</div>
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

  if (farmers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">No farmers available</div>
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

              <button className="btn-sm btn-visible-hover" id="bulkActionsBtn" onClick={() => { setSelectAll(true); setSelectedIds(farmers.map((f) => f.id)); }}>
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
          <input className="form-control !h-[31px]" type="text" placeholder="Search Farmers" />
          <button className="btn-sm btn-visible-hover" onClick={handleFilterToggle}>
            <i className="ri-sort-desc"></i>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#ebeff3]">
        {selectedIds.length > 1 && (
          <div className="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 badge-selected">
            {selectedIds.length} Farmers selected
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
                      <span>Farmer Name</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Farm Name</span>
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
                      <span>Crop Type</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Farm Size</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Deliveries</span>
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
                      <span>Category</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((farmer, index) => (
                  <tr key={farmer.id} className={`tr-hover group ${selectedIds.includes(farmer.id) ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}`}>
                    <td className="td-cell">
                      <input type="checkbox" className="form-check" checked={selectedIds.includes(farmer.id)} onChange={() => handleCheckboxChange(farmer.id)} />
                    </td>
                    <td className="td-cell">
                      <span className="float-left">{index + 1}</span>
                      <span className="float-right">
                        <i className="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i>
                      </span>
                    </td>
                    <td className="td-cell">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{farmer.farmerName}</span>
                        <span className="text-xs text-gray-500">{farmer.contactNumber}</span>
                      </div>
                    </td>
                    <td className="td-cell">{farmer.farmName}</td>
                    <td className="td-cell">{farmer.contactNumber}</td>
                    <td className="td-cell">
                      <div className="flex flex-col">
                        <span className="font-medium">{farmer.village}</span>
                        <span className="text-xs text-gray-500">{farmer.district}</span>
                      </div>
                    </td>
                    <td className="td-cell">
                      <span className={`px-2 py-1 rounded text-xs ${
                        farmer.cropType === 'Rice' ? 'bg-green-100 text-green-800' :
                        farmer.cropType === 'Vegetables' ? 'bg-blue-100 text-blue-800' :
                        farmer.cropType === 'Cotton' ? 'bg-yellow-100 text-yellow-800' :
                        farmer.cropType === 'Spices' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {farmer.cropType}
                      </span>
                    </td>
                    <td className="td-cell">{farmer.farmSize}</td>
                    <td className="td-cell">
                      <div className="flex flex-col">
                        <span className="font-medium">{farmer.totalDeliveries}</span>
                        <span className="text-xs text-orange-600">{farmer.pendingDeliveries} pending</span>
                      </div>
                    </td>
                    <td className="td-cell font-semibold text-green-600">{farmer.totalAmount}</td>
                    <td className="last-td-cell">
                      <span className={`px-2 py-1 rounded text-xs ${
                        farmer.farmerCategory === 'Organic' ? 'bg-green-100 text-green-800' :
                        farmer.farmerCategory === 'Commercial' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {farmer.farmerCategory}
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
          Showing <span className="text-red-600">{farmers.length}</span> of <span className="text-blue-600">{farmers.length}</span>
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
              <label className="filter-label">Crop Type</label>
              <select 
                className="form-control"
                value={localFilters.cropType || ''}
                onChange={(e) => handleFilterInputChange('cropType', e.target.value)}
              >
                <option value="">All Crops</option>
                <option value="rice">Rice</option>
                <option value="vegetables">Vegetables</option>
                <option value="cotton">Cotton</option>
                <option value="spices">Spices</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="filter-label">District</label>
              <input 
                type="text" 
                placeholder="Enter district" 
                className="form-control"
                value={localFilters.district || ''}
                onChange={(e) => handleFilterInputChange('district', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="filter-label">Category</label>
              <select 
                className="form-control"
                value={localFilters.category || ''}
                onChange={(e) => handleFilterInputChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="organic">Organic</option>
                <option value="traditional">Traditional</option>
                <option value="commercial">Commercial</option>
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

export default FarmersTable; 