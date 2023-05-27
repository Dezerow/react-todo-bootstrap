import { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function App() {
  const [todo, setTodo] = useState("");
  const [todoTable, setTodoTable] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  function setDate() {
    let createDate = new Date();
    let minutes;
    let hour;

    createDate.getHours() >= 10
      ? (hour = createDate.getHours())
      : (hour = `0${createDate.getHours()}`);
    createDate.getMinutes() >= 10
      ? (minutes = createDate.getMinutes())
      : (minutes = `0${createDate.getMinutes}}`);

    let fullHour = `${hour}:${minutes}`;

    let day = createDate.getDate();
    let month;
    createDate.getMonth() + 1 >= 10
      ? (month = createDate.getMonth() + 1)
      : (month = `0${createDate.getMonth() + 1}`);

    let year = createDate.getFullYear();
    let date = `${fullHour} ${day}/${month}/${year}`;

    return date;
  }

  const handleSubmit = () => {
    if (!todo) {
      setShow(true);
      return null;
    }

    setCount(count + 1);

    let quest = {
      id: count,
      purpose: todo,
      date: setDate(),
      active: false,
    };

    setTodoTable((prevState) => [...prevState, quest]);
    setTodo("");
  };

  const handleDelete = (id) => {
    const newArray = todoTable.filter((item) => item.id !== id);
    setTodoTable(newArray);
  };

  const handleStatus = (id, status) => {
    let tableCopy = [...todoTable];

    tableCopy.map((item) => {
      if (item.id === id) {
        item.active = !status;
        item.date = setDate();
      }
      return null;
    });

    setTodoTable(tableCopy);
  };

  const handleClose = () => setShow(false);

  return (
    <Container>
      <Card className="section" body>
        <h1>Lista zadań</h1>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">
            Błąd przy uzupełnianiu pola.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          Aby zatwierdzić dodanie nowego zadania, należy wypełnić pole tekstowe.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Rozumiem
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="section" body>
        <h2>Dodaj zadanie: </h2>
        <Row>
          <Col sm={8}>
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              style={{ width: "100%", textAlign: "center" }}
            ></input>
          </Col>
          <Col sm={4}>
            <Button
              variant="primary"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              Dodaj zadanie
            </Button>
          </Col>
        </Row>
        <div></div>
      </Card>

      <div>
        <Card className="section" body>
          <h2>Do zrobienia: </h2>

          <ul style={{ marginTop: "5%" }}>
            {todoTable.map((item) => {
              return (
                item.active === false && (
                  <li key={item.id} className="task">
                    <Row>
                      <Col xs={12} md={6}>
                        <strong style={{ marginRight: "4px" }}>Zadanie:</strong>
                        {item.purpose}
                        <br />
                        <strong>Data dodania:</strong> {item.date}
                      </Col>
                      <Col sm={6} md={6}>
                        <Button
                          variant="primary"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleStatus(item.id, item.active)}
                        >
                          Wykonane
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Usuń
                        </Button>
                      </Col>
                    </Row>
                  </li>
                )
              );
            })}
          </ul>
        </Card>
      </div>
      <div>
        <Card className="section" body>
          <h2>Wykonane: </h2>
          <ul style={{ marginTop: "5%" }}>
            {todoTable.map((item) => {
              return (
                item.active === true && (
                  <li key={item.id} className="task">
                    <Row>
                      <Col xs={12} md={6}>
                        <strong style={{ marginRight: "4px" }}>Zadanie:</strong>
                        {item.purpose}
                        <br />
                        <strong>Data zakończenia:</strong> {item.date}
                      </Col>
                      <Col sm={6} md={6}>
                        <Button
                          variant="primary"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleStatus(item.id, item.active)}
                        >
                          Niewykonane
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Usuń
                        </Button>
                      </Col>
                    </Row>
                  </li>
                )
              );
            })}
          </ul>
        </Card>
      </div>
    </Container>
  );
}

export default App;
