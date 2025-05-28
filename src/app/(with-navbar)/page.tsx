import { Banner } from "@/components/common/Home/Banner/Banner";
import Categories from "@/components/common/Home/Categories/Categories";
import Feature from "@/components/common/Home/Feature/Feature";
import Products from "@/components/common/Home/Products/Products";

export default function Home() {
  return (
    <div>
      <Banner />
      <Categories />
      <Products />
      <Feature />
    </div>
  );
}
