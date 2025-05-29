import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Line } from "react-chartjs-2";

const SalesOverview = () => {
  const [timeRange, setTimeRange] = useState("weekly");

  // Sales data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [3200, 4100, 3800, 5200, 6100, 7500],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.3,
      },
      {
        label: "Orders",
        data: [63, 82, 76, 104, 122, 150],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  return (
    <Card className="mb-6 border-none shadow-md bg-white dark:bg-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Monitor your store performance</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === "weekly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={timeRange === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("monthly")}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-80">
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(0, 0, 0, 0.05)",
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
          data={salesData}
        />
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
