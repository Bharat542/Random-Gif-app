import React, {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { IoMdDownload } from "react-icons/io";



const API_KEY = process.env.REACT_APP_GIPHY_KEY;
const Tag = () => {
    const download = e => {
        console.log(e.target.href);
        fetch(e.target.href, {
          method: "GET",
          headers: {}
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "image.gif"); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            console.log(err);
          });
      };
    const [tag,setTag] = useState("car");
    const [gif,setGif] = useState("");
    const [loading,setLoading] = useState("false");
    
    async function fetchData() {
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
       const {data}= await axios.get(url);
       const imageSource = data.data.images.downsized_large.url;
       console.log(imageSource);
      setGif(imageSource);
      setLoading(false);
    }

    useEffect ( () => {
  fetchData();
    }
, []
    )
    function changeHandler (event) {
       setTag(event.target.value);
    }
    function clickHandler(){
    fetchData();
    }
    return (
  <div className="w-1/2 bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px] relative">
    <h1 className="mt-[15px] text-2xl underline uppercase font-bold "> Random {tag} GIF</h1>

    {
        loading ? (<Spinner/>) : ( <img src={gif} width={450}/> )
    }

     <input className="w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center" onChange={changeHandler} value={tag}/>

   <button onClick={clickHandler} className="w-10/12 bg-white opacity-70 hover:opacity-100 transition-all duration-200 text-lg py-2 rounded-lg mb-[20px]">
    Generate
   </button >
   <div className="flex flex-row items-center justify-center gap-x-1 border bg-black py-2 px-2 rounded-lg text-white absolute right-2 top-1 text-xs">
   
    <IoMdDownload/>
       
   <a
        href="https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}"
        download
        onClick={e => download(e)}
      >
        Download
      </a>
   </div>
  </div>
    );
}

export default Tag;