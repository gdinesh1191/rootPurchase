"use client";

import { dummyPoints } from "@/app/data/JSON";
import { useEffect, useState } from "react";

interface CompletedPoint {
  id: number;
  date: string;
  waymentNo: string; // Renamed from weightNo
  PointNo: string;
  vehicleNo: string;
  partLoad: string;
  inTime: string;
  outTime: string;
  pointApproval: string;
  rateApproval: string;
  PointApproval: string;
  weight: string;
  variety: string; // New column
  weightAvgPoint: string; // New column
}

interface CompletedPointTableProps {
  onSidebarToggle: () => void;
}

const CompletedPointTable: React.FC<CompletedPointTableProps> = ({ onSidebarToggle }) => {
  const [CompletedPoints, setCompletedPoints] = useState<CompletedPoint[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true); // Set to true initially for dummy data
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});

 
  const fetchCompletedPoints = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCompletedPoints(dummyPoints);
    } catch (err) {
      console.error("Error fetching Completed Points:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch Completed Points";
      setError(errorMessage);
      setCompletedPoints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedPoints();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? CompletedPoints.map((p) => p.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleRefresh = () => {
    fetchCompletedPoints();
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
    setSelectAll(CompletedPoints.length > 0 && selectedIds.length === CompletedPoints.length);
  }, [selectedIds, CompletedPoints]);

  // Apply filters to the displayed data
  const filteredPoints = CompletedPoints.filter((point) => {
    if (filters.PointNumber && !point.PointNo.toLowerCase().includes(filters.PointNumber.toLowerCase())) {
      return false;
    }
    if (filters.vehicleNumber && !point.vehicleNo.toLowerCase().includes(filters.vehicleNumber.toLowerCase())) {
      return false;
    }
    if (filters.approvalStatus) {
      if (filters.approvalStatus === 'approved' && point.PointApproval !== 'Approved') {
        return false;
      }
      if (filters.approvalStatus === 'Completed' && point.PointApproval !== 'Completed') {
        return false;
      }
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg font-medium text-gray-700">Loading Completed Points...</div>
        <div className="text-sm text-gray-500">Please wait while we fetch the data</div>
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

  if (filteredPoints.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">No Completed Points available based on current filters.</div>
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

              <button className="btn-sm btn-visible-hover" id="bulkActionsBtn" onClick={() => { setSelectAll(true); setSelectedIds(CompletedPoints.map((p) => p.id)); }}>
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
          <input className="form-control !h-[31px]" type="text" placeholder="Enter Point Number" />
          <button className="btn-sm btn-visible-hover" onClick={handleFilterToggle}>
            <i className="ri-sort-desc"></i>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#ebeff3]">
        {selectedIds.length > 1 && (
          <div className="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 badge-selected">
            {selectedIds.length} Points selected
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
                      <span>Wayment No</span> {/* Changed from Weight No */}
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Point No</span>
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
                      <span>Variety</span> {/* New Column */}
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Weight</span> {/* New Column */}
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Weight Avg Point</span> {/* New Column */}
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Part Load</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {filteredPoints.map((Point, index) => (
                  <tr key={Point.id} className={`tr-hover group ${selectedIds.includes(Point.id) ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}`}>
                  <td className="td-cell"><input type="checkbox" className="form-check" checked={selectedIds.includes(Point.id)} onChange={() => handleCheckboxChange(Point.id)} /></td>
                  <td className="td-cell"><span className="float-left">{index + 1}</span><span className="float-right"><i className="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i></span></td>
                  <td className="td-cell">{Point.date}</td>
                  <td className="td-cell">{Point.waymentNo}</td>
                  <td className="td-cell">{Point.PointNo}</td>
                  <td className="td-cell">{Point.vehicleNo}</td>
                  <td className="td-cell">{Point.variety}</td>
                  <td className="td-cell">{Point.weight}</td>
                  <td className="td-cell">{Point.weightAvgPoint}</td>
                  <td className="td-cell">{Point.partLoad}</td>
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
          Showing <span className="text-red-600">{filteredPoints.length}</span> of <span className="text-blue-600">{CompletedPoints.length}</span>
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
              <label className="filter-label">Point Number</label>
              <input
                type="text"
                placeholder="Enter Point number"
                className="form-control"
                value={localFilters.PointNumber || ''}
                onChange={(e) => handleFilterInputChange('PointNumber', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="filter-label">Vehicle Number</label>
              <input
                type="text"
                placeholder="Enter vehicle number"
                className="form-control"
                value={localFilters.vehicleNumber || ''}
                onChange={(e) => handleFilterInputChange('vehicleNumber', e.target.value)}
              />
            </div>
          
            {/* New Filter for Variety */}
            <div className="mb-4">
              <label className="filter-label">Variety</label>
              <input
                type="text"
                placeholder="Enter Variety"
                className="form-control"
                value={localFilters.variety || ''}
                onChange={(e) => handleFilterInputChange('variety', e.target.value)}
              />
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

export default CompletedPointTable;