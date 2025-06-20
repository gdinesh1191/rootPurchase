"use client";

import { useEffect, useState } from "react";
import DatePicker from "@/app/utils/datepicker";
import { RadioGroup } from "@/app/utils/form-controls";
import { waymentMockData } from "@/app/JSON";

interface Wayment {
  id: number;
  customerName: string;
  waymentNo: string;
  vehicleNo: string;
  materialType: string;
  variety: string;
  netWeight: string;
  place: string;
}

interface WaymentTableProps {
  onSidebarToggle: () => void;
}


const PendingWaymentList: React.FC<WaymentTableProps> = ({ onSidebarToggle }) => {
  const [wayment, setWayment] = useState<Wayment[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [materialType, setMaterialType] = useState<string>("TapiocaRoot");
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});

  const fetchWayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data for wayment
     

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setWayment(waymentMockData);
    } catch (err) {
      console.error("Error fetching wayment:", err);
      setError("Failed to fetch wayment");
      setWayment([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWayment();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? wayment.map((t) => t.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRefresh = () => {
    fetchWayment();
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
    setSelectAll(wayment.length > 0 && selectedIds.length === wayment.length);
  }, [selectedIds, wayment]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg font-medium text-gray-700">
          Loading Wayment List...
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

  if (wayment.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">No available</div>
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
                  setSelectedIds(wayment.map((t) => t.id));
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
            placeholder="Search Vehicle Number"
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
            {selectedIds.length} Wayments selected
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
                      <span>Customer Name</span>
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
                      <span>Material Type</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Variety</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Net Weight</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="last-th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Place</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {wayment.map((payment, index) => (
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
                    <td className="td-cell">{payment.customerName}</td>
                    <td className="td-cell">{payment.waymentNo}</td>
                    <td className="td-cell">{payment.vehicleNo}</td>
                    <td className="td-cell">{payment.materialType}</td>
                    <td className="td-cell">{payment.variety}</td>
                    <td className="td-cell">{payment.netWeight}</td>
                    <td className="td-cell">{payment.place}</td>
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
          Showing <span className="text-red-600">{wayment.length}</span> of{" "}
          <span className="text-blue-600">{wayment.length}</span>
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
              <label className="filter-label">Customer Name</label>
              <input
                type="text"
                placeholder="Enter Customer Name"
                className="form-control"
                value={localFilters.customerName || ""}
                onChange={(e) =>
                  handleFilterInputChange("customerName", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="filter-label">Wayment No</label>
              <input
                type="text"
                className="form-control"
                value={localFilters.waymentNumber || ""}
                placeholder="Enter Wayment No"
                onChange={(e) =>
                  handleFilterInputChange("waymentNumber", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="filter-label">Material Type</label>
              <RadioGroup
                      name="materialType"
                      options={[
                        { value: "TapiocaRoot", label: "Tapioca Root" },
                        { value: "Others", label: "Others" },
                      ]}
                      defaultValue={localFilters.materialType || "TapiocaRoot"}
                      onChange={(e) => {
                        handleFilterInputChange("materialType", e.target.value);
                      }}
                    />
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

export default PendingWaymentList;
