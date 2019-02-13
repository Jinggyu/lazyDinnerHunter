import React from 'react';
import YouTubeEmbed from 'react-iframe';

class VideoRow extends React.Component {

    // viewVideo() {
    //     const address = "https://www.youtube.com/watch?v=" + this.props.video.id.videoId
    //     window.location.href = address
    // }

    render() {
        if (this.props.Parity === "even") {
            return (
                <table className="table2">
                    <tbody>
                        <tr>
                            <td id="video" >
                                <YouTubeEmbed url={this.props.link}
                                    width="560px"
                                    height="315px"
                                    display="initial"
                                    position="relative"
                                    allowFullScreen />
                            </td>
                            <td id="text" >
                                <h3>{this.props.video.snippet.title}</h3>
                                <p >{this.props.video.snippet.description}</p>
                                {/* <input type="button" onClick={this.viewVideo.bind(this)} value="view" /> */}
                            </td>
                        </tr>
                    </tbody>
                </table>)
        } else {
            return (
                <table className="table2">
                    <tbody >
                        <tr>
                            <td id="text" >
                                <h3>{this.props.video.snippet.title}</h3>
                                <p>{this.props.video.snippet.description}</p>
                                {/* <input type="button" onClick={this.viewVideo.bind(this)} value="view" /> */}
                            </td>
                            <td id="video" >
                                <YouTubeEmbed url={this.props.link}
                                    width="480px"
                                    height="281.25px"
                                    display="initial"
                                    position="relative"
                                    allowFullScreen />
                            </td>
                        </tr>
                    </tbody >
                </table>
            )
        }
    }

}


export default VideoRow