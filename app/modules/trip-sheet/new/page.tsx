"use client";

import { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";

// Form field components for reusability
const FormField = ({ label, required = false, children, className = "" }: {
  label: string; required?: boolean; children: React.ReactNode; className?: string;
}) => (
  <div className={`mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4 ${className}`}>
    <label className="form-label w-50">
      {label}{required && <span className="form-required text-red-500">*</span>}
    </label>
    <div className="flex flex-col w-3/4 flex-grow">{children}</div>
  </div>
);

const Input = ({ name, placeholder, type = "text", className = "", ...props }: {
  name: string; placeholder?: string; type?: string; className?: string; [key: string]: any;
}) => (
  <input type={type} name={name} placeholder={placeholder} className={`form-control ${className}`} {...props} />
);

export default function NewTrip() {
  const [tripDate, setTripDate] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [otherCharges, setOtherCharges] = useState("0");
  const initialModalRef = useRef<HTMLDivElement | null>(null);

  const isTripValid = Boolean(tripDate && vehicleNumber && driverName);

  useEffect(() => {
    const createTripBtn = document.getElementById("createTrip") as HTMLButtonElement;
    if (createTripBtn) {
      createTripBtn.disabled = !isTripValid;
    }
  }, [tripDate, vehicleNumber, driverName]);

  const handleCreateTrip = () => {
    if (isTripValid) {
      setShowForm(true);
      if (initialModalRef.current) initialModalRef.current.classList.add("hidden");
    }
  };

  const handleCancelTrip = () => {
    if (initialModalRef.current) initialModalRef.current.classList.add("hidden");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleType = (document.querySelector('[name="vehicleType"]') as HTMLSelectElement)?.value;
    const fromPlace = (document.querySelector('[name="fromPlace"]') as HTMLInputElement)?.value.trim();
    const toPlace = (document.querySelector('[name="toPlace"]') as HTMLInputElement)?.value.trim();

    const rows = document.querySelectorAll("#productTableBody tr");
    const itemDetailsPayload: any[] = [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const item = {
        itemName: cells[1]?.querySelector("input")?.value.trim() || "",
        remarks: cells[2]?.querySelector("input")?.value.trim() || "",
        quantity: cells[3]?.querySelector("input")?.value.trim() || "",
        rent: cells[4]?.querySelector("input")?.value.trim() || "",
        total: cells[5]?.querySelector("input")?.value.trim() || "",
      };

      if (item.itemName || item.remarks || item.quantity || item.rent || item.total) {
        itemDetailsPayload.push(item);
      }
    });

    const subtotal = "0";
    const netTotal = (parseFloat(subtotal) + parseFloat(otherCharges || "0")).toFixed(2);

    const payload = {
      agentBrokerName: vehicleType,
      fromPlace,
      toPlace,
      tripDate,
      vehicleNumber,
      driverName,
      itemDetails: itemDetailsPayload,
      subTotal: subtotal,
      otherCharges,
      netTotal,
    };

    console.log("Form is valid. Submitting...", payload);
  };

  const TableRow = ({ index }: { index: number }) => (
    <tr>
      <td className="p-2 text-center w-[3%]">{index}</td>
      <td className="p-2 w-[30%]">
        <input type="text" className="w-full form-control" placeholder="Enter Item Name" />
      </td>
      <td className="p-2 w-[15%]">
        <input type="text" className="w-full form-control" placeholder="Enter Remarks" />
      </td>
      <td className="p-2 w-[15%]">
        <input type="text" className="w-full form-control" placeholder="Enter Quantity" />
      </td>
      <td className="p-2 w-[15%]">
        <input type="text" className="w-full form-control" placeholder="Enter Rent" />
      </td>
      <td className="p-2 w-[15%]">
        <input type="text" className="w-full text-right form-control total" placeholder="Auto-calculated Total" readOnly />
      </td>
      <td className="p-2 text-center w-[7%]">
        <button className="text-blue-600 edit-row mx-1 cursor-pointer">
          <i className="ri-edit-line text-[16px]"></i>
        </button>
        <button className="text-red-600 delete-row mx-1 cursor-pointer">
          <i className="ri-delete-bin-line text-[16px]"></i>
        </button>
      </td>
    </tr>
  );

  return (
    <Layout pageTitle="NewTrip">
      <div className="flex-1">
        {showForm && (
          <main id="main-content" className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 h-[calc(100vh-103px)] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
                  <div className="space-y-4">
                    <FormField label="Agent / Broker Name" required>
                      <select name="vehicleType" className="form-control text-[14px]" data-validate="required">
                        <option value="">Select Agent / Broker Name</option>
                        <option value="40">Karthi</option>
                        <option value="39">Kumar</option>
                        <option value="41">Hardik</option>
                      </select>
                    </FormField>
                    <FormField label="Place From" required>
                      <Input name="fromPlace" placeholder="Enter place from" className="form-control numbers-decimal" data-validate="required" />
                    </FormField>
                    <FormField label="Place To" required>
                      <Input name="toPlace" placeholder="Enter Place to" className="form-control numbers-decimal" data-validate="required" />
                    </FormField>
                  </div>
                </div>

                <h2 className="text-lg text-[#009333] mb-4">Item Details</h2>

                <table className="w-full text-sm">
                  <thead className="bg-[#f8f9fa] text-left text-[#12344d]">
                    <tr>
                      <td className="p-2 w-[3%]">S.no</td>
                      <td className="p-2 w-[30%]">Item Name</td>
                      <td className="p-2 w-[15%]">Remarks</td>
                      <td className="p-2 w-[15%]">Quantity</td>
                      <td className="p-2 w-[15%]">Rent</td>
                      <td className="p-2 w-[15%] text-right">Total Amount</td>
                      <td className="p-2 w-[7%] text-center">Action</td>
                    </tr>
                  </thead>
                  <tbody id="productTableBody">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <TableRow key={index} index={index} />
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="ml-5">
                    <button type="button" className="bg-[#f1f1fa] text-[14px] text-[#212529] py-[0.375rem] px-[0.75rem] rounded-[0.375rem] cursor-pointer flex items-center gap-1">
                      <i className="ri-add-circle-fill text-[15px] text-[#009333]"></i>
                      Add New Item
                    </button>
                  </div>

                  <div className="bg-[#f9f9fb] p-4 rounded-xl w-full md:max-w-md space-y-4 text-sm text-[#212529] md:mr-[6.5%]">
                    <div className="flex items-center justify-between gap-2">
                      <span>Sub Total</span>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="Auto-calculated subtotal" className="w-full text-right form-control subtotal" value={"0.00"} readOnly />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span>Other Charges</span>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="Enter Other Charges" className="w-full text-right form-control other charges" />
                      </div>
                    </div>
                    <hr className="my-2 border-t border-gray-200" />
                    <div className="flex justify-between items-center font-semibold text-base">
                      <span className="pl-2">Net Total</span>
                      <span className="pr-2 text-[#009333]">0.00</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </main>
        )}

        <div id="initial-modal" ref={initialModalRef} className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div className="bg-white rounded-[0.5rem] shadow-lg w-[480px] p-[2rem]">
            <h2 className="text-xl text-[#000000] flex items-center justify-center gap-2">
              <i className="ri-bus-2-line text-[#009333] text-2xl"></i>
              Create a New Trip
            </h2>
            <p className="text-[#374151] mt-[16px] text-center">
              To create a new trip, please fill in the details below to help us process your request smoothly.
            </p>
            <form className="space-y-4 mt-[16px]">
              <div>
                <label className="block w-full form-label">Trip Date</label>
                <input type="date" id="tripDate" className="w-full form-control" value={tripDate} onChange={(e) => setTripDate(e.target.value)} />
              </div>
              <div>
                <label className="block w-full form-label">Vehicle Number</label>
                <select id="vehicleNumber" className="w-full form-control" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)}>
                  <option value="">Select vehicle</option>
                  <option value="TN01AB1234">TN01AB1234</option>
                  <option value="TN02CD5678">TN02CD5678</option>
                </select>
              </div>
              <div>
                <label className="block w-full form-label">Driver Name</label>
                <select id="driverName" className="w-full form-control" value={driverName} onChange={(e) => setDriverName(e.target.value)}>
                  <option value="">Select driver</option>
                  <option value="John">John</option>
                  <option value="Michael">Michael</option>
                </select>
              </div>
            </form>
            <div className="mt-8 flex justify-end space-x-3">
              <button onClick={handleCancelTrip} className="btn-sm btn-secondary">Cancel</button>
              <button id="createTrip" onClick={handleCreateTrip} className={`btn-sm btn-primary ${!isTripValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} disabled={!isTripValid}>
                Create Trip
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <footer className="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex justify-start gap-2">
            <button type="submit" onClick={handleSubmit} className="btn-sm btn-primary">Save</button>
            <button type="button" className="btn-sm btn-secondary">Cancel</button>
          </footer>
        )}
      </div>
    </Layout>
  );
}