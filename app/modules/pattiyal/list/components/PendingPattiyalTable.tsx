"use client";

import { useEffect, useState } from "react";
import { apiCall } from "../../../../utils/api";

interface PendingPattiyal {
  id: number;
  date: string;
  weightNo: string;
  pattiyalNo: string;
  vehicleNo: string;
  partLoad: string;
  inTime: string;
  outTime: string;
  pointApproval: string;
  rateApproval: string;
  pattiyalApproval: string;
}

interface PendingPattiyalTableProps {
  onSidebarToggle: () => void;
}

const PendingPattiyalTable: React.FC<PendingPattiyalTableProps> = ({ onSidebarToggle }) => {
  const [pendingPattiyals, setPendingPattiyals] = useState<PendingPattiyal[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});

  const fetchPendingPattiyals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const payload = {
        token: "getPattiyalList",
        data: { 
          columns: [
            "id",
            "no",
            "createdAt",
            "pattiiyalNo",
            "vehicleNumber",
            "partLoad",
            "inTime",
            "outTime",
            "pointApprove",
            "rateApprove",
            "MaterialType",
            "name",
            "firstWeight",
            "secondWeight",
            "netWeight",
            "billWeight"
          ],
          status: "pending"
        }
      };
      
      const response = await apiCall(payload);
      
      if (response?.status === "success" && response?.data?.length > 0) {
        // Map API response to component interface
        const mappedData = response.data.map((item: any) => ({
          id: parseInt(item.id),
          date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN') : 'N/A',
          weightNo: item.pattiiyalNo || 'N/A',
          pattiyalNo: item.no || 'N/A',
          vehicleNo: item.vehicleNumber || 'N/A',
          partLoad: item.partLoad === "1" ? "Part Load" : "Full Load",
          inTime: item.inTime || 'N/A',
          outTime: item.outTime || 'N/A',
          pointApproval: item.pointApprove === "1" ? "Approved" : "Pending",
          rateApproval: item.rateApprove === "1" ? "Approved" : "Pending",
          pattiyalApproval: (item.pointApprove === "1" && item.rateApprove === "1") ? "Approved" : "Pending"
        }));
        setPendingPattiyals(mappedData);
      } else {
        setPendingPattiyals([]);
      }
    } catch (err) {
      console.error("Error fetching pending pattiyals:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch pending pattiyals";
      setError(errorMessage);
      setPendingPattiyals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPattiyals();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? pendingPattiyals.map((p) => p.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleRefresh = () => {
    fetchPendingPattiyals();
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
    setSelectAll(pendingPattiyals.length > 0 && selectedIds.length === pendingPattiyals.length);
  }, [selectedIds, pendingPattiyals]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg font-medium text-gray-700">Loading pending pattiyals...</div>
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

  if (pendingPattiyals.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">No pending pattiyals available</div>
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

              <button className="btn-sm btn-visible-hover" id="bulkActionsBtn" onClick={() => { setSelectAll(true); setSelectedIds(pendingPattiyals.map((p) => p.id)); }}>
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
          <input className="form-control !h-[31px]" type="text" placeholder="Enter Pattiyal Number" />
          <button className="btn-sm btn-visible-hover" onClick={handleFilterToggle}>
            <i className="ri-sort-desc"></i>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#ebeff3]">
        {selectedIds.length > 1 && (
          <div className="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 badge-selected">
            {selectedIds.length} Pattiyals selected
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
                      <span>In Time</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Out Time</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Point Approval</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Rate Approval</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="last-th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Pattiyal Approval</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingPattiyals.map((pattiyal, index) => (
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
                    <td className="td-cell">{pattiyal.inTime}</td>
                    <td className="td-cell">{pattiyal.outTime}</td>
                    <td className="td-cell">
                      <span className={`px-2 py-1 rounded text-xs ${
                        pattiyal.pointApproval === 'Approved' ? 'bg-green-100 text-green-800' : 
                        pattiyal.pointApproval === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {pattiyal.pointApproval}
                      </span>
                    </td>
                    <td className="td-cell">
                      <span className={`px-2 py-1 rounded text-xs ${
                        pattiyal.rateApproval === 'Approved' ? 'bg-green-100 text-green-800' : 
                        pattiyal.rateApproval === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {pattiyal.rateApproval}
                      </span>
                    </td>
                    <td className="last-td-cell">
                      <span className={`px-2 py-1 rounded text-xs ${
                        pattiyal.pattiyalApproval === 'Approved' ? 'bg-green-100 text-green-800' : 
                        pattiyal.pattiyalApproval === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {pattiyal.pattiyalApproval}
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
          Showing <span className="text-red-600">{pendingPattiyals.length}</span> of <span className="text-blue-600">{pendingPattiyals.length}</span>
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
              <label className="filter-label">Pattiyal Number</label>
              <input
                type="text"
                placeholder="Enter pattiyal number"
                className="form-control"
                value={localFilters.pattiyalNumber || ''}
                onChange={(e) => handleFilterInputChange('pattiyalNumber', e.target.value)}
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
            <div className="mb-4">
              <label className="filter-label">Approval Status</label>
              <select 
                className="form-control"
                value={localFilters.approvalStatus || ''}
                onChange={(e) => handleFilterInputChange('approvalStatus', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="approved">Approved</option>
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

export default PendingPattiyalTable; 