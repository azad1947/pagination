import React, {useState, useEffect} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import "../App.css";

function PaginationWithElasticSearch() {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [show, setShow] = useState(false);
    const str1 = 'show all pages';
    const str2 = 'reduce all pages';
    const id = parseInt(window.localStorage.getItem('e-latestPage')) || pageNo
    const showPageBucket = JSON.parse(window.localStorage.getItem('e-show')) || show

    let arr = []
    const handleSetPage = (pageNo) => {
        setPageNo(pageNo);
        window.localStorage.setItem('e-latestPage', pageNo)
    }
    const handleShowBucket = () => {
        let flag = !show;
        setShow(flag);
        window.localStorage.setItem('e-show', JSON.stringify(flag));
    }
    const handleFirstPage = () => {
        setPageNo(1);
        window.localStorage.setItem('e-latestPage', JSON.stringify(1));
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/pagination/with-es/${id}`)
            .then(result => {
                console.log('result--->', result)
                setCount(result.data.count);
                setData(result.data.data);
            })
            .catch(err => console.log(err))
    }, [id])
    console.log('data----->', data)
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
                            <td>{doc._source.movieId}</td>
                            <td>{doc._source.title}</td>
                            <td>{doc._source.genres}</td>
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
                        window.localStorage.setItem('e-latestPage', JSON.stringify(pageNo - 1))
                    } else {
                        setPageNo(pageNo);
                        window.localStorage.setItem('e-latestPage', JSON.stringify(pageNo));
                    }
                }}/>
                {showPageBucket ? arr : [arr[id - 1], arr[id], arr[id + 1], arr[id + 2], arr[id + 3], arr[id + 4], arr[id + 5], arr[id + 6], arr[id + 7], arr[id + 8], arr[id + 9]]}

                <Pagination.Next
                    onClick={() => {
                        if (pageNo !== Math.ceil(count / 10)) {
                            setPageNo(pageNo + 1);
                            window.localStorage.setItem('e-latestPage', JSON.stringify(pageNo + 1))
                        } else {
                            setPageNo(pageNo);
                            window.localStorage.setItem('e-latestPage', JSON.stringify(pageNo))
                        }
                    }}/>
                <Pagination.Last onClick={() => {
                    setPageNo(Math.ceil(count / 10));
                    window.localStorage.setItem('e-latestPage', JSON.stringify(Math.ceil(count / 10)))
                }}/>
                <Pagination.Item onClick={() => handleShowBucket()}>
                    {!showPageBucket ? str1 : str2}
                </Pagination.Item>
            </Pagination>
        </div>
    )
}

export default PaginationWithElasticSearch;
