import { Card, CardContent } from "@/components/ui/card";
import { Package, Phone, ShoppingBag } from "lucide-react";

const Feature = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Easy Shopping</h3>
          <p className="text-sm text-gray-600">
            Browse thousands of products with easy filtering and search
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Fast Delivery</h3>
          <p className="text-sm text-gray-600">
            Quick and reliable delivery to your doorstep
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">24/7 Support</h3>
          <p className="text-sm text-gray-600">
            Get help whenever you need it from our support team
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feature;
