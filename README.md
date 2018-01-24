### 说明
本视频插件可以进行清晰度切换，播放速度变更，进度条缓冲条等，
样式自定义。

### 开发环境运行
npm install  
npm run dev  
备注：端口8010

### 生产发布
npm install  
npm run dist  
备注：根目录下dist文件夹为打包好的前端静态文件


### npm发布
npm install  
npm run prePublishs  
备注：lib目录编译好后的插件


### 插件使用方法
# 安装
npm install videoplugin
# react 中引用插件
import videoplugin from 'videoplugin';
# 参数
<videoplugin 
  poster={'视频封面'}
  videoUrl={'初始显示视频'}
  definition={'清晰度'}
  playInfoList={'视频数组，普清，高清，超清'}//普清 = LD ,高清 = SD, 超清 = HD
/>

# 参数例子
poster= "http:*****.jpg"
videoUrl= "http://obukb5fdy.bkt.clouddn.com/icevideo/video/nayuta.mp4"
definition = "LD"
playInfoList =  {
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
