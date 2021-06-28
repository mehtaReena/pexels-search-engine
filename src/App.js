
import { useEffect, useRef, useState } from "react";



function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);


  let search = useRef()

	let fetchPictures = async (type) => {
    let response, data
    let header = { headers: { "Authorization": "563492ad6f9170000100000113f525316273470d9df782d184f60f54" } }
    switch (type) {
        case "initial":
            response = await fetch("https://api.pexels.com/v1/curated?per_page=30", header)
            data = await response.json()
             setLoading(false)
            setData(data.photos)
            break;
        case "search":
             if (search.current.value==""){
              search.current.value="apple"
             }
            response = await fetch("https://api.pexels.com/v1/search?query=" + search.current.value + "&per_page=30", header)
            data = await response.json()
            setData(data.photos)
            break;
        default:
            break;
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
