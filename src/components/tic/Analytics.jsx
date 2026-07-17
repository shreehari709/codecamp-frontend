import TicLayout
from "../../layouts/TicLayout";

import DashboardCard
from "../../components/tic/DashboardCard";

const Analytics = () => {

  return (
    <TicLayout>

      <div className="p-8">

        <h1 className="
          text-3xl
          font-bold
          mb-8
        ">
          Analytics
        </h1>

        <div className="
          grid
          md:grid-cols-4
          gap-5
        ">

          <DashboardCard
            title="Students"
            value="120"
          />

          <DashboardCard
            title="Classes"
            value="8"
          />

          <DashboardCard
            title="Tasks"
            value="54"
          />

          <DashboardCard
            title="Completion"
            value="84%"
          />

        </div>

      </div>

    </TicLayout>
  );
};

export default Analytics;