 'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams
import Layout from '../../../components/Layout';
import WaymentPending from './components/WaymentPending';
import WaymentSummary from './components/WaymentSummary';
import PattiyalTraders from './components/PattiyalTraders';
import PattiyalFarmers from './components/PattiyalFarmers';
import PattiyalSummary from './components/PattiyalSummary';
import PaymentPending from './components/PaymentPending';
import PaymentSummary from './components/PaymentSummary';

const ReportsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams hook
  const category = searchParams.get('category'); // Get individual parameters
  const report = searchParams.get('report');     // Get individual parameters

  // ... rest of your code
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
        { name: "Farmers", icon: "ri-file-3-line" },
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
  const initialActiveCategory = (category as string) || reportCategories[0].title;
  const initialActiveReport = (report as string) || reportCategories[0].items[0].name;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeReport, setActiveReport] = useState<string | null>(initialActiveReport);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialActiveCategory);

  // Effect to update internal state when URL query parameters change (e.g., direct link)
  useEffect(() => {
    // No longer need to check `typeof category === 'string'` as .get() returns string or null
    if (category) {
      setActiveCategory(category);
    }
    if (report) {
      setActiveReport(report);
    } else if (category && !report) {
      const foundCategory = reportCategories.find(cat => cat.title === category);
      if (foundCategory && foundCategory.items.length > 0) {
        setActiveReport(foundCategory.items[0].name);
      } else {
        setActiveReport(null);
      }
    }
  }, [category, report, reportCategories]);


 // For handleReportClick
const handleReportClick = (reportName: string, categoryTitle: string) => {
  setActiveReport(reportName);
  setActiveCategory(categoryTitle);
  const newSearchParams = new URLSearchParams();
  newSearchParams.set('category', categoryTitle);
  newSearchParams.set('report', reportName);
  router.push(`?${newSearchParams.toString()}`); // Corrected: Removed extra arguments
};

// For handleCategoryClick
const handleCategoryClick = (categoryTitle: string) => {
  setActiveCategory(categoryTitle);
  const defaultReport = reportCategories.find(cat => cat.title === categoryTitle)?.items[0]?.name || null;
  setActiveReport(defaultReport);

  const newSearchParams = new URLSearchParams();
  newSearchParams.set('category', categoryTitle);
  if (defaultReport) {
    newSearchParams.set('report', defaultReport);
  }
  router.push(`?${newSearchParams.toString()}`); // Corrected: Removed extra arguments
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
                  className="font-semibold text-gray-700 py-1 cursor-pointer"
                  onClick={() => handleCategoryClick(category.title)}>
                  {category.title}
                </p>
                <ul>
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`cursor-pointer report-list-item p-1 rounded transition-colors duration-200 ${activeReport === item.name && activeCategory === category.title
                          ? 'bg-[#f0f0f0] text-[#009333] rounded-[5px]'
                          : 'hover:bg-gray-100'
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


        <div className="flex-1">
          {activeCategory === "Wayment" && activeReport === "Pending" && (
            <WaymentPending activeReport={activeReport} activeCategory={activeCategory} />
          )}

          {activeCategory === "Wayment" && activeReport === "Summary" && (
            <WaymentSummary activeReport={activeReport} activeCategory={activeCategory} />
          )}
          {activeCategory === "Pattiyal" && activeReport === "Traders" && (
            <PattiyalTraders activeReport={activeReport} activeCategory={activeCategory} />
          )}
          {activeCategory === "Pattiyal" && activeReport === "Farmers" && (
            <PattiyalFarmers activeReport={activeReport} activeCategory={activeCategory} />
          )}
          {activeCategory === "Pattiyal" && activeReport === "Summary" && (
            <PattiyalSummary activeReport={activeReport} activeCategory={activeCategory} />
          )}
          {activeCategory === "Payment" && activeReport === "Pending" && (
            <PaymentPending activeReport={activeReport} activeCategory={activeCategory} />
          )}
          {activeCategory === "Payment" && activeReport === "Summary" && (
            <PaymentSummary activeReport={activeReport} activeCategory={activeCategory} />
          )}

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