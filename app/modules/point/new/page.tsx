"use client";

import { useState } from "react";
import Layout from "../../../components/Layout";
import useInputValidation from "@/app/utils/inputValidations";

export default function NewPoint() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "vehicle" | "wayment" | "gatepass" | null
  >("vehicle");
useInputValidation();
  const handleSectionClick = (section: "vehicle" | "wayment" | "gatepass") => {
    setActiveSection(section);
  };

  return (
    <Layout pageTitle="Point New">
      <div className="min-h-screen">
        <main id="main-content" className="flex-1">
          <div className="flex-1 overflow-y-auto h-[calc(100vh-103px)]">
            <div className="px-4 py-2 border-b border-gray-300 bg-white w-full">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[18px] sm:text-[20px] font-semibold text-[#009333]">
                  Point Entry
                </h1>
              </div>
            </div>

            <div className="flex-1 ">
              <div className="px-4 py-8">
                <div className="flex flex-wrap ">
                  <div className="w-1/4 pr-5">
                    <div className="bg-white p-4 rounded-[0.5rem] border border-[hsla(214,32%,91%,1)] shadow-sm ">
                      <div className="space-y-5">
                        <div className="border-b border-dashed border-gray-300 pb-5">
                          <div className="flex items-center gap-2 mb-3">
                            <i className="ri-file-list-3-line text-blue-600 text-lg"></i>
                            <h3 className="text-base font-semibold text-gray-600">
                              Gate Pass Details
                            </h3>
                          </div>
                          <div className="grid gap-4 text-sm px-7">
                            <div className="flex flex-col 2xl:flex-row 2xl:justify-between">
                              <span className="font-medium">
                                Gate Pass Number
                              </span>
                              <span
                                className="text-gray-700 2xl:text-right"
                                id="gatePassNumber"
                              ></span>
                            </div>
                            <div className="flex flex-col 2xl:flex-row 2xl:justify-between">
                              <span className="font-medium">
                                Wayment Number
                              </span>
                              <span
                                className="text-gray-700 2xl:text-right"
                                id="waymentNumber"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div className="border-b border-dashed border-gray-300 pb-5">
                          <div className="flex items-center gap-2 mb-3">
                            <i className="ri-truck-line text-red-600 text-lg"></i>
                            <h3 className="text-base font-semibold text-gray-600">
                              Vehicle Information
                            </h3>
                          </div>
                          <div className="grid gap-4 text-sm px-7">
                            <div className="flex flex-col 2xl:flex-row 2xl:justify-between">
                              <span className="font-medium">Vehicle No</span>
                              <span
                                className="text-gray-700 2xl:text-right"
                                id="vehicleNumber"
                              ></span>
                            </div>
                            <div className="flex flex-col 2xl:flex-row 2xl:justify-between">
                              <span className="font-medium">
                                Number of Part Loads
                              </span>
                              <span
                                className="text-gray-700 2xl:text-right"
                                id="partLoads"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div className="border-b border-dashed border-gray-300 pb-5">
                          <div className="flex items-center gap-2 mb-3">
                            <i className="ri-user-3-line text-purple-600 text-lg"></i>
                            <h3 className="text-base font-semibold text-gray-600">
                              Customer Information
                            </h3>
                          </div>
                          <div className="grid gap-4 text-sm px-7">
                            <div className="flex flex-col 2xl:flex-row 2xl:justify-between">
                              <span className="font-medium">Customer Name</span>
                              <span
                                className="text-gray-700 2xl:text-right"
                                id="customerName"
                              ></span>
                            </div>
                            <div className="flex flex-col 2xl:flex-row 2xl:justify-between">
                              <span className="font-medium">Address</span>
                              <span
                                className="text-gray-700 2xl:text-right"
                                id="customerAddress"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <i className="ri-box-3-line text-yellow-600 text-lg"></i>
                            <h3 className="text-base font-semibold text-gray-600">
                              Cargo Details
                            </h3>
                          </div>
                          <div className="grid gap-4 text-sm px-7">
                            <div className="flex flex-col 2xl:flex-row 2xl:justify-between">
                              <span className="font-medium">Variety</span>
                              <span
                                className="text-gray-700 2xl:text-right"
                                id="varietyName"
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-3/4">
                    <div className="bg-white rounded-[0.5rem] border border-[hsla(214,32%,91%,1)] shadow-sm ">
                      <div className="flex justify-between items-center border-b border-[hsla(214,32%,91%,1)] py-3 px-4">
                        <div className="flex items-center gap-2">
                          <i className="ri-shield-check-line text-green-600 text-lg"></i>
                          <h3 className="text-lg font-medium">
                            Grading points
                          </h3>
                        </div>
                        <button
                          onClick={() => setIsPointModalOpen(true)}
                          className="flex items-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md cursor-pointer"
                        >
                          <i className="ri-add-line mr-1"></i> Add Point
                        </button>
                      </div>
                      <div
                        id="emptyState"
                        className="m-8 bg-gray-50 text-center border border-dashed border-gray-300 py-12 rounded-lg"
                      >
                        <div className="mb-2">
                          <i className="ri-file-text-line text-gray-800 text-4xl"></i>
                        </div>
                        <p className="text-gray-700 text-base">
                          No points added yet
                        </p>
                        <p className="text-gray-700 text-base">
                          Click the "Add Point" button to add your first entry
                          point
                        </p>
                      </div>
                      <div
                        id="pointsTable"
                        className="hidden m-4 overflow-auto rounded-md border border-gray-200  max-h-[450px]"
                      >
                        <table className="min-w-full bg-white ">
                          <thead>
                            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-[12px]">
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                S.No
                              </th>
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                Variety
                              </th>
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                Weight
                              </th>
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                Size (%)
                              </th>
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                First Point
                              </th>
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                Second Point
                              </th>
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                Third Point
                              </th>
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                Average Point
                              </th>
                              <th className="py-2 px-4 font-semibold border-r border-gray-200">
                                Remarks
                              </th>
                              <th className="py-2 px-4 font-semibold text-right">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            id="pointsTableBody"
                            className="divide-y divide-gray-200"
                          ></tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isPointModalOpen && (
              <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4 z-50   ">
                <div className="bg-white rounded-[0.5rem] shadow- w-full max-w-[800px]">
                  <div className="relative border-b border-gray-200 px-4 py-2 bg-gray-100 rounded-tl-md">
                    <h3 className="font-medium">Add New Point</h3>
                    <button
                      onClick={() => setIsPointModalOpen(false)}
                      className="absolute -top-[10px] -right-[10px] text-gray-500 hover:text-gray-700 bg-[#909090] hover:bg-[#cc0000] rounded-full w-[30px] h-[30px] border-2 border-white cursor-pointer"
                    >
                      <i className="ri-close-line  text-white"></i>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row  ">
                      <div className="md:w-1/2 border-r border-gray-300 pr-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                          Tapioca Details
                        </h2>
                        <div className="flex flex-wrap -mx-3">
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Variety
                              <span className="text-sm text-red-600">*</span>
                            </label>
                            <select
                              id="variety"
                              className="form-control w-full"
                            ></select>
                          </div>
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Weight
                              <span className="text-sm text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              id="weight"
                              className="form-control w-full only_number"
                              placeholder="Enter weight"
                              autoComplete="off"
                            />
                          </div>
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Variety Type
                              <span className="text-sm text-red-600">*</span>
                            </label>
                            <div className="flex items-center space-x-4 text-gray-800 text-sm">
                              <label className="inline-flex items-center ">
                                <input
                                  type="radio"
                                  name="type"
                                  value="குண்டு"
                                  className="form-radio "
                                />
                                <span className="ml-2">குண்டு</span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="type"
                                  value="நீளம்"
                                  className="form-radio "
                                />
                                <span className="ml-2">நீளம்</span>
                              </label>
                            </div>
                          </div>
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Size(%)
                              <span className="text-sm text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              id="size"
                              name="size"
                              className="form-control w-full only_number"
                              placeholder="Enter size"
                            />
                          </div>
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Remarks
                            </label>
                            <input
                              type="text"
                              id="remarks"
                              className="form-control w-full"
                              placeholder="Enter remarks"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2 pl-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                          Point Details
                        </h2>
                        <div className="flex flex-wrap -mx-3">
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Point
                              <span className="text-sm text-red-600">*</span>
                            </label>
                            <div className="flex w-full">
                              <input
                                type="text"
                                className="form-control w-full only_number rounded-l-md"
                                id="firstWeight"
                                readOnly={true}
                                placeholder="Fetch first point"
                              />
                              <button className="btn-sm btn-primary rounded-r-md">
                                Fetch
                              </button>
                            </div>
                          </div>
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Second Point
                            </label>
                            <div className="flex w-full">
                              <input
                                type="text"
                                className="form-control w-full only_number rounded-l-md"
                                id="secondWeight"
                                readOnly={true}
                                placeholder="Fetch second point"
                              />
                              <button className="btn-sm btn-primary rounded-r-md">
                                Fetch
                              </button>
                            </div>
                          </div>
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Third Point
                            </label>
                            <div className="flex w-full ">
                            <input
                              type="text"
                              className="form-control w-full rounded-l-md "
                              placeholder="Fetch Third point"
                              readOnly
                            />
                            <button
                              type="button"
                              className="btn-sm btn-primary rounded-r-md"
                            >
                              Fetch
                            </button>
                          </div>
                          </div>
                          <div className="w-full px-3 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Average Point
                            </label>
                            <input
                              type="text"
                              id="avgPoint"
                              className="form-control w-full"
                              placeholder="0.00"
                              readOnly={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                      onClick={() => setIsPointModalOpen(false)}
                      className="btn-sm btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsPointModalOpen(false)}
                      className="btn-sm btn-primary"
                    >
                      Save & Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-gray-50 p-4">
                  <div className="max-w-md mx-auto rounded-lg">
                    {/* Vehicle Section */}
                    <div
                      onClick={() => handleSectionClick("vehicle")}
                      className={`border-l-4 ${
                        activeSection === "vehicle"
                          ? "border-green-500 bg-green-50"
                          : "border-transparent bg-white"
                      } p-4 mb-4 cursor-pointer`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-700">
                              Vehicle Number
                            </h3>
                            <p className="text-sm text-green-600">
                              Use the Vehicle number to add points
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full ${
                            activeSection === "vehicle"
                              ? "bg-green-500 flex items-center justify-center"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {activeSection === "vehicle" && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {activeSection === "vehicle" && (
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Enter vehicle number"
                            className="form-control border border-[#009333] rounded-md bg-white text-gray-800"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Ensure the number is entered exactly as displayed on
                            the slip
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Wayment Section */}
                    <div
                      onClick={() => handleSectionClick("wayment")}
                      className={`border-l-4 ${
                        activeSection === "wayment"
                          ? "border-green-500 bg-green-50"
                          : "border-transparent bg-white"
                      } p-4 mb-4 cursor-pointer`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-700">
                              Wayment Number
                            </h3>
                            <p className="text-sm text-gray-500">
                              Use the wayment number to add points
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full ${
                            activeSection === "wayment"
                              ? "bg-green-500 flex items-center justify-center"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {activeSection === "wayment" && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {activeSection === "wayment" && (
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Enter wayment number"
                            className="form-control border border-[#009333] rounded-md bg-white text-gray-800"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Ensure the number is entered exactly as displayed on
                            the slip
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Gatepass Section */}
                    <div
                      onClick={() => handleSectionClick("gatepass")}
                      className={`border-l-4 ${
                        activeSection === "gatepass"
                          ? "border-green-500 bg-green-50"
                          : "border-transparent bg-white"
                      } p-4 mb-4 cursor-pointer`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-700">
                              Gatepass Number
                            </h3>
                            <p className="text-sm text-gray-500">
                              Use the gatepass number to add points
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full ${
                            activeSection === "gatepass"
                              ? "bg-green-500 flex items-center justify-center"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {activeSection === "gatepass" && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {activeSection === "gatepass" && (
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Enter gatepass number"
                            className="form-control border border-[#009333] rounded-md bg-white text-gray-800"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Ensure the number is entered exactly as displayed on
                            the slip
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                      <button
                        className="text-gray-600 border border-gray-500 rounded-md px-3 py-1"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md">
                        Get Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}
