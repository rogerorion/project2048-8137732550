
cc.Class({
    extends: cc.Component,
    properties: ()=>({
        startButton:cc.Node,
        startButton1:cc.Node,
        blank:cc.Node,
        blank1:cc.Node,
        blank2:cc.Node,

        soun1:cc.Node,
        labSpriteFrames1:[cc.SpriteFrame],//点击的背景颜色
        musicRoot:require('login-music')
    }),
     onLoad () {
        
     },
    start () {      


        if(cc.sys.localStorage.getItem('lab')){
            console.log("不播放")
            this.soun1.getComponent(cc.Sprite).spriteFrame=this.labSpriteFrames1[1];
            this.musicRoot.onDestroy();
        }

        

           
        let action=cc.repeatForever(
               cc.sequence(
                cc.rotateBy(0.2,2),
                cc.rotateBy(0.2,4),
                cc.rotateBy(0.2,-4),
                cc.rotateBy(0.2,-8),
                cc.rotateBy(0.2,5),
                cc.delayTime(0.5),
               ) 
        );
        let action1=cc.repeatForever(
            cc.sequence(
             cc.rotateBy(0.3,-3),
             cc.rotateBy(0.3,-7),
             cc.rotateBy(0.4,3),
             cc.rotateBy(0.4,6),
             cc.rotateBy(0.4,6),
             cc.delayTime(0.5),
            ) 
     );
        //this.startButton.runAction(action);
        //this.startButton1.runAction(action1);
        let offsetY = 100;
                cc.tween(this.blank)
                .to(0.3,{angle:-30,position:cc.v2(-168,120 + offsetY)})
                .to(0.3,{angle:-60,position:cc.v2(-168,100 + offsetY)})
                .to(0.3,{angle:-90,position:cc.v2(-168,80 + offsetY)})
                .to(0.3,{angle:-120,position:cc.v2(-168,60 + offsetY)})
                .to(0.3,{angle:-150,position:cc.v2(-168,40 + offsetY)})
                .to(0.3,{angle:-180,position:cc.v2(-168,20 + offsetY)})
                .to(0.3,{angle:-150,position:cc.v2(-168,20 + offsetY)})
                .to(0.3,{angle:-120,position:cc.v2(-168,40 + offsetY)})
                .to(0.3,{angle:-90,position:cc.v2(-168,60 + offsetY)})
                .to(0.3,{angle:-60,position:cc.v2(-168,80 + offsetY)})
                .to(0.3,{angle:-30,position:cc.v2(-168,100 + offsetY)})
                .union()
                .repeatForever()
                .start();
                cc.tween(this.blank1)
                .to(0.1,{angle:-35,position:cc.v2(-22,190 + offsetY)})
                .to(0.3,{angle:-70,position:cc.v2(-22,160 + offsetY)})
                .to(0.4,{angle:-90,position:cc.v2(-22,130 + offsetY)})
                .to(0.3,{angle:-110,position:cc.v2(-22,100 + offsetY)})
                .to(0.3,{angle:-157,position:cc.v2(-22,70 + offsetY)})
                .to(0.5,{angle:-180,position:cc.v2(-22,20 + offsetY)})
                .to(0.5,{angle:-158,position:cc.v2(-22,70 + offsetY)})
                .to(0.3,{angle:-120,position:cc.v2(-22,100 + offsetY)})
                .to(0.4,{angle:-90,position:cc.v2(-22,130 + offsetY)})
                .to(0.3,{angle:-60,position:cc.v2(-22,160 + offsetY)})
                .to(0.3,{angle:-30,position:cc.v2(-22,190 + offsetY)})
                .union()
                .repeatForever()
                .start();               
                cc.tween(this.blank2)
                .to(0.3,{angle:-20,position:cc.v2(113,120 + offsetY)})
                .to(0.2,{angle:-50,position:cc.v2(113,100 + offsetY)})
                .to(0.1,{angle:-80,position:cc.v2(113,80 + offsetY)})
                .to(0.3,{angle:-110,position:cc.v2(113,60 + offsetY)})
                .to(0.3,{angle:-157,position:cc.v2(113,40 + offsetY)})
                .to(0.4,{angle:-180,position:cc.v2(113,20 + offsetY)})
                .to(0.5,{angle:-158,position:cc.v2(113,40 + offsetY)})
                .to(0.3,{angle:-100,position:cc.v2(113,80 + offsetY)})
                .to(0.4,{angle:-90,position:cc.v2(113,120 + offsetY)})
                .to(0.3,{angle:-60,position:cc.v2(113,140 + offsetY)})
                .to(0.5,{angle:-30,position:cc.v2(113,160 + offsetY)})
                .union()
                .repeatForever()
                .start();
    },

 update (dt) {
 },

    toMainScene(){
        cc.director.loadScene('main')
    },

    offORopensound(){

        if(this.soun1.getComponent(cc.Sprite).spriteFrame==this.labSpriteFrames1[1]){
            this.soun1.getComponent(cc.Sprite).spriteFrame=this.labSpriteFrames1[0];
            cc.sys.localStorage.setItem('lab',false);

            this.musicRoot.onLoad();

            this.musicRoot.offsound();
            console.log("可以播放"+ cc.sys.localStorage.getItem('lab'))
        }else{
            this.soun1.getComponent(cc.Sprite).spriteFrame=this.labSpriteFrames1[1];
            cc.sys.localStorage.setItem('lab',true);

            this.musicRoot.opensound();

            console.log("bu可以播放"+ cc.sys.localStorage.getItem('lab'))
        }
       


    },
    
     toMainSceneBynumber(){
        cc.director.loadScene('mainByNumber')
    }
});
