
import { useEffect, useRef, useState } from "react";



function App() {
    let [data, setData] = useState([])
    let [loading, setLoading] = useState(true);
    const API_KEY = "563492ad6f9170000100000188f58713ea724d03b55ed1c1613f75d8";

    let search = useRef()

    let fetchPictures = async (type) => {
        let response, data
        let header = { headers: { "Authorization": API_KEY } }
        if (type === "initial") {

            response = await fetch("https://api.pexels.com/v1/curated?per_page=15", header)
            data = await response.json();
            setLoading(false)
            setData(data.photos)
        }
        if (type === "search") {
            if (search.current.value === "") {
                search.current.value = "apple"
            }
            setLoading(true)
            response = await fetch("https://api.pexels.com/v1/search?query=" + search.current.value + "&per_page=30", header)
            data = await response.json();
            setLoading(false)
            setData(data.photos)

        }
    }


    useEffect(() => fetchPictures("initial"), [])
    return (
        <div className="container">

            <div className="search">
                <input type="text" placeholder='e.g. apples, nature' ref={search} />
                <button onClick={() => fetchPictures("search")}>Search</button>
            </div>
            <h1>Images </h1>
            {loading ? (
                <h1>Loading . . .</h1>
            ) : (
                <div className="images">
                    {data.map((photo, index) => {
                        return (
                            <a className="image" href={photo.url} key={index}>
                                <img src={photo.src.portrait} alt="pexels" />
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default App;
