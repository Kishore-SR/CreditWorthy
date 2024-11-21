import { HeroSection } from "../components/layout/HeroSection";
import { Services } from "../components/layout/Services";
import { Working } from "../components/layout/Working";

function Home() {
    return (
      <div>
        <HeroSection/>
        <Services/>
        <Working/>
      </div>
    );
  }
  
  export default Home;