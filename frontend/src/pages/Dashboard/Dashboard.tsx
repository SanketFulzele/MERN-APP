import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  name: string;
  email: string;
  country: string;
  image: string;
}

interface CardItem {
  title: string;
  description: string;
  image: string;
}

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [index, setIndex] = useState<number>(0);

  const [cards, setCards] = useState<CardItem[]>([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(
          "http://localhost:5000/api/random-users"
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchCards = async () => {
      try {
        const res = await axios.get<CardItem[]>(
          "http://localhost:5000/route/cards-list"
        );
        setCards(res.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchUsers();
    fetchCards();
  }, []);

  const nextSlide = () => {
    if (index < users.length - 3) {
      setIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const visibleUsers = users.slice(index, index + 3);

  return (
    <>
      <Container className="mt-5">
        <Row className="align-items-center mb-4">
          <Col>
            <h2>Dashboard</h2>
          </Col>

          <Col className="text-end">
            <Button variant="light" onClick={prevSlide} className="me-2">
              <ChevronLeft size={20} />
            </Button>

            <Button variant="light" onClick={nextSlide}>
              <ChevronRight size={20} />
            </Button>
          </Col>
        </Row>

        <Row>
          {visibleUsers.map((user, i) => (
            <Col md={4} key={i}>
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <img
                    src={user.image}
                    alt="profile"
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />

                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Card.Text>{user.country}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-5 mb-5">
        <h2 className="mb-4">The Cards</h2>

        <Row>
          {cards.map((card, index) => (
            <Col md={4} key={index}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={card.image}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>

  );
}

export default Dashboard;