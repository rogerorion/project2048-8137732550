
cc.Class({
    extends: cc.Component,

    properties: ()=>({
        bgm:{
            type:cc.AudioClip,
            default:null
        }
    }),
     onLoad () {
        if(!cc.audioEngine.isMusicPlaying()){
            this.current=cc.audioEngine.play(this.bgm,true)
        }
     },

    start () {
          
    },
    offsound(){
        cc.audioEngine.resumeAll()
        
    },
    opensound(){
        cc.audioEngine.pauseAll()
        
    },

    onDestroy(){
        cc.audioEngine.stop(this.current);
    }
});
