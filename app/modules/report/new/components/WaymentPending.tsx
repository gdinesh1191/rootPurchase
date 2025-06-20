 // components/Reports/WaymentPending.tsx
'use client';

import { useState } from 'react';

interface WaymentPendingProps {
  activeReport: string | null;
  activeCategory: string | null;
}

const WaymentPending: React.FC<WaymentPendingProps> = ({ activeReport, activeCategory }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const vehicles = [
    { id: 1, number: "TN29N1sd212", owner: "Asadfsdrumugam", chassis: "AD33323C3212", fcExpiry: "12/02/2023", status: "Active", nextDue: "22/08/2025", year: 2017 },
    { id: 2, number: "TN45Z2321", owner: "Kumar", chassis: "ZX92133QWER", fcExpiry: "01/05/2024", status: "In-Active", nextDue: "15/09/2025", year: 2015 },
    { id: 3, number: "TN37A5678", owner: "Ravi", chassis: "CH45321ZX", fcExpiry: "30/11/2022", status: "Active", nextDue: "10/10/2025", year: 2019 },
    { id: 4, number: "TN10B1234", owner: "Suresh", chassis: "GH12345JKL", fcExpiry: "05/04/2023", status: "Active", nextDue: "01/12/2025", year: 2016 },
    { id: 5, number: "TN11C5678", owner: "Venkatesh", chassis: "KL98765YTR", fcExpiry: "10/06/2024", status: "In-Active", nextDue: "25/01/2026", year: 2014 },
    { id: 6, number: "TN12D9101", owner: "Mohan", chassis: "MN56789ASD", fcExpiry: "20/03/2023", status: "Active", nextDue: "15/05/2026", year: 2018 },
    { id: 7, number: "TN13E1213", owner: "Rajesh", chassis: "PO34567FGH", fcExpiry: "01/12/2022", status: "In-Active", nextDue: "10/04/2026", year: 2013 },
    { id: 8, number: "TN14F1415", owner: "Balaji", chassis: "QR56789LKJ", fcExpiry: "25/10/2023", status: "Active", nextDue: "05/02/2026", year: 2020 },
    { id: 9, number: "TN15G1617", owner: "Saravanan", chassis: "ST45678MNB", fcExpiry: "30/08/2022", status: "In-Active", nextDue: "20/06/2026", year: 2012 },
    { id: 10, number: "TN16H1819", owner: "Prakash", chassis: "UV12345XCV", fcExpiry: "15/09/2024", status: "Active", nextDue: "30/07/2026", year: 2015 },
    { id: 11, number: "TN17J2021", owner: "Naveen", chassis: "WX56789ZXC", fcExpiry: "18/01/2023", status: "Active", nextDue: "12/03/2026", year: 2011 },
    { id: 12, number: "TN18K2223", owner: "Dinesh", chassis: "YU34567BNM", fcExpiry: "12/07/2023", status: "In-Active", nextDue: "22/08/2026", year: 2016 },
    { id: 13, number: "TN19L2425", owner: "Sathish", chassis: "IO78945VFR", fcExpiry: "11/02/2024", status: "Active", nextDue: "18/10/2026", year: 2013 },
    { id: 14, number: "TN20M2627", owner: "Karthik", chassis: "PL90876TRE", fcExpiry: "29/05/2022", status: "In-Active", nextDue: "09/09/2026", year: 2014 },
    { id: 15, number: "TN21N2829", owner: "Vijay", chassis: "MJ12346UYT", fcExpiry: "06/11/2024", status: "Active", nextDue: "30/11/2026", year: 2017 },
    { id: 16, number: "TN22P3031", owner: "Manoj", chassis: "NH54321REW", fcExpiry: "03/08/2023", status: "In-Active", nextDue: "01/03/2026", year: 2010 },
    { id: 17, number: "TN23Q3233", owner: "Ramesh", chassis: "BT65432PLK", fcExpiry: "12/04/2023", status: "Active", nextDue: "04/06/2026", year: 2019 },
    { id: 18, number: "TN24R3435", owner: "Selvam", chassis: "CW87654QAZ", fcExpiry: "09/10/2024", status: "Active", nextDue: "15/08/2026", year: 2018 },
    { id: 19, number: "TN25S3637", owner: "Ganesh", chassis: "XZ12345WSX", fcExpiry: "22/09/2023", status: "In-Active", nextDue: "19/12/2026", year: 2012 },
    { id: 20, number: "TN26T3839", owner: "Harish", chassis: "CV09876EDC", fcExpiry: "17/06/2022", status: "Active", nextDue: "07/07/2026", year: 2016 },
          ];

  // Assuming you might want to filter later, keep this as is for now.
  const filteredVehicles = vehicles;

  return (
    <main className="flex-1">
      <h4 className="text-l font-medium p-2 text-[#009333]">
        {activeCategory} {activeReport} Report
      </h4>

      <div>
        <div className="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
          <div className="flex items-center space-x-2 ml-2">
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

            <button className="btn-sm !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="bulkActionsBtn">
              <i className="ri-stack-fill mr-1"></i>
              Bulk Actions
            </button>

            <div id="bulkActionButtons" className="bulk-actions flex items-center space-x-2">
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="cancelSelectionBtn" style={{ display: "none" }}>
                <i className="ri-close-line"></i>
                Cancel
              </button>
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn" style={{ display: "none" }}>
                <i className="ri-delete-bin-6-line"></i>
                Delete
              </button>
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="downloadBtn" style={{ display: "none" }}>
                <i className="ri-arrow-down-line"></i>
                Download
              </button>
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="printBtn" style={{ display: "none" }}>
                <i className="ri-printer-line"></i>
                Print
              </button>
              <button className="btn-sm !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="summaryBtn" style={{ display: "none" }}>
                <i className="ri-sticky-note-line"></i>
                Summary
              </button>
            </div>
          </div>

          <div className="flex items-center relative space-x-2">
            <input className="form-control !h-[31px]" type="text" placeholder="Enter Vehicle Number" />
            <button className="btn-sm !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" onClick={() => setIsSidebarOpen(true)}>
              <i className="ri-sort-desc"></i>
            </button>
          </div>
        </div>
      </div>

      {/* --- Table Section Added Below --- */}
      <div className="bg-[#ebeff3]">
            <div className="mx-2  h-[calc(100vh-170px)] overflow-hidden rounded-lg bg-white">
                <div className="h-full overflow-y-auto">
                    <table className="w-full border-collapse">
                        <thead className="sticky-table-header">
                            <tr>
                                <th className="th-cell" id="checkboxColumn">
                                    <input type="checkbox" id="selectAll" className="form-check" />
                                </th>
                                <th className="th-cell">
                                    <div className="flex justify-between items-center gap-1">
                                        <span>S.No.</span>
                                    </div>
                                </th>
                                <th className="th-cell">
                                    <div className="flex justify-between items-center gap-1">
                                        <span>Vehicle Number</span>
                                        <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                                    </div>
                                </th>
                                <th className="th-cell">
                                    <div className="flex justify-between items-center gap-1">
                                        <span>Owner Name</span>
                                        <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                                    </div>
                                </th>
                                <th className="th-cell">
                                    <div className="flex justify-between items-center gap-1">
                                        <span>Chassis Number</span>
                                        <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                                    </div>
                                </th>
                                <th className="th-cell">
                                    <div className="flex justify-between items-center gap-1">
                                        <span>FC Expiry Date</span>
                                        <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                                    </div>
                                </th>
                                <th className="th-cell">
                                    <div className="flex justify-between items-center gap-1">
                                        <span>Status</span>
                                        <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                                    </div>
                                </th>
                                <th className="th-cell">
                                    <div className="flex justify-between items-center gap-1">
                                        <span>Next Due</span>
                                        <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                                    </div>
                                </th>
                                <th className="last-th-cell">
                                    <div className="flex justify-between items-center gap-1">
                                        <span>Year</span>
                                        <i className="dropdown-hover ri-arrow-down-s-fill cursor-pointer"></i>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle, index) => (
                                <tr key={vehicle.id} className="group hover:bg-[#f5f7f9] text-sm cursor-pointer">
                                    <td className="td-cell">
                                        <input type="checkbox" className="form-check" />
                                    </td>
                                    <td className="td-cell">
                                        <span className="float-left">{index + 1}</span>
                                        <span className="float-right cursor-pointer">
                                            <i className="p-1 rounded border border-[#cfd7df] text-[#4d5e6c] ri-pencil-fill opacity-0 group-hover:opacity-100"></i>
                                        </span>
                                    </td>
                                    <td className="td-cell">{vehicle.number}</td>
                                    <td className="td-cell">{vehicle.owner}</td>
                                    <td className="td-cell">{vehicle.chassis}</td>
                                    <td className="td-cell">{vehicle.fcExpiry}</td>
                                    <td className="td-cell">{vehicle.status}</td>
                                    <td className="td-cell">{vehicle.nextDue}</td>
                                    <td className="last-td-cell">{vehicle.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      {/* --- End of Table Section --- */}


      <footer className="bg-[#ebeff3] py-3  px-4 flex items-center justify-start">
        <span className="text-sm">
          Showing <span className="text-red-600">{filteredVehicles.length}</span> of <span className="text-blue-600">{vehicles.length}</span>
        </span>
      </footer>

      {/* Offcanvas Sidebar (Filters) */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)]" onClick={() => setIsSidebarOpen(false)}></div>

        {/* Sidebar Content */}
        <div className={`relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>

          {/* Header */}
          <div className="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center">
            <h5 className="text-sm text-[#12344d]">Add Filters</h5>
            <button onClick={() => setIsSidebarOpen(false)} className="text-[#12344d] cursor-pointer">
              <i className="ri-close-line"></i>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 overflow-y-auto flex-1">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#000000] mb-1.5">Vehicle Number</label>
              <input type="text" placeholder="Enter vehicle number" className="form-control" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#000000] mb-1.5">Owner Name</label>
              <input type="text" placeholder="Enter owner name" className="form-control" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#000000] mb-1.5">Chassis Number</label>
              <input type="text" placeholder="Enter chassis number" className="form-control" />
            </div>

            {/* Add more filters as needed */}
          </div>

          <div className="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button className="btn-sm btn-light" onClick={() => { setIsSidebarOpen(false); }}>
              Reset All
            </button>
            <button className="btn-sm btn-primary" onClick={() => { setIsSidebarOpen(false); }}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WaymentPending;