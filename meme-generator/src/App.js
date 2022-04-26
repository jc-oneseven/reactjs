import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    memeImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getNewMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    setMeme((preMeme) => ({
      ...preMeme,
      memeImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((preMeme) => ({
      ...preMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          name="topText"
          placeholder="Top text"
          className="form--input"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom text"
          className="form--input"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <button onClick={getNewMemeImage} className="form--button">
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.memeImage} className="meme--image" alt="Meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default App;
