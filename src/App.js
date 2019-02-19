import React, { Component } from 'react';
import './App.css';
import VideoRow from './VideoRow.js';
import YTSearch from 'youtube-api-search';
const API_KEY = "AIzaSyBiXr9e2ydFS7Ion9XB8Qew5qDaDJ_H4CY";
let prevScrollpos = window.pageYOffset;

const parallax = document.getElementsByClassName("titleBar");
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  parallax[0].style.backgroundPositionY = 50 + offset * 0.3 + "px";
  parallax[0].style.backgroundSize = 65 + offset * 0.2 + "%";
}
)

// |+++++++++++++++++++++++++++++++++++++++++++++++|
// |+************Set conditional states***********+|
// |+++++++++++++++++++++++++++++++++++++++++++++++|
//   ______________________________________________    
//   |if scroll upper than Y1325: ****************|
//   |**** -  transparent background *************|
//   |if scroll lower than Y1325: ****************|
//   |**** -  background color change ************|
//   |**** if not close the search bar: **********|
//   |********  - the close icon is visible ******|
//   |**** if close the search bar: **************|
//   |********  if scroll down: ******************|
//   |*************  - make the search bar hidden |
//   |********  if scroll up: ********************|
//   |*************  if scroll upper than Y1856: *|
//   |****************** - show the search bar ***|
//   |*************  if scroll up not reach Y1856:|
//   |****************** - keep search bar hidden |
//   ++++++++++++++++++++++++++++++++++++++++++++++

window.onscroll = function () {

  const currentScrollPos = window.pageYOffset;
  if (currentScrollPos < 1262) {
    document.getElementById("search").style.position = "relative";
    document.getElementById("search").style.top = "540px";
    document.getElementById("search").style.visibility = "visible";
  } else {
    document.getElementById("search").style.position = "fixed";
    document.getElementById("search").style.top = "0px";
  }

  if (currentScrollPos > 1325) {
    // console.log("c" + currentScrollPos);
    // console.log("p" + prevScrollpos);
    document.getElementById("search").style.background = "#E3F9EE";
    // document.getElementById("search").style.background = "#ccccff";

    if (document.getElementById("search").style.visibility === "visible") {
      document.getElementById("close").style.visibility = "visible";
    } else {
      if (prevScrollpos < currentScrollPos) {
        document.getElementById("close").style.visibility = "hidden";
        document.getElementById("search").style.visibility = "hidden";
      } else {
        if (currentScrollPos < 1856) {
          document.getElementById("close").style.visibility = "visible";
          document.getElementById("search").style.visibility = "visible";
        } else {
          document.getElementById("close").style.visibility = "hidden";
        }
      }
    }
    prevScrollpos = currentScrollPos;
  } else {
    document.getElementById("search").style.background = "transparent";
    document.getElementById("close").style.visibility = "hidden";
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

  enterPressed(event) {
    if (event.keyCode === 13) {
      this.clickSearch()
      console.log("seach videos, please wait...")
    }
  }

  scrollTo() {
    document.body.scrollTop = 705;
    document.documentElement.scrollTop = 705;
  }

  closefunc() {
    document.getElementById("search").style.visibility = "hidden";
    document.getElementById("close").style.visibility = "hidden";
  }

  render() {
    return (
      <div className="col">

        {/* title Div */}
        <div className="titleBar" >
          <div id="boy">
            <img alt="sushi" width="75%" src="imhungry.gif" />
          </div>
          <div id="arrow">
            <img alt="arrow" width="17%" src="arrow.gif" onClick={this.scrollTo.bind(this)} />
          </div>
        </div>

        {/* floating search bar */}
        <div className="searchSection">
          <div id="search">
            <input id="searchI" onChange={this.searchChangeHandler.bind(this)} placeholder="hungry? search for bibimbap here......" onKeyDown={this.enterPressed.bind(this)} />
            <img id="searchB" alt="search" width="2.5%" src="button2.png" onClick={this.clickSearch.bind(this)} />
            <img id="close" alt="close" width="1.3%" src="close1.png" onClick={this.closefunc.bind(this)} />
          </div>


          {/* dish table */}
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
