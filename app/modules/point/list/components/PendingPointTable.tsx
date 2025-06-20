 "use client";

import { useEffect, useState } from "react";
import { dummyPoints } from "@/app/data/JSON"; // Assuming this path is correct

interface PendingPoint {
  id: number;
  date: string;
  waymentNo: string;
  PointNo: string;
  vehicleNo: string;
  partLoad: string;
  inTime: string;
  outTime: string;
  pointApproval: string;
  rateApproval: string;
  PointApproval: string;
  weight: string;
  variety: string;
  weightAvgPoint: string;
  // Add new fields for the modal's editable data
  customerName?: string;
  driverName?: string;
  noOfPartLoads?: string;
  material?: string;
  place?: string;
  remarks?: string;
  firstWeight?: string;
  secondWeight?: string;
  netWeight?: string;
  billWeight?: string;
  materialType?: string;
  soilLossPercentage?: string;
}

interface PendingPointTableProps {
  onSidebarToggle: () => void;
}

const PendingPointTable: React.FC<PendingPointTableProps> = ({ onSidebarToggle }) => {
  const [pendingPoints, setPendingPoints] = useState<PendingPoint[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [localFilters, setLocalFilters] = useState<any>({});

  // State for the Edit Point Data modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<PendingPoint | null>(null);

  const fetchPendingPoints = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      // For demonstration, adding some dummy values for new fields
      const updatedDummyPoints = dummyPoints.map(point => ({
        ...point,
        customerName: "Customer " + point.id,
        driverName: "Driver " + point.id,
        noOfPartLoads: String(Math.floor(Math.random() * 5)),
        material: "Material " + (point.id % 3 + 1),
        place: "Place " + (point.id % 2 + 1),
        remarks: "Remarks for " + point.id,
        firstWeight: (parseFloat(point.weight) + 500).toFixed(2),
        secondWeight: (parseFloat(point.weight) - 200).toFixed(2),
        netWeight: point.weight,
        billWeight: (parseFloat(point.weight) * 0.98).toFixed(2),
        materialType: point.id % 2 === 0 ? "Type A" : "Type B",
        soilLossPercentage: (Math.random() * 5).toFixed(2),
      }));
      setPendingPoints(updatedDummyPoints as PendingPoint[]);
    } catch (err) {
      console.error("Error fetching pending Points:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch pending Points";
      setError(errorMessage);
      setPendingPoints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPoints();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedIds(checked ? pendingPoints.map((p) => p.id) : []);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleRefresh = () => {
    fetchPendingPoints();
  };

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
    setSelectAll(pendingPoints.length > 0 && selectedIds.length === pendingPoints.length);
  }, [selectedIds, pendingPoints]);

  // Apply filters to the displayed data
  const filteredPoints = pendingPoints.filter((point) => {
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
      if (filters.approvalStatus === 'pending' && point.PointApproval !== 'Pending') {
        return false;
      }
    }
    if (filters.variety && !point.variety.toLowerCase().includes(filters.variety.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Modal functions
  const openModal = (point: PendingPoint) => {
    setEditData(point);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null); // Clear edit data when closing
  };

  const SaveEdit = () => {
    if (editData) {
      // Find the index of the item to update
      const index = pendingPoints.findIndex(point => point.id === editData.id);

      if (index !== -1) {
        // Create a new array with the updated item
        const updatedPoints = [...pendingPoints];
        updatedPoints[index] = editData;
        setPendingPoints(updatedPoints);
        console.log("Updated Point Data:", editData); // Log the updated data
      }
    }
    closeModal();
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg font-medium text-gray-700">Loading pending Points...</div>
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
        <div className="text-lg text-gray-500">No pending Points available based on current filters.</div>
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

              <button className="btn-sm btn-visible-hover" id="bulkActionsBtn" onClick={() => { setSelectAll(true); setSelectedIds(pendingPoints.map((p) => p.id)); }}>
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
                      <span>Wayment No</span>
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
                      <span>Variety</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Weight</span>
                      <i className="dropdown-icon-hover ri-arrow-down-s-fill"></i>
                    </div>
                  </th>
                  <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span> Avg Point</span>
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
                {filteredPoints.map((point, index) => (
                  <tr key={point.id} className={`tr-hover group ${selectedIds.includes(point.id) ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}`}>
                    <td className="td-cell"><input type="checkbox" className="form-check" checked={selectedIds.includes(point.id)} onChange={() => handleCheckboxChange(point.id)} /></td>
                    <td className="td-cell">
                      <span className="float-left">{index + 1}</span>
                      <span className="float-right">
                        <i
                          className="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100 cursor-pointer"
                          onClick={() => openModal(point)} // Call openModal with the current point data
                        ></i>
                      </span>
                    </td>
                    <td className="td-cell">{point.date}</td>
                    <td className="td-cell">{point.waymentNo}</td>
                    <td className="td-cell">{point.PointNo}</td>
                    <td className="td-cell">{point.vehicleNo}</td>
                    <td className="td-cell">{point.variety}</td>
                    <td className="td-cell">{point.weight}</td>
                    <td className="td-cell">{point.weightAvgPoint}</td>
                    <td className="td-cell">{point.partLoad}</td>
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
          Showing <span className="text-red-600">{filteredPoints.length}</span> of <span className="text-blue-600">{pendingPoints.length}</span>
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

      {/* Edit Point Data Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[0.5rem] w-full max-w-[60%] min-h-[calc(100vh-250px)] flex flex-col custom-helvetica">
            {/* Modal Header */}
            <div className="relative border-b border-[#dee2e6] px-4 py-2 bg-[#f8f8f8] rounded-tl-md">
              <span className="text-[16px] text-[#212529]">Edit Point Data</span>
              <button
                onClick={closeModal}
                className="absolute -top-[10px] -right-[10px] text-gray-500 hover:text-gray-700 bg-[#909090] hover:bg-[#cc0000] rounded-full w-[30px] h-[30px] border-2 border-white cursor-pointer"
              >
                <i className="ri-close-line text-white"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="row p-[16px] m-0 flex-1 flex flex-col overflow-auto max-h-[calc(100vh-200px)]">
              <div className="grid grid-cols-12 flex-1 ">
                <div className="col-span-12 overflow-y-auto pr-2 ">
                  <div className="space-y-6">
                    {/* Summary Card – Redesigned */}
                    <div className=" p-4 bg-white rounded-xl border border-gray-200 shadow-md">
                      <div className="text-sm font-semibold text-gray-800 mb-3 border-b pb-2">
                        Summary Info
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-sm text-gray-700">
                        {/* Vehicle No - Text Highlighted */}
                        <div>
                          <label className="form-label">Vehicle No</label>
                          <p className="text-[16px] font-bold text-green-700">
                            {editData?.vehicleNo || "-"}
                          </p>
                        </div>

                        <div>
                          <label className="form-label">Wayment No</label>
                          <p className="text-[16px] font-bold text-green-700">
                            {editData?.waymentNo || "-"}
                          </p>
                        </div>

                        <div>
                          <label className="form-label">Soil Loss (%)</label>
                          <div className="flex items-center gap-2">
                            <span className="text-green-700 font-bold text-[16px]">
                              {editData?.soilLossPercentage || "-"}
                            </span>
                          </div>
                        </div>

                        {/* Material Type - Text Highlighted */}
                        <div>
                          <label className="form-label">Material Type</label>
                          <div className="flex items-center gap-2">
                            <span className="text-green-700 font-bold text-[16px]">
                              {editData?.materialType || "-"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlighted Weights - Individually Colored */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {/* First Weight */}
                        <div className="p-3 rounded-lg bg-blue-50 border-l-4 border-blue-600 shadow-sm">
                          <div className="text-xs text-gray-600">
                            First Weight
                          </div>
                          <div className="text-lg font-extrabold text-black leading-tight">
                            {editData?.firstWeight || "-"}
                          </div>
                        </div>

                        {/* Second Weight */}
                        <div className="p-3 rounded-lg bg-purple-50 border-l-4 border-purple-600 shadow-sm">
                          <div className="text-xs text-gray-600">
                            Second Weight
                          </div>
                          <div className="text-lg font-extrabold text-black leading-tight">
                            {editData?.secondWeight || "-"}
                          </div>
                        </div>

                        {/* Net Weight */}
                        <div className="p-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-500 shadow-sm">
                          <div className="text-xs text-gray-600">
                            Net Weight (Kgs)
                          </div>
                          <div className="text-lg font-extrabold text-black leading-tight">
                            {editData?.netWeight || "-"}
                          </div>
                        </div>

                        {/* Bill Weight */}
                        <div className="p-3 rounded-lg bg-teal-50 border-l-4 border-teal-600 shadow-sm">
                          <div className="text-xs text-gray-600">
                            Bill Weight (Kgs)
                          </div>
                          <div className="text-lg font-extrabold text-black leading-tight">
                            {editData?.billWeight || "-"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-300 my-6"></div>

                    {/* Editable Fields */}
                    <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label className="form-label ms-5 w-1/2">Customer Name</label>
                      <input
                        type="text"
                        value={editData?.customerName || ""}
                        placeholder="Enter Customer Name"
                        className="form-control capitalize text-[#000]"
                        onChange={(e) =>
                          setEditData({
                            ...(editData as PendingPoint), // Cast to PendingPoint
                            customerName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label className="form-label ms-5 w-1/2">Driver Name</label>
                      <input
                        type="text"
                        value={editData?.driverName || ""}
                        placeholder="Enter Driver Name"
                        className="form-control capitalize text-[#000]"
                        onChange={(e) =>
                          setEditData({
                            ...(editData as PendingPoint),
                            driverName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label className="form-label ms-5 w-1/2">No. of Part Loads</label>
                      <input
                        type="text"
                        value={editData?.noOfPartLoads || ""}
                        placeholder="0"
                        className="form-control only_number text-[#000]"
                        onChange={(e) =>
                          setEditData({
                            ...(editData as PendingPoint),
                            noOfPartLoads: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label className="form-label ms-5 w-1/2">Material</label>
                      <input
                        type="text"
                        value={editData?.material || ""}
                        placeholder="Enter Material"
                        className="form-control capitalize text-[#000]"
                        onChange={(e) =>
                          setEditData({ ...(editData as PendingPoint), material: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label className="form-label ms-5 w-1/2">Variety</label>
                      <input
                        type="text"
                        value={editData?.variety || ""}
                        placeholder="Enter Variety"
                        className="form-control capitalize text-[#000] "
                        onChange={(e) =>
                          setEditData({ ...(editData as PendingPoint), variety: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label className="form-label ms-5 w-1/2">Place</label>
                      <input
                        type="text"
                        value={editData?.place || ""}
                        placeholder="Enter Place"
                        className="form-control capitalize text-[#000]"
                        onChange={(e) =>
                          setEditData({ ...(editData as PendingPoint), place: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label className="form-label ms-5 w-1/2">Remarks</label>
                      <textarea
                        placeholder="Enter Remarks"
                        value={editData?.remarks || ""}
                        onChange={(e) =>
                          setEditData({
                            ...(editData as PendingPoint),
                            remarks: e.target.value,
                          })
                        }
                        rows={3}
                        className="form-control h-[40px] capitalize text-[#000] "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Footer Buttons */}
            <div className="sticky bottom-0 bg-[#ebeff3] h-[60px] py-3 px-4 flex justify-end space-x-4 z-10 rounded-b-lg">

              <button className="btn-sm btn-primary" onClick={SaveEdit}>Save</button>
              <button onClick={closeModal} className="btn-sm btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingPointTable;