import React, { useState } from 'react';

function SearchPhotos(props) {

    const [query, setQuery] = useState("");
    let [photos , setPhotos] = useState([])



        let REQUESTED_URL ="https://api.pexels.com/v1/search?query";
        let API_KEY="563492ad6f9170000100000188f58713ea724d03b55ed1c1613f75d8";

        let url = REQUESTED_URL + "apple";
        console.log(url)
         const getDataFromApi = async () => {
            const res = await fetch(
                url,
            {
              headers: {
                Authorization: API_KEY,
              },
            }
          );
            const responseJson = await res.json();
            console.log(responseJson)
            setPhotos(responseJson.photos);

          };



    return (
        <div>
            <>
                <form className="form">
                    <label className="label" htmlFor="query">
                        {" "}
                        📷
                    </label>
                    <input
                        type="text"
                        name="query"
                        className="input"
                        placeholder={`Try "nature" or "apple"`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="button" onClick={getDataFromApi}>
                        Search
                    </button>
                </form>
            </>

        </div>
    );
}

export default SearchPhotos;