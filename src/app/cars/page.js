'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import apiCars from "../services/apiCars";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Page() {

    const [cars, setCars] = useState([])

    useEffect(() => {
        carregarDados()
    }, [])

    function carregarDados() {
        apiCars.get('cars').then(resultado => {
            const carrosOrdenados = resultado.data.sort((a, b) => a.id - b.id);
            setCars(carrosOrdenados);
        })
    }

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            apiCars.delete('cars/' + id).then(() => {
                // Atualizar o estado diretamente sem recarregar os dados da API
                setCars(cars.filter(car => car.id !== id));
            })
        }
    }

    return (
        <Container>
            <Link
                href="cars/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>
            <Link
                href="/"
                className="btn btn-danger mb-3"
            >
                <MdOutlineArrowBack /> Tela inicial
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.year}</td>
                            <td style={{width: 200}}>
                                <img src={item.imagem_carro} style={{width: '70%'}}/>
                            </td>
                            <td>
                                <Link href={`cars/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}