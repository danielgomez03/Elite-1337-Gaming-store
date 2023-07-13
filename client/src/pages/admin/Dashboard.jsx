import React, { useState } from "react";
import { UserStatistics, ProductStatistics } from "@/components/Statistics";
import { UserMetrics, ProductMetrics } from "@/components/Metrics";

function Admin() {

  return (
    <div className="w-4/6 bg-white p-2">
      <div className="bg-white p-2 shadow-md mb-2">
        <div className="mb-12">
          <UserMetrics />
        </div>
        <div className="mb-12">
          <UserStatistics />
        </div>
      </div>
      <div className="bg-white p-2 shadow-md">
        <div className="mb-12">
          <ProductMetrics />
        </div>
        <div className="mb-12">
          <ProductStatistics />
        </div>
      </div>
    </div>
  );
}

export default Admin