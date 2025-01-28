import BannerSlider from "../components/BannerSlider";
import Footer from "./../components/Footer";
import Navbar from "./../components/Navbar";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-14">
        <BannerSlider />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
