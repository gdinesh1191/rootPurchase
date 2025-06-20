"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Check if a path is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  // Desktop Sidebar (wider)
  if (!isMobile) {
    return (
      <div className="w-[200px] bg-[#212934] shadow-md relative h-full">
        <div className="px-0 pt-2 pb-0 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="InfoGreen Logo"
            width={100}
            height={40}
          />
        </div>

        <nav className="py-0">
          <ul>
            <li
              onClick={() => router.push("/modules/wayment/list")}
              className={`px-4 py-2 border-l-5 hover:bg-[#191f26] hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
                isActive("/modules/wayment/list")
                  ? "bg-[#191f26] border-l-[#1aed59] text-white"
                  : "text-[#b0b3b7] border-l-transparent"
              }`}
            >
              <div className="flex items-center">
                <i
                  className={`ri-route-line mr-3 text-lg ${
                    isActive("/modules/wayment/list") ? "text-white" : ""
                  }`}
                ></i>
                <span>Wayment</span>
              </div>
            </li>

            <li
              onClick={() => router.push("/modules/pattiyal/list")}
              className={`px-4 py-2 border-l-5 hover:bg-[#191f26] hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
                isActive("/modules/pattiyal/list")
                  ? "bg-[#191f26] border-l-[#1aed59] text-white"
                  : "text-[#b0b3b7] border-l-transparent"
              }`}
            >
              <div className="flex items-center">
                <i
                  className={`ri-file-list-line mr-3 text-lg ${
                    isActive("/modules/pattiyal/list") ? "text-white" : ""
                  }`}
                ></i>
                <span>Pattiyal</span>
              </div>
            </li>
            <li onClick={() => router.push('/modules/pattiyal/payment')} className={`px-4 py-2 border-l-5 hover:bg-[#191f26] hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${isActive('/modules/pattiyal/payment') ? 'bg-[#191f26] border-l-[#1aed59] text-white' : 'text-[#b0b3b7] border-l-transparent'}`}>
              <div className="flex items-center">
                <i className={`ri-file-list-line mr-3 text-lg ${isActive('/modules/pattiyal/payment') ? 'text-white' : ''}`}></i>
                <span>P. Pattiyal</span>
              </div>
            </li>
            <li onClick={() => router.push('/modules/pattiyal/payment-list')} className={`px-4 py-2 border-l-5 hover:bg-[#191f26] hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${isActive('/modules/pattiyal/payment-list') ? 'bg-[#191f26] border-l-[#1aed59] text-white' : 'text-[#b0b3b7] border-l-transparent'}`}>
              <div className="flex items-center">
                <i className={`ri-file-list-line mr-3 text-lg ${isActive('/modules/pattiyal/payment') ? 'text-white' : ''}`}></i>
                <span>Payment List</span>
              </div>
            </li>
            <li onClick={() => router.push('/modules/point/list')} className={`px-4 py-2 border-l-5 hover:bg-[#191f26] hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${isActive('/modules/point/list') ? 'bg-[#191f26] border-l-[#1aed59] text-white' : 'text-[#b0b3b7] border-l-transparent'}`}>
              <div className="flex items-center">
                <i className={`ri-file-list-line mr-3 text-lg ${isActive('/modules/point/list') ? 'text-white' : ''}`}></i>
                <span>Point List</span>
              </div>
            </li>

            <li
              onClick={() => router.push("/modules/employee/list")}
              className={`px-4 py-2 border-l-5 hover:bg-[#191f26] hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
                isActive("/modules/employee/list")
                  ? "bg-[#191f26] border-l-[#1aed59] text-white"
                  : "text-[#b0b3b7] border-l-transparent"
              }`}
            >
              <div className="flex items-center">
                <i
                  className={`ri-money-dollar-circle-line mr-3 text-lg ${
                    isActive("/modules/employee/list") ? "text-white" : ""
                  }`}
                ></i>
                <span>Employee</span>
              </div>
              
            </li>


            <li
              className={`px-4 py-2 border-l-5 hover:bg-[#191f26] hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
                isActive("/modules/payment/list") || isActive("/modules/payment/new")
                  ? "bg-[#191f26] border-[#1aed59] text-white "
                  : "text-[#b0b3b7] border-l-transparent "
              }`}
            >
               <div className="flex items-center" onClick={() => router.push("/modules/payment/list")}>
                <i
                  className={`ri-money-dollar-circle-line mr-3 text-lg ${
                    isActive("/modules/payment/list") ? "text-white" : ""
                  }`}
                ></i>
                <span>Payment</span>
              </div>
              <i
                onClick={() => router.push("/modules/payment/new")}
                className={`ri-add-fill text-lg ${
                  isActive("/modules/payment/new") ? "text-white" : ""
                }`}
              ></i>
            </li>

            <li
              onClick={() => router.push("/modules/report/new")}
              className={`px-4 py-2 border-l-5 hover:bg-[#191f26] hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
                isActive("/modules/report/new")
                  ? "bg-[#191f26] border-l-[#1aed59] text-white"
                  : "text-[#b0b3b7] border-l-transparent"
              }`}
            >
              <div className="flex items-center">
                <i
                  className={`ri-file-chart-line mr-3 text-lg ${
                    isActive("/modules/report/new") ? "text-white" : ""
                  }`}
                ></i>
                <span>Report</span>
              </div>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-t-[#b0b3b7] py-2 pl-2 pr-4 flex items-center">
          <div className="mr-2">
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
              <img
                src="/images/profile-pic.png"
                alt="User Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-[#b0b3b7]">
            <div className="font-semibold">Emily Clark</div>
            <div className="text-xs">Admin</div>
          </div>
          <div className="ml-auto">
            <i className="ri-expand-up-down-fill text-[#b0b3b7] text-lg cursor-pointer"></i>
          </div>
        </div>
      </div>
    );
  }

  // Tablet/Mobile Sidebar (compact)
  return (
    <div className="w-[60px] bg-[#212934] shadow-md relative h-full">
      <div className="px-0 py-1.5 flex justify-center">
        <img src="/images/tab-logo.png" alt="InfoGreen Logo" className="h-9" />
      </div>

      <nav className="py-0">
        <ul>
          <li
            onClick={() => router.push("/modules/wayment")}
            className={`px-4 py-2 hover:bg-[#191f26] border-l-5 hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
              isActive("/modules/wayment")
                ? "bg-[#191f26] border-l-[#1aed59] text-white"
                : "text-[#b0b3b7] border-l-transparent"
            }`}
          >
            <div className="flex items-center">
              <i
                className={`ri-route-line text-lg ${
                  isActive("/modules/wayment") ? "text-white" : ""
                }`}
              ></i>
            </div>
          </li>

          <li
            onClick={() => router.push("/modules/pattiyal/list")}
            className={`px-4 py-2 hover:bg-[#191f26] border-l-5 hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
              isActive("/modules/pattiyal/list")
                ? "bg-[#191f26] border-l-[#1aed59] text-white"
                : "text-[#b0b3b7] border-l-transparent"
            }`}
          >
            <div className="flex items-center">
              <i
                className={`ri-file-list-line text-lg ${
                  isActive("/modules/pattiyal/list") ? "text-white" : ""
                }`}
              ></i>
            </div>
          </li>

          <li
            onClick={() => router.push("/modules/payment")}
            className={`px-4 py-2 hover:bg-[#191f26] border-l-5 hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
              isActive("/modules/payment")
                ? "bg-[#191f26] border-l-[#1aed59] text-white"
                : "text-[#b0b3b7] border-l-transparent"
            }`}
          >
            <div className="flex items-center">
              <i
                className={`ri-money-dollar-circle-line text-lg ${
                  isActive("/modules/payment") ? "text-white" : ""
                }`}
              ></i>
            </div>
          </li>

          <li
            onClick={() => router.push("/modules/report")}
            className={`px-4 py-2 hover:bg-[#191f26] border-l-5 hover:border-l-[#1aed59] flex items-center justify-between cursor-pointer ${
              isActive("/modules/report")
                ? "bg-[#191f26] border-l-[#1aed59] text-white"
                : "text-[#b0b3b7] border-l-transparent"
            }`}
          >
            <div className="flex items-center">
              <i
                className={`ri-file-chart-line text-lg ${
                  isActive("/modules/report") ? "text-white" : ""
                }`}
              ></i>
            </div>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full border-t border-t-[#b0b3b7] py-2 pl-2 pr-4 flex items-center">
        <div className="mr-2">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
            <img
              src="/images/profile-pic.png"
              alt="User Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
