import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
import api from "../../api/axios";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Dashboard = () => {
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCarouselData = async (): Promise<void> => {
    try {
      const response = await api.get<CarouselItem[]>(
        "/dashboard/carousel-data"
      );
      console.log(response.data, "carouselData");
      setCarouselData(response.data);
    } catch (error) {
      console.error("Carousel API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarouselData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-container">
      <Carousel fade interval={3000}>
        {carouselData?.map((item: CarouselItem) => (
          <Carousel.Item key={item.id}>
            <img
              className="carousel-image"
              src={item.image}
              alt={item.title}
            />

            <Carousel.Caption className="carousel-caption-custom">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Dashboard;