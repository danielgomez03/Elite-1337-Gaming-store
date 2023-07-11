import { UserStatistics, ProductStatistics } from "@/components/Statistics";
import React, { useState } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";

function Reports() {
  const [userStatisticsOpen, setUserStatisticsOpen] = useState(false);
  const [productStatisticsOpen, setProductStatisticsOpen] = useState(false);

  const toggleUserStatistics = () => {
    setUserStatisticsOpen((prevOpen) => !prevOpen);
  };

  const toggleProductStatistics = () => {
    setProductStatisticsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={toggleUserStatistics}
          className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          <strong>View User Statistics</strong>
        </button>
      </div>
      <div className="mb-12">
        {userStatisticsOpen && (
          <UserStatistics onClose={toggleUserStatistics} />
        )}
      </div>

      <div className="mb-8">
        <button
          onClick={toggleProductStatistics}
          className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          <strong>View Product Statistics</strong>
        </button>
      </div>
      {productStatisticsOpen && (
        <div className="mb-12">
          <ProductStatistics onClose={toggleProductStatistics} />
        </div>
      )}
    </div>
  );
}

export default Reports;
