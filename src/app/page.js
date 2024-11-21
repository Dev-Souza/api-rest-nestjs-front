'use client'
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import apiCars from "./services/apiCars";
import NavBarPadrao from "./components/NavBarPadrao";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // Estado para armazenar o carro selecionado

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarDados() {
    apiCars.get('cars').then(resultado => {
      const carrosOrdenados = resultado.data.sort((a, b) => a.id - b.id);
      setCars(carrosOrdenados);
    });
  }

  // Função para abrir o modal com as informações do carro
  const handleShow = (car) => {
    setSelectedCar(car);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
    <NavBarPadrao></NavBarPadrao>
    <Container className="mt-4">
      <h1 className="text-center mb-4">View Cars</h1>
      <Row className="g-4">
        {cars.map(item => (
          <Col md={4} key={item.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={item.imagem_carro}
                style={{ objectFit: 'cover', height: '300px' }}
              />
              <Card.Body>
                <Card.Title>{item.model}</Card.Title>
                <Card.Text>
                  {item.brand} - {item.year}
                </Card.Text>
                <Button variant="primary" className="w-100" onClick={() => handleShow(item)}>
                  Ver detalhes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para exibir os detalhes do carro selecionado */}
      {selectedCar && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Carro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img 
              src={selectedCar.imagem_carro}
              alt={selectedCar.model}
              style={{ objectFit: 'cover', width: '100%', height: '300px' }}
            />
            <h4>{selectedCar.model}</h4>
            <p>{selectedCar.brand} - {selectedCar.year}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              OK!
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
    </>
  );
}