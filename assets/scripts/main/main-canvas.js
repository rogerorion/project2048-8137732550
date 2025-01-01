// var manager =require('main-blockManager');
// 这样写无法互相引用
cc.Class({
    extends: cc.Component,

    //解决方案，在属性中引用,针对互相引用问题
    properties: ()=>({
        //管理5个生命条
        hpManager:cc.Node,
        //分数显示
        showScoreLabel:cc.Label,

        //最高分数
        showmaxScoreLabel:cc.Label,

        blockManager:require('main-blockManager'),
        musicRoot:require('main-music'),

        overpage:cc.Node,
        overtitle:cc.Node,

        overshowis:cc.Node,

        overshownot:cc.Node,

    }),

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.hp=5;
        this.score=0;

        this.overpage.opacity=0;

        this.overtitle.opacity=0;

        this.button = this.overshowis.getComponent(cc.Button);
        this.button.node.on('click', this.onClickThingis, this);

        this.buttonnot = this.overshownot.getComponent(cc.Button);
        this.buttonnot.node.on('click', this.onClickThingnot, this);

        if( this.overtitle.opacity===0){
            this.button.node.off('click', this.onClickThingis, this);
            this.buttonnot.node.off('click', this.onClickThingnot, this);
        }
       
     },

    start () {
        this.openTouch();
        this.updateHpShow(this.hp);

        if(cc.sys.localStorage.getItem('maxscore')===null){
            this.showmaxScoreLabel.string=0;
            cc.sys.localStorage.setItem('maxscore',0);
        }else if(cc.sys.localStorage.getItem('maxscore')===""){
            this.showmaxScoreLabel.string=0;
            cc.sys.localStorage.setItem('maxscore',0);
        }else{
            this.showmaxScoreLabel.string=cc.sys.localStorage.getItem('maxscore');
        }
        
    },

    onClickThingis(){
        this.scheduleOnce(()=>{
            cc.director.loadScene('main');
        })
    },

    onClickThingnot(){
        this.scheduleOnce(()=>{
            cc.director.loadScene('login');
        })
    },

    touchEnd(e){
        this.musicRoot.playHit();
        //获取下位置    
        let pos=this.node.convertToNodeSpaceAR(e.getLocation());
        //每个方块空间为130*130 5个方块一排为650宽
        //所以在坐标转化时是325 col行 row列
        //加一是因为5*5的空间 ，采用7*7的二维数组，
        let col=Math.floor((325+pos.x)/130)+1
        let row=Math.floor((325-pos.y)/130)+1
        console.log(col,row)
        console.log(pos.x,pos.y)
        
        if(col<1 || col>5 || row<1 || row>5){
            console.log("Out of range!")
            return;
        }
        if(!this.blockManager.blockAddOne(col,row)){
            return;
        }
        this.hp-=1;
        if(this.hp<=0){
            console.log('Game Over!');
            this.closeTouch();

            this.musicRoot.playOver();
            
            let this_=this;
            
            this_.overtitle.active=true;
            this_.overtitle.position=cc.v2(0,0); 
            this_.overpage.opacity=113;

            this_.overtitle.opacity=255;


            this.updateHpShow(this.hp);
            return;
        }
        this.updateHpShow(this.hp);
        this.closeTouch();
        //每次检查前都应该清除book,count为0
        this.blockManager.count=0;
        this.blockManager.setZeroBook();
        let num=this.blockManager.map[col][row];
        this.blockManager.mapForCount(col,row,num);
        if(this.blockManager.count<3){
            this.openTouch();
            return;
        }


        this.blockManager.hits=0;
        this.blockManager.doActionForBook(col,row);
    },

    /**
     * 刷新血量
     */
    updateHpShow(hp){
        if(hp<0)hp=0;
        if(hp>5)hp=5;
        for(let i=0;i<5;i++){
            this.hpManager.children[i].opacity=0
        }
        for(let i=0;i<hp;i++){
            this.hpManager.children[i].opacity=255
        }
    },


    /**
     * 
     * 分数增加,传入消除数量与消除方块的数
     */
        updateScore(num,k){
            this.showScoreLabel.node.runAction(
                cc.sequence(
                    cc.scaleTo(0.1,1.2),
                    cc.callFunc(()=>{
                        this.score+=(k+1)*num;
                        this.showScoreLabel.string=this.score+"";

                        if(Number(this.showScoreLabel.string)>=Number(this.showmaxScoreLabel.string)){
                            this.showmaxScoreLabel.string=this.showScoreLabel.string;
                            cc.sys.localStorage.setItem('maxscore',Number(this.showScoreLabel.string));
                        }
                    },this),
                ),
                cc.scaleTo(0.1,1)
            )
        },
    /**
     * 打开触摸
     */
    openTouch(){
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    },

    /**
     * 关闭触摸
     */
    closeTouch(){
        this.node.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    },

    //返回首页
    tohome(){
        this.scheduleOnce(()=>{
            cc.director.loadScene('login');
        })
    },

    // update (dt) {},
});
