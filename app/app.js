//main.js
import React from 'react';
import {render} from 'react-dom';

//import poster from "./components/video/img/poster.jpg";

//容器
import Video from './components/video/Video.jsx';

//var videoUrl = "http://obukb5fdy.bkt.clouddn.com/icevideo/video/nayuta.mp4";

class Videopluhin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }



    componentWillMount() {
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, prevState) {}
    componentWillUnmount() {

    }





    render() {

        return (
            <div>
            <Video width="800px" height="600px"
            poster={this.props.poster!== undefined ? this.props.poster : " "} 
            video={this.props.videoUrl} 
            definition={this.props.definition!== undefined ? this.props.definition : " "} 
            playInfoList={this.props.playInfoList!== undefined ? this.props.playInfoList : " "} 
            />

            </div>
        );
    }
}




export default Videopluhin;