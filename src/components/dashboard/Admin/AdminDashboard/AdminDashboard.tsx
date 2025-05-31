"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import StatsCards from "./StatsCards";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  // Product categories data
  const categoryData = {
    labels: ["Apple", "Samsung", "OnePlus", "Oppo", "Vivo", "Xiaomi"],
    datasets: [
      {
        label: "Products by Category",
        data: [8, 5, 4, 3, 2, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
      },
    ],
  };

  // Order status data
  const orderStatusData = {
    labels: ["Completed", "Processing", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Order Status",
        data: [112, 19, 25, 8],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Welcome Banner */}
        <div className="mb-6 bg-gradient-to-r from-[#5550A0] to-[#332F61] rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome, Admin</h1>
              <p className="text-white/90">
                Manage your store with ease and efficiency
              </p>
            </div>
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Sales Overview Chart */}

        {/* Tabs Content */}
        <Tabs defaultValue="overview" className="mt-12">
          <TabsList className="grid w-full md:w-[500px] grid-cols-2 mb-2 bg-primary/5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Product Categories */}
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Products by Category
                  </CardTitle>
                  <CardDescription>
                    Distribution of products across categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <Bar
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
                          display: false,
                        },
                      },
                    }}
                    data={categoryData}
                  />
                </CardContent>
              </Card>

              {/* Order Status */}
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Order Status Distribution
                  </CardTitle>
                  <CardDescription>
                    Current status of all orders
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-80">
                  <div className="w-64 h-64">
                    <Doughnut
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                      }}
                      data={orderStatusData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-none shadow-md bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>
                  View comprehensive analytics and statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Conversion Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3.2%</div>
                      <p className="text-xs text-muted-foreground">
                        +0.5% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Avg. Order Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$48.20</div>
                      <p className="text-xs text-muted-foreground">
                        +$2.40 from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Customer Retention
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">68%</div>
                      <p className="text-xs text-muted-foreground">
                        +2% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
