// components/ReportsPage.tsx
'use client';

import { useState } from 'react';
import Layout from '../../../components/Layout';
import WaymentPending from './components/WaymentPending';  

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const reportCategories = [
    {
      title: "Wayment",
      items: [
        { name: "Pending", icon: "ri-file-3-line" },
        { name: "Summary", icon: "ri-file-3-line" }
      ]
    },
    {
      title: "Pattiyal",
      items: [
        { name: "Traders", icon: "ri-file-3-line" },
        { name: "Farmer", icon: "ri-file-3-line" },
        { name: "Summary", icon: "ri-file-3-line" }
      ]
    },
    {
      title: "Payment",
      items: [
        { name: "Pending", icon: "ri-file-3-line" },
        { name: "Summary", icon: "ri-file-3-line" }
      ]
    }
  ];

  const handleReportClick = (reportName: string, categoryTitle: string) => {
    setActiveReport(reportName);
    setActiveCategory(categoryTitle);
  };

  const handleCategoryClick = (categoryTitle: string) => {
    setActiveCategory(categoryTitle);
    // Optionally, reset activeReport when a category is clicked
    setActiveReport(null);
  };

  const filteredCategories = reportCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <Layout pageTitle="Reports">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[240px] h-[100vh] bg-[#f8f9fa] border-[#ebeff3] px-3 flex flex-col space-y-4">
          <div className="relative">
            <div className="flex items-center overflow-hidden ">
              <i className="ri-search-line absolute left-2 text-sm"></i>
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control pl-7"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm bg-[#f8f9fa] overflow-y-auto pr-2 max-h-[calc(100vh-110px)]">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <p
                  className="font-semibold text-gray-700 py-1 cursor-pointer" // Added some styling for categories
                  onClick={() => handleCategoryClick(category.title)}
                >
                  {category.title}
                </p>
                <ul>
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`cursor-pointer report-list-item p-1 rounded transition-colors duration-200 ${activeReport === item.name && activeCategory === category.title
                          ? 'bg-[#f0f0f0] text-[#009333] rounded-[5px]'
                          : 'hover:bg-gray-100' // Added hover effect
                        }`}
                      onClick={() => handleReportClick(item.name, category.title)}
                    >
                      <i className={`${item.icon} text-lg me-2`}></i>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {filteredCategories.length === 0 && searchTerm && (
              <div className="text-center text-gray-500 py-4">
                No reports found matching "{searchTerm}"
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Conditionally render the report component */}
          {activeCategory === "Wayment" && activeReport === "Pending" && (
            <WaymentPending activeReport={activeReport} activeCategory={activeCategory} />
          )}

          {/* Add more conditional rendering for other reports as you create their components */}
          {activeCategory === "Wayment" && activeReport === "Summary" && (
            <div className="p-4">
              <h2 className="text-xl font-bold">Wayment Summary Report</h2>
              {/* Render WaymentSummary component here */}
              <p>Content for Wayment Summary...</p>
            </div>
          )}

          {/* Default view or instructions */}
          {!activeReport && (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
              Select a report from the sidebar to view its content.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ReportsPage;