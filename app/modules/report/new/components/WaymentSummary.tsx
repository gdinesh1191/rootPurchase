const WaymentSummary = () => {
    const vehicles = [
        { id: 1, number: "TN29N1212", owner: "Arumugam", chassis: "AD33323C3212", fcExpiry: "12/02/2023", status: "Active", nextDue: "22/08/2025", year: 2017 },
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
        { id: 21, number: "TN27U4041", owner: "Yogesh", chassis: "VB123456LKJ", fcExpiry: "05/03/2022", status: "In-Active", nextDue: "10/10/2026", year: 2011 },
        { id: 22, number: "TN28V4243", owner: "Lokesh", chassis: "ZXCVB12345", fcExpiry: "12/08/2023", status: "Active", nextDue: "01/02/2026", year: 2020 },
        { id: 23, number: "TN29W4445", owner: "Anand", chassis: "QAZWSX0987", fcExpiry: "15/09/2022", status: "Active", nextDue: "25/03/2026", year: 2015 },
        { id: 24, number: "TN30X4647", owner: "Deepak", chassis: "LKJHGF5678", fcExpiry: "21/12/2023", status: "In-Active", nextDue: "12/12/2026", year: 2013 },
        { id: 25, number: "TN31Y4849", owner: "Ashok", chassis: "MNBVCX4321", fcExpiry: "30/11/2024", status: "Active", nextDue: "03/01/2027", year: 2017 },
        { id: 26, number: "TN32Z5051", owner: "Jagan", chassis: "POIUYT7890", fcExpiry: "11/05/2022", status: "In-Active", nextDue: "14/02/2026", year: 2012 },
        { id: 27, number: "TN33A5253", owner: "Ragul", chassis: "ASDFGH3210", fcExpiry: "16/07/2024", status: "Active", nextDue: "17/05/2026", year: 2019 },
        { id: 28, number: "TN34B5455", owner: "Naresh", chassis: "ZXCVBN5643", fcExpiry: "08/01/2023", status: "Active", nextDue: "20/06/2026", year: 2014 },
        { id: 29, number: "TN35C5657", owner: "Surya", chassis: "PLMKJN9087", fcExpiry: "19/02/2023", status: "In-Active", nextDue: "10/04/2026", year: 2016 },
        { id: 30, number: "TN36D5859", owner: "Jeeva", chassis: "XSWQAZ2345", fcExpiry: "07/10/2023", status: "Active", nextDue: "15/05/2026", year: 2018 },
        { id: 31, number: "TN37E6061", owner: "Shankar", chassis: "EDCRFV0987", fcExpiry: "25/03/2022", status: "In-Active", nextDue: "06/06/2026", year: 2010 },
        { id: 32, number: "TN38F6263", owner: "Bhaskar", chassis: "UJMNBV6543", fcExpiry: "18/08/2023", status: "Active", nextDue: "09/07/2026", year: 2015 },
        { id: 33, number: "TN39G6465", owner: "Siva", chassis: "RFVTGB1234", fcExpiry: "23/06/2024", status: "Active", nextDue: "13/09/2026", year: 2019 },
        { id: 34, number: "TN40H6667", owner: "Parthiban", chassis: "YHNMLK4321", fcExpiry: "02/05/2022", status: "In-Active", nextDue: "11/08/2026", year: 2011 },
        { id: 35, number: "TN41I6869", owner: "Kishore", chassis: "BGTRFD6789", fcExpiry: "01/09/2023", status: "Active", nextDue: "16/12/2026", year: 2016 },
        { id: 36, number: "TN42J7071", owner: "Abdul", chassis: "NJMKIU7890", fcExpiry: "28/02/2024", status: "In-Active", nextDue: "22/10/2026", year: 2013 },
        { id: 37, number: "TN43K7273", owner: "Siddharth", chassis: "VCXZAS1234", fcExpiry: "17/12/2022", status: "Active", nextDue: "03/11/2026", year: 2017 },
        { id: 38, number: "TN44L7475", owner: "Ilayaraja", chassis: "REWQAZ7654", fcExpiry: "04/06/2023", status: "In-Active", nextDue: "28/12/2026", year: 2012 },
        { id: 39, number: "TN45M7677", owner: "Vimal", chassis: "MLKJNH5432", fcExpiry: "20/10/2023", status: "Active", nextDue: "18/01/2027", year: 2014 },
        { id: 40, number: "TN46N7879", owner: "Natarajan", chassis: "POIUYT8765", fcExpiry: "06/11/2024", status: "Active", nextDue: "08/03/2027", year: 2018 },
    ];

    return (
        <div className="bg-[#ebeff3]">
            <div className="mx-2  h-[calc(100vh-129px)] overflow-hidden rounded-lg bg-white">
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
    );
};

export default WaymentSummary; 