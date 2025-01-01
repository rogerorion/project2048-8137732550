
cc.Class({
    extends: cc.Component,

    properties: {
        sild:{
            type:cc.AudioClip,
            default:null
        },

        over:{
            type:cc.AudioClip,
            default:null
        },
    },


    // onLoad () {},

    start () {

    },

    palysild(){
        cc.audioEngine.playEffect(this.sild,false);
    },


    /**
     * 播放结束音效
     */
     playOver(){
        cc.audioEngine.playEffect(this.over,false);
    },

    // update (dt) {},
});
