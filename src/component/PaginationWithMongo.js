import React, {useState, useEffect} from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import "../App.css";

function PaginationWithMongo() {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [show, setShow] = useState(false);
    const str1 = 'show all pages';
    const str2 = 'reduce all pages';
    const id = parseInt(window.localStorage.getItem('m-latestPage')) || pageNo
    const showPageBucket = JSON.parse(window.localStorage.getItem('m-show')) || show

    let arr = []
    const handleSetPage = (pageNo) => {
        setPageNo(pageNo);
        window.localStorage.setItem('m-latestPage', pageNo)
    }
    const handleShowBucket = () => {
        let flag = !show;
        setShow(flag);
        window.localStorage.setItem('m-show', JSON.stringify(flag));
    }
    const handleFirstPage = () => {
        setPageNo(1);
        window.localStorage.setItem('m-latestPage', JSON.stringify(1));
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/movie/${id}`)
            .then(result => {
                setCount(result.data.count);
                setData(result.data.doc);
            })
            .catch(err => console.log(err))
    }, [id])
    for (let i = 1; i <= Math.ceil(count / 10); i++)
        arr.push(i);

    arr = arr.map(val => <Pagination.Item key={val} active={val === id}
                                          onClick={() => handleSetPage(val)}>{val}</Pagination.Item>)
    return (
        <div>
            <Table striped bordered hover style={{textAlign: "center"}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>MovieID</th>
                    <th>Title</th>
                    <th>Genres</th>
                </tr>
                </thead>
                <tbody>
                {data.map((doc, ind) => {
                    return (
                        <tr>
                            <td>{(id - 1) * 10 + ind + 1}</td>
                            <td>{doc.movieID}</td>
                            <td>{doc.title}</td>
                            <td>{doc.genres}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <Pagination className={"no-wrap"}>
                <Pagination.First onClick={() => handleFirstPage()}/>
                <Pagination.Prev onClick={() => {
                    if (pageNo !== 1) {
                        setPageNo(pageNo - 1)
                        window.localStorage.setItem('m-latestPage', JSON.stringify(pageNo - 1))
                    } else {
                        setPageNo(pageNo);
                        window.localStorage.setItem('m-latestPage', JSON.stringify(pageNo));
                    }
                }}/>
                {showPageBucket ? arr : [arr[id - 1], arr[id], arr[id + 1], arr[id + 2], arr[id + 3], arr[id + 4], arr[id + 5], arr[id + 6], arr[id + 7], arr[id + 8], arr[id + 9]]}

                <Pagination.Next
                    onClick={() => {
                        if (pageNo !== Math.ceil(count / 10)) {
                            setPageNo(pageNo + 1);
                            window.localStorage.setItem('m-latestPage', JSON.stringify(pageNo + 1))
                        } else {
                            setPageNo(pageNo);
                            window.localStorage.setItem('m-latestPage', JSON.stringify(pageNo))
                        }
                    }}/>
                <Pagination.Last onClick={() => {
                    setPageNo(Math.ceil(count / 10));
                    window.localStorage.setItem('m-latestPage', JSON.stringify(Math.ceil(count / 10)))
                }}/>
                <Pagination.Item onClick={() => handleShowBucket()}>
                    {!showPageBucket ? str1 : str2}
                </Pagination.Item>
            </Pagination>
        </div>
    )
}

export default PaginationWithMongo;
