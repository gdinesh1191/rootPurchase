"use client";

import { useEffect, useState } from "react";
import DatePicker from "@/app/utils/datepicker";
import { RadioGroup } from "@/app/utils/form-controls";
import { waymentMockData } from "@/app/data/JSON";

interface Wayment {
  id: number;
  customerName: string;
  waymentNo: string;
  vehicleNo: string;
  materialType: string;
  variety: string;
  netWeight: string;
  place: string;
  driverName: string;
  material: string;
  noOfPartLoads: string;
  firstWeight: string;
  secondWeight: string;
  billWeight: string;
  soilLossPercentage: string;
  remarks: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditData, setEditData] = useState<any>(null);

  const fetchWayment = async () => {
    try {
      setLoading(true);
      setError(null);
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


    const handleEdit = (item: any) => {
    console.log("Editing item:", item);
    setEditData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const SaveEdit = () => {
    console.log("Saving edited data:", EditData);
    // Here you would typically send the updated data to your API
    setIsModalOpen(false);
  };

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
                   <th className="th-cell">
                    <div className="flex justify-between items-center gap-1">
                      <span>Bill Weight</span>
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
                {wayment.map((wayment, index) => (
                  <tr
                    key={wayment.id}
                    className={`tr-hover group ${
                      selectedIds.includes(wayment.id)
                        ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]"
                        : ""
                    }`}
                  >
                    <td className="td-cell">
                      <input
                        type="checkbox"
                        className="form-check"
                        checked={selectedIds.includes(wayment.id)}
                        onChange={() => handleCheckboxChange(wayment.id)}
                      />
                    </td>
                    <td className="td-cell">
                      <span className="float-left">{index + 1}</span>
                      <span className="float-right" onClick={() => handleEdit(wayment)}>
                        <i className="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i>
                      </span>
                    </td>
                    <td className="td-cell">{wayment.customerName}</td>
                    <td className="td-cell">{wayment.waymentNo}</td>
                    <td className="td-cell">{wayment.vehicleNo}</td>
                    <td className="td-cell">{wayment.materialType}</td>
                    <td className="td-cell">{wayment.variety}</td>
                    <td className="td-cell">{wayment.netWeight}</td>
                    <td className="td-cell">{wayment.billWeight}</td>
                    <td className="td-cell">{wayment.place}</td>
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


         {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[0.5rem] w-full max-w-[60%] min-h-[calc(100vh-250px)] flex flex-col custom-helvetica">
            {/* Modal Header */}
            <div className="relative border-b border-[#dee2e6] px-4 py-2 bg-[#f8f8f8] rounded-tl-md">
              <span className="text-[16px] text-[#212529]">Edit Wayment Data</span>
              <button
                onClick={closeModal}
                className="absolute -top-[10px] -right-[10px] text-gray-500 hover:text-gray-700 bg-[#909090] hover:bg-[#cc0000] rounded-full w-[30px] h-[30px] border-2 border-white cursor-pointer"
              >
                <i className="ri-close-line text-white"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="row p-[16px] m-0 flex-1 flex flex-col overflow-auto max-h-[calc(100vh-345px)]">
              <div className="grid grid-cols-12 flex-1 ">
                <div className="col-span-12 overflow-y-auto pr-2 ">
                  <div className="space-y-6">
                    {/* Summary Card – Redesigned */}
                    {/* Summary Card */}
                    <div className=" p-4 bg-white rounded-xl border border-gray-200 shadow-md">
                      <div className="text-sm font-semibold text-gray-800 mb-3 border-b pb-2">
                        Summary Info
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-sm text-gray-700">
                        {/* Vehicle No - Text Highlighted */}
                        <div>
                          <label className="form-label">Vehicle No</label>
                          <p className="text-[16px] font-bold text-green-700">
                            {EditData?.vehicleNo || "-"}
                          </p>
                        </div>

                         <div>
                          <label className="form-label">Wayment No</label>
                          <p className="text-[16px] font-bold text-green-700">
                            {EditData?.waymentNo || "-"}
                          </p>
                        </div>

                        <div>
                          <label className="form-label">Soil Loss (%)</label>
                          <div className="flex items-center gap-2">
                            <span className="text-green-700 font-bold text-[16px]">
                              {EditData?.soilLossPercentage || "-"}
                            </span>
                          </div>
                        </div>

                        {/* Material Type - Text Highlighted */}
                        <div>
                          <label className="form-label">Material Type</label>
                          <div className="flex items-center gap-2">
                            <span className="text-green-700 font-bold text-[16px]">
                              {EditData?.materialType || "-"}
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
                           {EditData?.firstWeight || "-"}
                          </div>
                        </div>

                        {/* Second Weight */}
                        <div className="p-3 rounded-lg bg-purple-50 border-l-4 border-purple-600 shadow-sm">
                          <div className="text-xs text-gray-600">
                            Second Weight
                          </div>
                          <div className="text-lg font-extrabold text-black leading-tight">
                            {EditData?.secondWeight || "-"  }
                          </div>
                        </div>

                        {/* Net Weight */}
                        <div className="p-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-500 shadow-sm">
                          <div className="text-xs text-gray-600">
                            Net Weight (Kgs)
                          </div>
                          <div className="text-lg font-extrabold text-black leading-tight">
                            {EditData?.netWeight || "-"}
                          </div>
                        </div>

                        {/* Bill Weight */}
                        <div className="p-3 rounded-lg bg-teal-50 border-l-4 border-teal-600 shadow-sm">
                          <div className="text-xs text-gray-600">
                            Bill Weight (Kgs)
                          </div>
                          <div className="text-lg font-extrabold text-black leading-tight">
                            {EditData?.billWeight || "-"}
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
                          value={EditData?.customerName || ""}
                          placeholder="Enter Customer Name"
                          className="form-control capitalize text-[#000]"
                          onChange={(e) =>
                            setEditData({
                              ...EditData,
                              customerName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <label className="form-label ms-5 w-1/2">Driver Name</label>
                        <input
                          type="text"
                          value={EditData?.driverName || ""}
                          placeholder="Enter Driver Name"
                          className="form-control capitalize text-[#000]"
                          onChange={(e) =>
                            setEditData({
                              ...EditData,
                              driverName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <label className="form-label ms-5 w-1/2">No. of Part Loads</label>
                        <input
                          type="text"
                          value={EditData?.noOfPartLoads || ""}
                          placeholder="0"
                          className="form-control only_number text-[#000]"
                          onChange={(e) =>
                            setEditData({
                              ...EditData,
                              noOfPartLoads: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div  className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <label className="form-label ms-5 w-1/2">Material</label>
                        <input
                          type="text"
                          value={EditData?.material || ""}
                          placeholder="Enter Material"
                          className="form-control capitalize text-[#000]"
                          onChange={(e) =>
                            setEditData({...EditData, material: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <label className="form-label ms-5 w-1/2">Variety</label>
                        <input
                          type="text"
                          value={EditData?.variety || ""}
                          placeholder="Enter Variety"
                          className="form-control capitalize text-[#000] "
                          onChange={(e) =>
                            setEditData({...EditData, variety: e.target.value })
                          }
                        />
                      </div>

                      <div  className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <label className="form-label ms-5 w-1/2">Place</label>
                        <input
                          type="text"
                          value={EditData?.place || ""}
                          placeholder="Enter Place"
                          className="form-control capitalize text-[#000]"
                          onChange={(e) =>
                            setEditData({...EditData, place: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <label className="form-label ms-5 w-1/2">Remarks</label>
                        <textarea
                          placeholder="Enter Remarks"
                          value={EditData?.remarks || ""}
                          onChange={(e) =>
                            setEditData({
                              ...EditData,
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
            <div className="sticky bottom-0 bg-[#ebeff3] h-[60px] py-3 px-4 flex justify-end space-x-4 z-10">
              <button className="btn-sm btn-primary" onClick={SaveEdit}>Save</button>
              <button onClick={closeModal} className="btn-sm btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
