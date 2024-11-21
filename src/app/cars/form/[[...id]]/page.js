'use client'

import apiCars from "@/app/services/apiCars";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Page({ params }) {

    const route = useRouter()
    const [car, setCar] = useState({ brand: '', model: '', year: '', imagem_carro: '' })

    // Carrega os dados do carro quando o componente é montado
    useEffect(() => {
        const loadCar = async () => {
            const { id } = await params; // Unwrap the promise

            if (id) {
                apiCars.get(`cars/${id}`).then(resultado => {
                    setCar(resultado.data);
                }).catch(error => {
                    console.error('Erro ao carregar o carro:', error);
                });
            }
        };

        loadCar();
    }, [params]); // Ensure that we re-run this if params change

    function salvar(dados) {
        if (car.id) {
            apiCars.patch('cars/' + car.id, dados)
                .then(() => {
                    route.push('/cars');
                })
                .catch(error => {
                    alert(error.response?.data?.message || 'Erro desconhecido ao atualizar o carro');
                });
        } else {
            apiCars.post('cars', dados)
                .then(() => {
                    route.push('/cars');
                })
                .catch(error => {
                    alert(error.response?.data?.message || 'Erro desconhecido ao criar o carro');
                });
        }
    }

    return (
        <Container>
            <Formik
                enableReinitialize
                initialValues={car}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="brand">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                name="brand"
                                value={values.brand}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="model">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control
                                type="text"
                                name="model"
                                value={values.model}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="year">
                            <Form.Label>Ano</Form.Label>
                            <Form.Control
                                type="number"
                                name="year"
                                value={values.year}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="imagem_carro">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagem_carro"
                                value={values.imagem_carro}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button type="submit" variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/cars"
                                className="btn btn-danger ms-2"
                            >
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}