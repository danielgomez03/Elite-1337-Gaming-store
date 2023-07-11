import React, { useState } from "react";
import { UserStatistics, ProductStatistics } from "@/components/Statistics";
import { UserMetrics, ProductMetrics } from "@/components/Metrics";
// import GoogleAnalytics from "@/components/GoogleAnalytics";

function Reports() {
  const [userMetricsOpen, setUserMetricsOpen] = useState(false);
  const [userStatisticsOpen, setUserStatisticsOpen] = useState(false);
  const [productMetricsOpen, setProductMetricsOpen] = useState(false);
  const [productStatisticsOpen, setProductStatisticsOpen] = useState(false);

  const toggleUserMetrics = () => {
    setUserMetricsOpen((prevOpen) => !prevOpen);
  };

  const toggleUserStatistics = () => {
    setUserStatisticsOpen((prevOpen) => !prevOpen);
  };

  const toggleProductMetrics = () => {
    setProductMetricsOpen((prevOpen) => !prevOpen);
  };

  const toggleProductStatistics = () => {
    setProductStatisticsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={toggleUserMetrics}
          className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          <strong>View User Metrics</strong>
        </button>
      </div>
      <div className="mb-12">
        {userMetricsOpen && <UserMetrics onClose={toggleUserMetrics} />}
      </div>

      <div className="mb-8">
        <button
          onClick={toggleUserStatistics}
          className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          <strong>View User Graphs</strong>
        </button>
      </div>
      <div className="mb-12">
        {userStatisticsOpen && (
          <UserStatistics onClose={toggleUserStatistics} />
        )}
      </div>

      <div className="mb-8">
        <button
          onClick={toggleProductMetrics}
          className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          <strong>View Product Metrics</strong>
        </button>
      </div>
      <div className="mb-12">
        {productMetricsOpen && (
          <ProductMetrics onClose={toggleProductMetrics} />
        )}
      </div>

      <div className="mb-8">
        <button
          onClick={toggleProductStatistics}
          className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          <strong>View Product Graphs</strong>
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
