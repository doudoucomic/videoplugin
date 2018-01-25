import React, { Component } from 'react';
import videojs from './video-js/video.js';
import image  from 'react-image-slideshow';
import SWF_PATH from 'video.js/dist/video-js.swf';
import VTTJS_PATH from 'file!videojs-vtt.js/dist/vtt.min.js';

import $ from 'jquery';

require("./css/video-js.css");
require("./css/custom_ctrlbar.css");
require("./css/jquery-ui.min.css");





window.videojs = videojs;
window.$ = $;
window.jQuery = $;

class Video extends Component {
    constructor(...args) {
        super(...args);
    }
    componentWillMount() {
        window.playInfoList = this.props.playInfoList;
        videojs.options.flash.swf = SWF_PATH;
        videojs.options['vtt.js'] = VTTJS_PATH;
        require('./js/jquery-ui.min.js');
        require("./js/sco.tooltip.js");
        require("./js/playerCtrl.js");
    }
    render() {
        const {width,height,poster,video} = this.props;
        return (
            <div>
                <div id="videocontainer">
                    <video id="idVideo" className="video-js vjs-default-skin  vjs-big-play-centered"
                        width={width} height={height} 
                        controls="true"
                        data-setup='{ "html5" : { "nativeTextTracks" : false } }'
                        poster={poster}>
                        <source src={video} type='video/mp4' />
                        <div id="danmu"></div>
                    </video>
                </div>
            </div>
        );
    }
}
module.exports = Video;