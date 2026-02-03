import Hero from "../components/Hero";
import HomeCategories from "../components/HomeCategories";
import HomeProducts from "../components/HomeProducts";

export default function Home() {

    return (
        <div className="bg-gray-100">
            <Hero />
            <HomeCategories />
            <HomeProducts />
        </div>
    )
}