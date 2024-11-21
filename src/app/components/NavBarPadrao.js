import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap";
import { FaLock, FaUser } from "react-icons/fa";

export default function NavBarPadrao(props) {
    const route = useRouter();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: 100 }} className="fs-5">
                <Container>
                    <Navbar.Brand href="/">KauanCine</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link onClick={handleShow}>Login</Nav.Link>
                        {/* Minha MODAL */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title><h1>Login</h1></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Formik
                                    initialValues={{ usuario: '', senha: '' }}
                                    onSubmit={values => autenticar(values)}
                                >
                                    {({
                                        values,
                                        handleChange,
                                        handleSubmit,
                                    }) => {
                                        const login = () => {
                                            if(values.usuario == 'admin' && values.senha == 'admin'){
                                                return route.push('/cars')
                                            }
                                            alert('Usuario ou senha incorreta!')
                                        }
                                        return (
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="usuario">
                                                    <Form.Label>
                                                        <FaUser className="me-2" /> Usuario
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="kauan123"
                                                        name="usuario"
                                                        value={values.usuario}
                                                        onChange={handleChange('usuario')}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-4" controlId="senha">
                                                    <Form.Label>
                                                        <FaLock className="me-2" /> Senha
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Digite sua senha"
                                                        name="senha"
                                                        value={values.senha}
                                                        onChange={handleChange('senha')}
                                                    />
                                                </Form.Group>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Cancelar
                                                    </Button>
                                                    <Button variant="primary" onClick={login}>
                                                        Entrar
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </Modal.Body>
                        </Modal>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}