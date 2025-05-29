import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="overflow-hidden border-none shadow-cardLightShadow bg-white dark:bg-slate-800 py-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent className="pb-6">
          <div className="text-2xl font-bold">24</div>
          <div className="flex items-center pt-1">
            <span className="text-xs text-green-500 font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +2
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              from last month
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-cardLightShadow bg-white dark:bg-slate-800 py-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 bg-emerald-50 dark:bg-emerald-900/20">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </CardHeader>
        <CardContent className="pb-6">
          <div className="text-2xl font-bold">156</div>
          <div className="flex items-center pt-1">
            <span className="text-xs text-green-500 font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +23%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              from last month
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-cardLightShadow bg-white dark:bg-slate-800 py-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </CardHeader>
        <CardContent className="pb-6">
          <div className="text-2xl font-bold">89</div>
          <div className="flex items-center pt-1">
            <span className="text-xs text-green-500 font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +12%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              from last month
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-cardLightShadow bg-white dark:bg-slate-800 py-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 bg-amber-50 dark:bg-amber-900/20">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </CardHeader>
        <CardContent className="pb-6">
          <div className="text-2xl font-bold">25</div>
          <div className="flex items-center pt-1">
            <span className="text-xs text-amber-500 font-medium flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Needs attention
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
