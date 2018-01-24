window.onload = function () {
    var player = videojs("idVideo", {
        "controls": false,
        "autoplay": false,
        "preload": "auto",
        "loop": false,
        "muted": false,
        controlBar: {
            playToggle: false,
            captionsButton: false,
            chaptersButton: false,
            playbackRateMenuButton: false,
            LiveDisplay: false,
            subtitlesButton: false,
            remainingTimeDisplay: false,
            progressControl: false,
            volumeMenuButton: false,
            fullscreenToggle: false,
            playbackRateMenuButton: true,
        }

    }, function () {
        //自定义播放按钮
        var customer_play = document.createElement('btn')
        customer_play.innerHTML = '<btn  class="customer_pause" id="idplay" onclick="onclickPlayBtn()">' +
            '</btn>';
        var controlBar = document.getElementsByClassName('vjs-control-bar')[0];
        controlBar.innerHTML="";
        controlBar.appendChild(customer_play);


        /*自定义时间显示*/
        var progresstimeBtn = document.createElement('btn');
        progresstimeBtn.innerHTML = '<div class="progressTime">' + '<span class="current"></span>' +
            +'<div><span>/</span></div>' + '<span class="duration"></span>' + '</div>';
        controlBar.appendChild(progresstimeBtn);

        player.on('timeupdate', function () {
            $('.duration').text(formatTime(player.duration()));
            $('.current').text(formatTime(player.currentTime()));
        });

        //自定义全屏按钮
        var customer_Fullscreen = document.createElement('btn')
        customer_Fullscreen.innerHTML = '<btn  class="fullscreen_customBtn" id="idfullscreen" onclick="onclickFullscreenBtn()">' +
            '</btn>';
        controlBar.appendChild(customer_Fullscreen);
        /*弹幕开关*/
        var danmulabel = document.createElement('label')
        danmulabel.innerHTML = '<label id="iddanmulabel" class="danmulabel danmulabel-nochose" for="idonoffcheckbox">' +
            '弹幕</label>';
        controlBar.appendChild(danmulabel);

        var danmuswitchBtn = document.createElement('btn');
        danmuswitchBtn.innerHTML = '<btn class="danmuswitch">' +
            '<input id="idonoffcheckbox" class="danmuswitch-checkbox"  type="checkbox" onclick="onclickDanmuswitchBtn()">' +
            '<label id="idonofflabel" class="danmuswitch-label danmuswitch-label-nochose" for="idonoffcheckbox">' +
            '<span id="idoffradio" class="danmuswitch-switch"></span>' +
            '</btn>';
        controlBar.appendChild(danmuswitchBtn);







        /*自定义视频切换*/

        var videoPanelMenuBtn = document.createElement('btn')
        videoPanelMenuBtn.innerHTML = '<div class="vjs-subs-caps-button  vjs-menu-button vjs-menu-button-popup vjs-control vjs-button"  aria-live="polite" aria-expanded="false" aria-haspopup="true">' +
            '<div class="vjs-menu" role="presentation">' +
            '<ul class="vjs-menu-content" role="menu">' +
            '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="changeVideo(1)">普通</li>' +
            '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="changeVideo(2)">标清 </li>' +
            '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="changeVideo(3)">高清 </li>' +
            '</ul></div>' +
            '<button class="vjs-subs-caps-button vjs-control vjs-button" type="button" aria-live="polite" title="清晰度切换" aria-disabled="false">' +
            '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text">清晰度切换</span>' +
            '</button>' +
            '</div>';
        controlBar.appendChild(videoPanelMenuBtn);


        var obj = {
            tag: false,
            ctime: 0
        };
        window.obj = obj;
        var myPlayer = videojs.getPlayers()['idVideo'];
        myPlayer.on("timeupdate", function () {

            if (window.obj.tag) {
                videojs("idVideo").currentTime(window.obj.ctime)
                videojs("idVideo").play();
                window.obj.tag = false;
            }

            //视频打点  
            var ctime_ = videojs("idVideo").currentTime();
            if (ctime_ == 60) {
                videojs("idVideo").currentTime(ctime_ + 1);
                //do something  
            }


        });



        /*自定义音量按钮*/

        var customer_volumeBtn = document.createElement('btn')
        customer_volumeBtn.innerHTML = '<btn  class="customer_volume" id="idvolume" onclick="onclickMute()"">' +
            '</btn>';
        controlBar.appendChild(customer_volumeBtn);

        $("body").append("<div id='tip2' hidden='true'><form  id='idbackground'><div id='slider-vertical'></div></form></div> ");

        $('#idvolume').scojs_tooltip({
            appendTo: '.video-js',
            contentElem: '#tip2',

        });


        $("#slider-vertical").slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 100,
            value: 50,
            slide: function (event, ui) {
                //$( "#amount" ).val( ui.value );
                player.volume = ui.value;
            }
        });

        $("#idvolume").hover(function () {
            var videoDiv = document.getElementById('idVideo');
            var flwidth = videoDiv.offsetWidth - 130;
            var flheight = videoDiv.offsetHeight - 180;
            $("#idbackground").css('margin-left', flwidth + 'px');
            $("#idbackground").css('margin-top', flheight + 'px');
        });



        /*自定义加速按钮*/
        var fastBtn = document.createElement('btn')
        fastBtn.innerHTML = '<btn  class="fastBtn" id="fastBtn" onclick="fast()"">' + '</btn>';
        controlBar.appendChild(fastBtn);

        /*自定义加速按钮*/

        var fastBtn = document.createElement('btn')
        fastBtn.innerHTML = '<div class="vjs-subs-caps-button  vjs-menu-button vjs-menu-button-popup vjs-control vjs-button"  aria-live="polite" aria-expanded="false" aria-haspopup="true">' +
            '<div class="vjs-menu" role="presentation">' +
            '<ul class="vjs-menu-content" role="menu">' +
            '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="fast(1)">1x</li>' +
            '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="fast(2)">0.5x </li>' +
            '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="fast(3)">2x</li>' +
            '</ul></div>' +
            '<button class="vjs-subs-caps-button vjs-control vjs-button" type="button" aria-live="polite" title="播放速度变更" aria-disabled="false">' +
            '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text">播放速度变更</span>' +
            '</button>' +
            '</div>';
        controlBar.appendChild(fastBtn);



        /*自定义进度条*/
        var progressBtn = document.createElement('div');
        progressBtn.innerHTML = '<div class="progressBar">' + '<div class="bufferBar"></div>' + '<div class="timeBar"></div>' +
            ' <div class="processbtn"></div>' + '</div>';
        $('.timeBar').after('<div class="processbtn"></div>');
        controlBar.appendChild(progressBtn);


        //update HTML5 video current play time
        player.on('timeupdate', function () {
            var currentPos = player.currentTime(); //Get currenttime
            var maxduration = player.duration(); //Get video duration
            var percentage = 100 * currentPos / maxduration; //in %
            $('.timeBar').css('width', percentage + '%');
            $('.processbtn').css('left', percentage - 0.5 + '%');
        });

        var timeDrag = false; /* Drag status */
        $('.progressBar').mousedown(function (e) {
            timeDrag = true;
            updatebar(e.pageX);
        });
        $(document).mouseup(function (e) {
            if (timeDrag) {
                timeDrag = false;
                updatebar(e.pageX);
            }
        });
        $(document).mousemove(function (e) {
            if (timeDrag) {
                updatebar(e.pageX);
            }
        });

        //update Progress Bar control
        var updatebar = function (x) {
            var progress = $('.progressBar');
            var maxduration = player.duration(); //Video duraiton
            var position = x - progress.offset().left; //Click pos
            var percentage = 100 * position / progress.width();

            //Check within range
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }

            //Update progress bar and video currenttime
            $('.timeBar').css('width', percentage + '%');
            player.currentTime(maxduration * percentage / 100);
            player.play();


        };


        var startBuffer = function () {
            var maxduration = player.duration();
            var currentBuffer = player.bufferedEnd();
            var percentage = 100 * currentBuffer / maxduration;
            $('.bufferBar').css('width', percentage + '%');

            if (currentBuffer < maxduration) {
                setTimeout(startBuffer, 500);
            }
        };
        setTimeout(startBuffer, 500);


    });

    var playStatus = true;
    var fullscreenStatus = false;

    window.onclickPlayBtn=function() {
        if (!playStatus) {
            playStatus = true;
            $("#idplay").removeClass('customer_play');
            $("#idplay").addClass('customer_pause');
            player.play();
        } else {
            playStatus = false;
            $("#idplay").removeClass('customer_pause');
            $("#idplay").addClass('customer_play');
            player.pause();
        }
    }

    window.onclickFullscreenBtn=function() {
        if (!fullscreenStatus) {
            player.requestFullscreen();
            fullscreenStatus = true;
            $("#idfullscreen").removeClass('fullscreen_customBtn');
            $("#idfullscreen").addClass('restore_customBtn')

        } else {
            player.exitFullscreen();
            fullscreenStatus = false;
            $("#idfullscreen").removeClass('restore_customBtn');
            $("#idfullscreen").addClass('fullscreen_customBtn')
        }
    }

    window.onclickDanmuswitchBtn=function() {
        var check = $("#idonoffcheckbox").is(':checked');
        if (check == true) {
            console.log("弹幕在ON的状态下");
            $("#idonofflabel").removeClass("danmuswitch-label danmuswitch-label-nochose")
            $("#idonofflabel").addClass("danmuswitch-label danmuswitch-label-chose")
            $("#idoffradio").addClass("danmuswitch-switch-click");
            $("#iddanmulabel").removeClass("danmulabel danmulabel-nochose")
            $("#iddanmulabel").addClass("danmulabel danmulabel-chose")
        } else {
            console.log("弹幕在OFF的状态下");
            $("#idonofflabel").removeClass("danmuswitch-label danmuswitch-label-chose")
            $("#idonofflabel").addClass("danmuswitch-label danmuswitch-label-nochose")
            $("#idoffradio").removeClass("danmuswitch-switch-click");
            $("#iddanmulabel").removeClass("danmulabel danmulabel-chose")
            $("#iddanmulabel").addClass("danmulabel danmulabel-nochose")
        }
    }

    window.onclickMute=function() {
        //点击静音
        player.muted();
    }




    window.getProgress=function() {
        var percent = video.currentTime / video.duration;
        playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
        showProgress.innerHTML = (percent * 100).toFixed(1) + "%";
    }


    window.formatTime=function(seconds) {
        var guide = arguments.length <= 1 || arguments[1] === undefined ? seconds : arguments[1];
        return (function () {
            var s = Math.floor(seconds % 60);
            var m = Math.floor(seconds / 60 % 60);
            var h = Math.floor(seconds / 3600);
            var gm = Math.floor(guide / 60 % 60);
            var gh = Math.floor(guide / 3600);

            // handle invalid times  
            if (isNaN(seconds) || seconds === Infinity) {
                // '-' is false for all relational operators (e.g. <, >=) so this setting  
                // will add the minimum number of fields specified by the guide  
                h = m = s = '-';
            }

            // Check if we need to show hours  
            h = h > 0 || gh > 0 ? h + ':' : '';

            // If hours are showing, we may need to add a leading zero.  
            // Always show at least one digit of minutes.  
            m = ((h || gm >= 10) && m < 10 ? '0' + m : m);
            if (m < 10) {
                m = '0' + m
            }
            m = m + ':';
            // Check if leading zero is need for seconds  
            s = s < 10 ? '0' + s : s;

            return h + m + s;
        })();
    }
    window.changeVideo=function(type) {

        var ctime = videojs("idVideo").currentTime();

        if (type == 1) {
            videojs("idVideo").src([{
                type: "video/mp4",
                src: window.playInfoList.PlayInfo[0].PlayURL
            }]);
            videojs("idVideo").play();


        }
        if (type == 2) {
            videojs("idVideo").src([{
                type: "video/mp4",
                src: window.playInfoList.PlayInfo[1].PlayURL
            }]);
            videojs("idVideo").play();

        }
        if (type == 3) {
            videojs("idVideo").src([{
                type: "video/mp4",
                src: window.playInfoList.PlayInfo[2].PlayURL
            }]);
            videojs("idVideo").play();
        }
        window.obj.ctime = ctime;
        window.obj.tag = true;
        videojs("idVideo").currentTime(ctime);



    }

    window.fast=function(type) {
        if (type == 1) {
            player.playbackRate(1);
        }
        if (type == 2) {
            player.playbackRate(0.5);


        }
        if (type == 3) {
            player.playbackRate(2);

        }

    }


}