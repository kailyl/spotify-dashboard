import React from "react";
import '../style/Homepage.css';
import Barchart from "./Barchart";

export default function Homepage() {
  const [dates, setDates] = React.useState(null);
  const [currDate, setCurrDate] = React.useState(null);
  const [songs, setSongs] = React.useState(null);
  const [averages, setAverages] = React.useState(null);
  const [frequencies, setFrequencies] = React.useState(null);

  function clickElement(date) {
    setCurrDate(date)
    fetch("/songsOnDay", {
      method: "POST",
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify({
        "day": date,
      })
    }) 
    .then((res) => res.json())
    .then((data) => setSongInfo(data.message));
  }

  function setSongInfo(songsAndInfo) {
    setSongs(songsAndInfo[0]);
    setAverages(songsAndInfo[1]);
    setFrequencies(songsAndInfo[2]);
  }

  React.useEffect(() => {
    fetch("/dates", {
      method: "POST",
    })
    .then((res) => res.json())
    .then((data) => setDates(data.message))
    .then(clickElement(new Date().toJSON().slice(0,10)));
  }, []);

  return (
    <div id="main">
      <div id="all-date-stuff">
        <h3 id="title">days 🎧 </h3>
        <div id="dates">
          {dates ? 
            dates.map((elem, i) => 
              <div className="dateElem" 
                  key={i} 
                  id={elem}
                  style={currDate === elem ? {fontStyle:"italic", fontWeight:"bold"} : {}}
                  onClick={function() {clickElement(elem)}}>
                    {elem.replaceAll("-", ".")}
              </div>)
          : ""}
        </div>
      </div>
      {songs ? 
      <div id="all-song-stuff"> 
        <div id="songz">
          <h3 id="songTitle">songs {" (" + currDate.replaceAll("-", ".") + " utc)"}</h3>
          <div id="songs">
            {songs.map((elem, i) => 
              <div id="songElem" key={i}>
                <div id="songAndArtist">
                  <p id="songName"> {elem["song_name"]} </p>
                  <p id="artists"> 
                    {elem["artists"].join(", ")}
                  </p>
                  <div id="listenedAt">
                    <p id="listenedText">listened at: {" "}</p> 
                    <p id="listenedAtTime"> {" " + elem["listened_at"]} </p>
                  </div> 
                </div>
                <div id="indivGraph">
                  <Barchart 
                    id="graphGraph"
                    acousticness={elem["audio_features"]["acousticness"]}
                    liveness={elem["audio_features"]["liveness"]}
                    valence={elem["audio_features"]["valence"]}
                    instrumentalness={elem["audio_features"]["instrumentalness"]}
                    danceability={elem["audio_features"]["danceability"]}
                    speechiness={elem["audio_features"]["speechiness"]}
                    energy={elem["audio_features"]["energy"]}
                    />
                  <div id="audioFeatures">audio features</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="bottom-boxes">
          <div id="top-artists">
            <h3 id="topTitle">top artists</h3>
            <div id="artistsRank">
              {frequencies.map((elem, i) => 
                <div id="artistDiv" key={i}>
                  <p id="rank"> {i + 1}. </p>
                  <p id="numPlayed"> {elem[1] + " (" + elem[0] + ")"} </p>
                </div>
              )}
            </div>
          </div> 
          <div id="averageGraph">
            <div id="avgs">
              <Barchart 
                acousticness={averages["acousticness"]}
                liveness={averages["liveness"]}
                valence={averages["valence"]}
                instrumentalness={averages["instrumentalness"]}
                danceability={averages["danceability"]}
                speechiness={averages["speechiness"]}
                energy={averages["energy"]}>
              </Barchart>
              <div id="audioFeatures">average audio features</div>
            </div>
            <div id="key">
              <ul>
                <li className="acousticness">acousticness</li>
                <li className="liveness">liveness</li>
                <li className="valence">valence</li>
                <li className="instrumentalness">instrumentalness</li>
                <li className="danceability">danceability</li>
                <li className="speechiness">speechiness</li>
                <li className="energy">energy</li>
              </ul>
            </div>
          </div>
          <div id="about">
            Hi - I'm Kaily. This is what I've been listening to recently on Spotify. Click on a date to view some songs and analytics 
            about them.
          </div>
        </div>
      </div>
      : ""}
    </div>
  );
}