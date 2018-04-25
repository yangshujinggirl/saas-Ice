import Config from '../../config/BaseConfig'

/**
 * webp相关
 */
class Webp {
    constructor() {
        this.isDetecting = true; //是否正在检测
        this.isSupport = false; //是否支持

        this.detect(); //这里需要尽可能早地检测兼容性，以便能尽可能早地使用
    }

    /**
     * 获取浏览器兼容结果，兼容true否则false
     * @return boolean
     */
    getSupport() {
        if (!Config.IS_WEBP_ON || this.isDetecting) {
            return false;
        }
        // 暂时先不开启，等待app
        // if(Tools.isRbyIosAppBrowser() && Tools.getAppVersion() >= 251){
        //     // 在iosapp的251版本之后默认都开启webp
        //     return true;
        // }
        return this.isSupport;
    }

    /**
     * 检测当前客户端是否兼容webp
     */
    detect() {
        var img = new Image();
        img.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        img.onload = img.onerror = function() {
            Webp.isDetecting = false;
            if (img.width === 2 && img.height === 2) {
                Webp.isSupport = true;
            } else {
                Webp.isSupport = false;
            };
        };
    }
};


export default new Webp();
