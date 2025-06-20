 "use client";

import { useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/navigation";
import PendingPointTable from "./components/PendingPointTable";
import CompletedPointTable from "./components/CompletedPointTable";


// Define tab key types - now only "pending" and "completed"
type TabKey = "pending" | "completed";

const tabs: TabKey[] = ["pending", "completed"];

const PointList = () => {
 const [activeTab, setActiveTab] = useState<TabKey>("pending");

 const router = useRouter();

 const counts: Record<TabKey, number> = {
  pending: 0, // Will be managed by individual components
  completed: 0,
 };

 const renderTabContent = () => {
  switch (activeTab) {
   case "pending":
    return <PendingPointTable onSidebarToggle={() => {}} />;
   case "completed":
    return <CompletedPointTable onSidebarToggle={() => {}} />;
   
   default:
    return <PendingPointTable onSidebarToggle={() => {}} />;
  }
 };

 return (
  <Layout pageTitle="Point Management"> 
   <main className="flex-1">
    <div className="overflow-y-hidden h-[calc(100vh-43px)]">
     <div className="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
      <ul className="flex flex-nowrap text-sm font-medium text-center">
       {tabs.map((tab) => (
        <li key={tab}>
         <button 
          onClick={() => setActiveTab(tab)} 
          className={`tab ${activeTab === tab ? "bg-[#ebeff3] text-[#384551]" : "hover:text-[#6689b8] hover:bg-[#f5f7f9]"}`}
         >
          <span className="flex items-center gap-1">
           {tab === "pending" && <i className="ri-time-line mr-1"></i>}
           {tab === "completed" && <i className="ri-check-line mr-1"></i>}
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
           {activeTab === tab && (
            <>
             <span className="ml-2 counter-badge">{counts[tab]}</span>
             <i className="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5]" onClick={(e) => { e.stopPropagation(); setActiveTab("pending"); }}></i>
            </>
           )}
          </span>
         </button>
        </li>
       ))}
      </ul>

      <div className="flex items-center flex-shrink-0 ml-auto">
       <button id="openSidebarCustomize" className="btn-sm btn-hover-ct">
        <i className="ri-equalizer-line mr-1"></i>
        <span className="text-sm">Customize Table</span>
       </button>

       <div className="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
        <button className="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
         <i className="ri-file-excel-2-line mr-1"></i>
         <span>Excel</span>
        </button>
        <button className="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer border-l border-[#cfd7df]">
         <i className="ri-file-pdf-2-line mr-1"></i>
         <span>PDF</span>
        </button>
        <button className="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer border-l border-[#cfd7df]">
         <i className="ri-printer-line mr-1"></i>
         <span>Print</span>
        </button>
       </div>
      </div>
     </div>

     {/* Render the active tab content */}
     {renderTabContent()}
    </div>
   </main>
  </Layout>
 );
};

export default PointList;