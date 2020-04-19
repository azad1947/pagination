import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PaginationWithMongo from './component/PaginationWithMongo';
import PaginationWithElasticSearch from './component/PaginationWithElasticSearch';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function App() {
    const show = JSON.parse(window.localStorage.getItem('switch-show')) || 10;
    const handleElasticClick = () => {
        window.localStorage.setItem('switch-show', JSON.stringify(10));
    }
    const handleMongoClick = () => {
        window.localStorage.setItem('switch-show', JSON.stringify(11));
    }
    return (
        <Container style={{textAlign: "center"}}>
            <h2>Pagination</h2>
            <span>
                <Button variant={"light"} href={"/pagination-with-elasticsearch"} active={show === 10}
                        onClick={() => handleElasticClick()}>Elasticsearch</Button>
            </span>
            &nbsp;
            <span>
                <Button variant={"light"} href={"/pagination-with-mongoDB"} active={show === 11}
                        onClick={() => handleMongoClick()}>MongoDB</Button>
            </span>
            <br/>
            <br/>
            {show === 10 ? <PaginationWithElasticSearch/> : <PaginationWithMongo/>}
        </Container>
    );
}

export default App;
