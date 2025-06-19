 'use client';

import { useState } from 'react';
import Layout from '../../../components/Layout';

const PaymentPattiyal: React.FC = () => {
  return (
    <Layout pageTitle="Pattiyal Payment">
      <main className="bg-gray-100 flex-1 overflow-y-auto p-2">
        <div className="mx-auto">
          <div className="m-2 bg-white rounded-xl py-2 px-4 border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
              {/* Left: Title with icon */}
              <h3 className="flex items-center gap-2">
                <i className="ri-receipt-line text-amber-800 text-lg font-medium"></i>
                Reference Number - 47567
              </h3>

              {/* Right: Vehicle No and Count */}
              <div className="flex items-center gap-3">
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Vehicle No : TN33KN9837
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
              {/* Bank 1 */}
              <div className="bg-gray-50 py-2 px-4 rounded-md col-span-2">
                <div className="space-y-2 flex-1 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-700 w-[40%]">Gatepass No</span>
                    <span className="text-gray-700 w-[10%] font-medium">-</span>
                    <span className="text-[#020817] w-[50%] font-medium gatepass-no">GP45678</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-700 w-[40%]">Wayment No</span>
                    <span className="text-gray-700 w-[10%] font-medium">-</span>
                    <span className="text-[#020817] w-[50%] font-medium wayment-no">WY47567</span>
                  </div>
                </div>
              </div>

              {/* Bank 2 */}
              <div className="bg-gray-50 py-2 px-4 rounded-md col-span-2">
                <div className="space-y-2 flex-1 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-700 w-[25%]">Variety</span>
                    <span className="text-gray-700 w-[10%] font-medium">-</span>
                    <span className="text-[#020817] w-[65%] font-medium variety">226 + W.TH.A + VS(2-4)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 w-[25%]">Place</span>
                    <span className="text-gray-700 w-[10%] font-medium">-</span>
                    <span className="text-[#020817] w-[65%] font-medium bank-account">Salem</span>
                  </div>
                </div>
              </div>

              {/* Load Weight */}
              <div className="bg-gray-50 py-2 px-4 rounded-md col-span-1">
                <div className="text-sm text-gray-700 mb-1">Load Weight</div>
                <div className="text-lg font-semibold text-[#020817]">17,990 kg</div>
              </div>

              {/* Empty Weight */}
              <div className="bg-gray-50 py-2 px-4 rounded-md col-span-1">
                <div className="text-sm text-gray-700 mb-1">Empty Weight</div>
                <div className="text-lg font-semibold text-[#020817]">8,030 kg</div>
              </div>

              {/* Net Weight */}
              <div className="bg-green-50 py-2 px-4 rounded-md col-span-1">
                <div className="text-sm text-green-700 mb-1">Net Weight</div>
                <div className="text-lg font-semibold text-green-800">9,960 kg</div>
              </div>

              {/* Soil Loss */}
              <div className="bg-red-50 py-2 px-4 rounded-md col-span-1">
                <div className="text-sm text-red-700 mb-1">Soil Loss</div>
                <div className="text-lg font-semibold text-red-800">436</div>
              </div>

              {/* Tonnage */}
              <div className="bg-gray-50 py-2 px-4 rounded-md col-span-1">
                <div className="text-sm text-gray-700 mb-1">Tonnage</div>
                <div className="text-lg font-semibold text-[#020817]">9462</div>
              </div>
            </div>
          </div>
        </div>

        <section className="rounded-lg p-2 mb-1 section-${sectionLabel}">
          <div className="bg-white rounded-xl p-4 basis-full min-w-0 space-y-3 group relative border border-gray-100">
            <div className="space-y-4 text-sm">
              {/* Row 1: Table */}
              <div className="overflow-x-auto rounded-[0.5rem] border border-[#dee2e6]">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-50 text-[#12344d] font-semibold text-[12px]">
                    <tr>
                      <th className="table-cell-header">Bill Number</th>
                      <th className="table-cell-header">Customer Name</th>
                      <th className="table-cell-header">Aadhar Number</th>
                      <th className="table-cell-header">Phone Number</th>
                      <th className="table-cell-header">Description</th>
                      <th className="table-cell-header">Total Amount</th>
                      <th className="table-cell-header">TDS Deduction (%)</th>
                      <th className="table-cell-header">Advance Payment Deduction</th>
                      <th className="py-1.5 px-3 ">Balance Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    <tr>
                      <td className="table-cell-data">BL001</td>
                      <td className="table-cell-data">Ravi Kumar</td>
                      <td className="table-cell-data">1234-5678-9012</td>
                      <td className="table-cell-data">9876543210</td>
                      <td className="table-cell-data">Tapioca Purchase</td>
                      <td className="table-cell-data">₹ 25,500</td>
                      <td className="table-cell-data">2%</td>
                      <td className="py-2 px-3 border-r border-[#dee2e6] text-red-700  ">(-) ₹ 10,000</td>
                      <td className="py-2 px-3 text-green-600">₹ 24,500</td>
                    </tr>
                    <tr className="bg-white border-t border-gray-200">
                      <td colSpan={9} className="py-2.5 px-3 text-sm text-gray-800">
                        <span className="banner-container mr-4 ">
                          <span id="banner" className="coming-soon-banner">
                            Bank Details
                          </span>
                        </span>
                        <span className="mr-4">
                          <span className="text-blue-500">Bank Name :</span> HDFC Bank
                        </span>
                        <span className="mr-4">
                          <span className="text-blue-500">Account Number :</span> 50212345678901
                        </span>
                        <span className="mr-4">
                          <span className="text-blue-500">IFSC Code :</span> HDFC0001234
                        </span>
                        <span className="mr-4">
                          <span className="text-blue-500">Branch Name :</span> Velachery, Chennai
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto rounded-[0.5rem] border border-[#dee2e6]">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-50 text-[#12344d] font-semibold text-[12px]">
                    <tr>
                      <th className="table-cell-header">Bill Number</th>
                      <th className="table-cell-header">Customer Name</th>
                      <th className="table-cell-header">Aadhar Number</th>
                      <th className="table-cell-header">Phone Number</th>
                      <th className="table-cell-header">Description</th>
                      <th className="table-cell-header">Total Amount</th>
                      <th className="table-cell-header">TDS Deduction (%)</th>
                      <th className="table-cell-header">Advance Payment Deduction</th>
                      <th className="py-1.5 px-3 ">Balance Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    <tr>
                      <td className="table-cell-data">BL001</td>
                      <td className="table-cell-data">Ravi Kumar</td>
                      <td className="table-cell-data">1234-5678-9012</td>
                      <td className="table-cell-data">9876543210</td>
                      <td className="table-cell-data">Tapioca Purchase</td>
                      <td className="table-cell-data">₹ 25,500</td>
                      <td className="table-cell-data">2%</td>
                      <td className="py-2 px-3 border-r border-[#dee2e6] text-red-700  ">(-) ₹ 10,000</td>
                      <td className="py-2 px-3 text-green-600">₹ 24,500</td>
                    </tr>
                    <tr className="bg-white border-t border-gray-200">
                      <td colSpan={9} className="py-2.5 px-3 text-sm text-gray-800">
                        <span className="banner-container mr-4 ">
                          <span id="banner" className="coming-soon-banner">
                            Bank Details
                          </span>
                        </span>
                        <span className="mr-4">
                          <span className="text-blue-500">Bank Name :</span> SBI
                        </span>
                        <span className="mr-4">
                          <span className="text-blue-500">Account Number :</span> 1234567890
                        </span>
                        <span className="mr-4">
                          <span className="text-blue-500">IFSC Code :</span> SBIN0001234
                        </span>
                        <span className="mr-4">
                          <span className="text-blue-500">Branch Name :</span> T Nagar, Chennai
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#EBEFF3] px-4 py-2 h-[50px]" id="pattiyal_footer">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
            <button className="btn-sm btn-primary">Save</button>
            <button className="btn-sm btn-secondary">Cancel</button>
          </div>
          <span className="font-medium">
            Advance Deduction : <span className="text-red-600">1250.00</span>
          </span>
          <div className="text-right font-bold">
            <span className="font-medium">
              <span className="text-lg font-semibold">
                Total Payable Amount : <span className="text-green-600">₹ 51,500.00</span>
              </span>
            </span>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default PaymentPattiyal;