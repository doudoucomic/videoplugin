//main.js
import React from 'react';
import {render} from 'react-dom';

import poster from "../app/components/video/img/poster.jpg";

//容器
import Video from '../app/components/video/Video.jsx';

var videoUrl = "http://obukb5fdy.bkt.clouddn.com/icevideo/video/nayuta.mp4";

 var playInfoList =  {
        "PlayInfo":[
          {
          "Definition": "LD",

          "PlayURL": "http://obukb5fdy.bkt.clouddn.com/icevideo/video/nayuta.mp4",
        },

        {

          "Definition": "SD",

          "PlayURL": "http://obukb5fdy.bkt.clouddn.com/icevideo/video/nayuta.mp4",

        }

        ]

      }

render(<Video width="800px" height="600px" 
       poster={poster} 
       video={videoUrl}
       playInfoList={playInfoList} />, document.getElementById('con'));

// WEBPACK FOOTER // ./app/main.js