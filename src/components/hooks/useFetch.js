import {useState, useEffect} from 'react'

const useFetch = (url, options) => {
    const [course, setCourse1] = useState({})

    function fetchNow(url, options) {
        fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
                setCourse1(res.rates)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if(url) {
            fetchNow(url, options)
        }
    }, [])

    return { course, fetchNow }
}

export default useFetch