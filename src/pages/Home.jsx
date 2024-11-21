import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/layout/HeroSection";
import { Services } from "../components/layout/Services";
import { Working } from "../components/layout/Working";

function Home() {
    return (
      <div>
        <HeroSection/>
        <Services/>
        <Working/>
        <Footer/>
      </div>
    );
  }
  
  export default Home;