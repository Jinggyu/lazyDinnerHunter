import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import VideoRow from './VideoRow.js';
//import $ from "jquery";
import YTSearch from 'youtube-api-search';


const parallax = document.getElementsByClassName("titleBar");
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  // console.log(parallax);
  parallax[0].style.backgroundPositionY = offset * 0.3 + "px";
  parallax[0].style.backgroundSize = 65 + offset * 0.2 + "%";
}
)

const API_KEY = "AIzaSyBiXr9e2ydFS7Ion9XB8Qew5qDaDJ_H4CY";
let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  const currentScrollPos = window.pageYOffset;
  console.log(currentScrollPos);
  if (currentScrollPos < 702) {
    document.getElementById("search").style.position = "relative";
  } else {
    document.getElementById("search").style.position = "fixed";
  }
  prevScrollpos = currentScrollPos;

  if (currentScrollPos > 1325) {
    // document.getElementById("search").style.background = "#ccccff";
    document.getElementById("search").style.background = "#E3F9EE";
  } else {
    document.getElementById("search").style.background = "#66ffcc";
  }
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  searchYT(term) {

    YTSearch({ key: API_KEY, term }, videos => {
      var videoRows = []
      var Parity
      videos.forEach((video, index) => {
        // console.log(video)  
        if (index % 2) {
          Parity = "odd";
        } else {
          Parity = "even";
        }
        const link = "https://www.youtube.com/embed/" + video.id.videoId
        const videoRow = < VideoRow video={video} link={link} key={video.id.videoId} Parity={Parity} />
        videoRows.push(videoRow)
      })
      this.setState({ rows: videoRows })
    })
  }


  searchChangeHandler(event) {
    const searchTerm = event.target.value + " recipe"
    this.setState({ input: searchTerm })
  }

  clickSearch() {
    setTimeout(function () {
      document.body.scrollTop = 1382;
      document.documentElement.scrollTop = 1382;
    }, 2000)
    this.searchYT(this.state.input)
  }


  // enterPressed(event) {
  //   var code = event.keyCode || event.which;
  //   console.log(event.keycode)
  //   if (code === 13) {
  //     this.clickSearch()
  //   }
  // }

  render() {
    return (
      <div className="col">
        {/* title Div */}
        <div className="titleBar" >
          <div id="boy">
            <img alt="boy" width="65%" src="path.svg" />
          </div>
          <h3>I am huuuuungggry
            <div id="arrow">
              <img alt="arrow" width="13%" src="arrow.gif" />
            </div>
          </h3>
        </div>


        <div className="searchSection">
          <div id="search">
            <input id="searchI" onChange={this.searchChangeHandler.bind(this)} placeholder="Hungry? Search for bimbimbap recipes…" />
            <img id="searchB" alt="search" width="2.5%" src="button2.png" onClick={this.clickSearch.bind(this)} />
          </div>



          <table className="table1">
            <tbody>
              <tr>
                <th> <img alt="forks" width="55%" src="1.png" /></th>
                <th><img alt="spice" width="55%" src="2.png" /></th>
                <th><img alt="pie" width="55%" src="3.gif" /></th>
              </tr>
              <tr>
                <td><img alt="poo" width="55%" src="4.gif" /></td>
                <td><img alt="egg" width="55%" src="5.png" /></td>
                <td><img alt="greens" width="55%" src="6.png" /></td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* youtube playback Div */}
        <div className="youtubeSection">
          <div id="vids">
            {this.state.rows}
          </div>
        </div>

      </div >
    );
  }
}

export default App;
