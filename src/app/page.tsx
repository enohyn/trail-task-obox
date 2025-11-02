import { AuroraBackground } from "../../components/aurora-background";
import VideoCarousel3D from "../../components/CaraouselSection/carousel-section";
import HeroSection from "../../components/HeroSection/hero-section";

export default function Home() {
  const videoPaths = [
    "/video/1448735-uhd_4096_2160_24fps.mp4",
    "/video/3744556-hd_1920_1080_30fps.mp4",
    "/video/4046788-hd_1920_1080_25fps.mp4",
    "/video/4441327-uhd_3840_2160_24fps.mp4",
    "/video/4763828-uhd_2160_4096_24fps.mp4",
    "/video/8233057-uhd_2160_4096_25fps.mp4",
  ];

  return (
    <AuroraBackground>
      <HeroSection/>
      <VideoCarousel3D videos={videoPaths} width={150} spinDuration={0.8} />
    </AuroraBackground>
  );
}
