
cc.Class({
    extends: cc.Component,

    properties: ()=>({
        starlatPrefabs:{type:cc.Prefab,default:null},
        musicRoot:require('mainByNumber-music'),
        canvasRoot:require('mainByNumber-canvas'),
        lauout_bg:{type:cc.Node,default:null},
        yout002Prefabs:{type:cc.Prefab,default:null},
        fenshu:cc.Label,
        maxfenshu:cc.Label,
        maxhec:cc.Label,

        overpage:cc.Node,
        overtitle:cc.Node,

    }),

     onLoad () {
        this.fenshu.string=0;
       
        if(cc.sys.localStorage.getItem('maxfenshu')===null){
            this.maxfenshu.string=0;
            cc.sys.localStorage.setItem('maxfenshu',0);
        }else if(cc.sys.localStorage.getItem('maxfenshu')===''){
            this.maxfenshu.string=0;
            cc.sys.localStorage.setItem('maxfenshu',0);
        }else{
            this.maxfenshu.string=cc.sys.localStorage.getItem('maxfenshu');
        }

        if(cc.sys.localStorage.getItem('maxhec')===null){
            this.maxhec.string=0;
            cc.sys.localStorage.setItem('maxhec',0);
        }else if(cc.sys.localStorage.getItem('maxhec')===''){
            this.maxhec.string=0;
            cc.sys.localStorage.setItem('maxhec',0);
        }else{
            this.maxhec.string=cc.sys.localStorage.getItem('maxhec');
        }
        //创建数字方块池
        this.pond=new cc.NodePool();

        //创建数字方块池
        this.bgblankpool=new cc.NodePool();

        //初始化背景快
        for(let i=1;i<5;i++){
            for(let j=1; j<5;j++){
                this.instantiateBybgblank(i,j);
            }
        }

        for(let i=0;i<20;i++){
            this.pond.put(cc.instantiate(this.yout002Prefabs))
            this.bgblankpool.put(cc.instantiate(this.starlatPrefabs))
        };
        
        this.into();

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


        this.advertisement.active=false;
        
        this.advertisement.position=cc.v2(-1000,800);

     },

     start () {
                    let x=this.randNum(1,4);
                    let y=this.randNum(1,4);
        
                   

                     this.gameStart(x,y,2);
                     this.map[x][y]=2;
                    this.bgcolormap[x][y]={r:238,g:238,b:180};
                    this.textcolormap[x][y]={r:10,g:107,b:111};




        

    },

     into(){
        this.map=[];
        this.nodeMap=[];
        this.bgcolormap=[];
        this.textcolormap=[];
        for(let i=0;i<=4;i++){
            this.map[i]=[];
            this.nodeMap[i]=[];
            this.bgcolormap[i]=[];
            this.textcolormap[i]=[];
            for(let j=0;j<=4;j++){
                this.map[i][j]=null;
                this.nodeMap[i][j]=null;
                this.bgcolormap[i][j]=null;
                this.textcolormap[i][j]=null;
            }
        }

        // this.bgcolormap[1][1]={r:180,g:185,b:238}

     },

     //
     gameStart(i,j,num){
        let x=(i-1)*145-217;
        let y=218-((j-1)*145);
        this.nodeMap[i][j]=this.createStar(x,y,num,238,238,180,10,107,111);

     },



          /**
     * 创建数字方块背景固定一个180，字体固定一个10
     * @param {number} x 
     * @param {number} y 
     * @param {number} num 
     */
           createStar(x,y,num,bg1,bg2,bg3,tc1,tc2,tc3){
            //判断对象池中是否为空
            let b=null;
            if(this.pond.size()>0){
                b=this.pond.get();
            }else{
                b=cc.instantiate(this.yout002Prefabs);
            }
            b.parent=this.lauout_bg;
            b.x=x;
            b.y=y;
            // b.getComponent(cc.Sprite).node._color= new cc.Color(bg1,bg2,bg3,255);
            b.getComponent('youPrefabs').updateBythahprefabs(bg1,bg2,bg3)
            
            // b.getComponent(cc.Sprite).node._children[0]._components[0]._string=num;
            b.getComponent('youPrefabs').updateBythahprefabsLable(num);

            // b.getComponent(cc.Sprite).node._children[0]._components[0].node._color= new cc.Color(tc1,tc2,tc3,255);
            b.getComponent('youPrefabs').updateBythahprefabstextcolro(tc1,tc2,tc3);
            // b.getComponent(cc.Sprite).node.opacity=0;


            b.getComponent('youPrefabs').pow(num);

            // b.getComponent('youPrefabs').textFongSize(40);
            return b;
        },

     /**
     * 
     * 实例化背景快
     */
      instantiateBybgblank(i,j){
        //判断对象池中是否为空
        let x=(i-1)*145-217;
        let y=218-((j-1)*145);
        let b=null;
        if(this.bgblankpool.size()>0){
            b=this.bgblankpool.get();
        }else{
            b=cc.instantiate(this.starlatPrefabs);
        }
        b.parent=this.lauout_bg;
        b.x=x;
        b.y=y;
        return b;
    },

    slideDirectionfun(direction){
            console.log(direction)
            if(direction==='bottom'){
                let downFlag=true;
                while(downFlag){
                    downFlag=false;
                        for(let i=1;i<5;i++){
                            for(let j=1;j<4;j++){
                                if(this.nodeMap[i][j]!==null && this.nodeMap[i][j+1]===null){
                                    this.nodeMap[i][j].runAction(cc.moveBy(0.2,0,-145));
                                    this.nodeMap[i][j+1]=this.nodeMap[i][j];
                                    this.map[i][j+1]=this.map[i][j];
                                    this.nodeMap[i][j]=null;
                                    this.map[i][j]=null;
                                    
                                    this.bgcolormap[i][j+1]=this.bgcolormap[i][j];
                                    this.bgcolormap[i][j]=null;

                                    this.textcolormap[i][j+1]=this.textcolormap[i][j];
                                    this.textcolormap[i][j]=null;
                                    downFlag=true;



                                }



                                if(i===4 && j===3 && !downFlag){
                                    this.equalisnotblank(direction);

                                }

                            }
                        }
            }
  
           
        }else if(direction==='tpo'){
            let downFlag=true;
            while(downFlag){
                downFlag=false;
                    for(let i=1;i<5;i++){
                        for(let j=2;j<5;j++){
                            if(this.nodeMap[i][j]!==null && this.nodeMap[i][j-1]===null){
                                this.nodeMap[i][j].runAction(cc.moveBy(0.2,0,145));
                                this.nodeMap[i][j-1]=this.nodeMap[i][j];
                                this.map[i][j-1]=this.map[i][j];
                                this.nodeMap[i][j]=null;
                                this.map[i][j]=null;
                                
                                this.bgcolormap[i][j-1]=this.bgcolormap[i][j];
                                this.bgcolormap[i][j]=null;

                                this.textcolormap[i][j-1]=this.textcolormap[i][j];
                                this.textcolormap[i][j]=null;
                               
                                downFlag=true;



                            }

                            if(i===4 && j===4 && !downFlag){
                                this.equalisnotblank(direction);
                            }
                        }
                    }
                }

        }else if(direction==='right'){
            let downFlag=true;
            while(downFlag){
                downFlag=false;
                    for(let i=1;i<4;i++){
                        for(let j=1;j<5;j++){
                            if(this.nodeMap[i][j]!==null && this.nodeMap[i+1][j]===null){
                                this.nodeMap[i][j].runAction(cc.moveBy(0.2,145,0));
                                this.nodeMap[i+1][j]=this.nodeMap[i][j];
                                this.map[i+1][j]=this.map[i][j];
                                this.nodeMap[i][j]=null;
                                this.map[i][j]=null;
                                
                                this.bgcolormap[i+1][j]=this.bgcolormap[i][j];
                                this.bgcolormap[i][j]=null;

                                this.textcolormap[i+1][j]=this.textcolormap[i][j];
                                this.textcolormap[i][j]=null;
                                downFlag=true;



                            }



                            if(i===3 && j===4 && !downFlag){
                                this.equalisnotblank(direction);

                            }

                        }
                    }
        }
        }else if(direction==='left'){
            let downFlag=true;
            while(downFlag){
                downFlag=false;
                    for(let i=2;i<5;i++){
                        for(let j=1;j<5;j++){
                            if(this.nodeMap[i][j]!==null && this.nodeMap[i-1][j]===null){
                                this.nodeMap[i][j].runAction(cc.moveBy(0.2,-145,0));
                                this.nodeMap[i-1][j]=this.nodeMap[i][j];
                                this.map[i-1][j]=this.map[i][j];

                                this.nodeMap[i][j]=null;
                                this.map[i][j]=null;
                                
                                this.bgcolormap[i-1][j]=this.bgcolormap[i][j];
                                this.bgcolormap[i][j]=null;

                                this.textcolormap[i-1][j]=this.textcolormap[i][j];
                                this.textcolormap[i][j]=null;
                                downFlag=true;



                            }



                            if(i===4 && j===4 && !downFlag){
                                this.equalisnotblank(direction);

                            }

                        }
                    }
        }
        }

},

//合并相同颜色的方块
equalisnotblank(dir){
    if(dir==='bottom'){
        let hec=true;
        while(hec){
            hec=false;
            for(let i=1;i<5;i++){
                for(let j=1;j<4;j++){
                    if(this.map[i][j]===this.map[i][j+1] && this.map[i][j]!==null && this.map[i][j+1]!==null){
                        let num=this.map[i][j];
                        this.map[i][j]=null;
                        if( this.nodeMap[i][j]!==null){
                        
                        this.nodeMap[i][j].opacity=0;
                        this.nodeMap[i][j].runAction(cc.scaleTo(0.2,0));
                        }
                        this.nodeMap[i][j]=null;

                        let num1=this.randNum(1,3);
                        let bg3=this.randNum(18,24)*10;
                        let bg2=this.randNum(18,24)*10;
                        let tx1=this.randNum(1,25)*10;
                        let tx2=this.randNum(1,25)*10;
                        let bg1=180;
                        let tx3=10;
                        let bglist=null;
                        let txlist=null;
                        if(num1===1){
                            bglist={r:bg1,g:bg2,b:bg3};
                            txlist={r:tx3,g:tx1,b:tx2};
                        }else if(num1===2){
                            bglist={r:bg2,g:bg1,b:bg3};
                            txlist={r:tx1,g:tx3,b:tx2};
                        }else if(num1===3){
                            bglist={r:bg2,g:bg3,b:bg1};
                            txlist={r:tx1,g:tx2,b:tx3};
                        }

                        
                        while(this.bgcolormap.flat().includes(bglist)){
                            bg3=this.randNum(1,25)*10;
                            bg2=this.randNum(1,25)*10;
                        }
                        while(this.textcolormap.flat().includes(txlist)){
                            tx1=this.randNum(1,25)*10;
                            tx2=this.randNum(1,25)*10;
                    }

                    for(let i=1;i<5;i++){
                            for(let j=1;j<5;j++){
                                if(this.map[i][j]===num*2 && num1===1){
                                    bg1=this.bgcolormap[i][j].r;
                                    bg2=this.bgcolormap[i][j].g;
                                    bg3=this.bgcolormap[i][j].b;

                                    tx3=this.textcolormap[i][j].r;
                                    tx1=this.textcolormap[i][j].g;
                                    tx2=this.textcolormap[i][j].b;
                                }else if(this.map[i][j]===num*2 && num1===2){
                                    bg1=this.bgcolormap[i][j].g;
                                    bg2=this.bgcolormap[i][j].r;
                                    bg3=this.bgcolormap[i][j].b;

                                    tx1=this.textcolormap[i][j].r;
                                    tx3=this.textcolormap[i][j].g;
                                    tx3=this.textcolormap[i][j].b;
                                }else if(this.map[i][j]===num*2 && num1===3){
                                    bg1=this.bgcolormap[i][j].b;
                                    bg2=this.bgcolormap[i][j].r;
                                    bg3=this.bgcolormap[i][j].g;

                                    tx1=this.textcolormap[i][j].r;
                                    tx2=this.textcolormap[i][j].g;
                                    tx3=this.textcolormap[i][j].b;
                                }
                            }
                        }
                        this.fenshu.string=Number(this.fenshu.string)+num;
                        if(num1===1 && this.nodeMap[i][j+1]!==null){


                                this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabs(bg1,bg2,bg3);
                                this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                                this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabstextcolro(tx3,tx1,tx2);
                                this.nodeMap[i][j+1].getComponent('youPrefabs').pow(num*2);
                                if(num*2>=16384 && num*2<=524288){
                                    this.nodeMap[i][j+1].getComponent('youPrefabs').textFongSize(40);
                                }else if(num*2>524288){
                                    this.nodeMap[i][j+1].getComponent('youPrefabs').textFongSize(20);
                                }
                                this.bgcolormap[i][j+1]={r:bg1,g:bg2,b:bg3};
                        this.textcolormap[i][j+1]={r:tx3,g:tx1,b:tx2};
                        this.map[i][j+1]=num*2;
                        }else if(num1===2 && this.nodeMap[i][j+1]!==null){

                            this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabs(bg2,bg1,bg3);
                            this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                            this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx3,tx2);
                            this.nodeMap[i][j+1].getComponent('youPrefabs').pow(num*2);
                            if(num*2>=16384 && num*2<=524288){
                                this.nodeMap[i][j+1].getComponent('youPrefabs').textFongSize(40);
                            }else if(num*2>524288){
                                this.nodeMap[i][j+1].getComponent('youPrefabs').textFongSize(20);
                            }
                            this.bgcolormap[i][j+1]={r:bg2,g:bg1,b:bg3};
                        this.textcolormap[i][j+1]={r:tx1,g:tx3,b:tx2};
                        this.map[i][j+1]=num*2;
                        }else if(num1===3 && this.nodeMap[i][j+1]!==null){
            

                            this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabs(bg2,bg3,bg1);
                            this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                            this.nodeMap[i][j+1].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx2,tx3);
                            this.nodeMap[i][j+1].getComponent('youPrefabs').pow(num*2);
                            if(num*2>=16384 && num*2<=524288){
                                this.nodeMap[i][j+1].getComponent('youPrefabs').textFongSize(40);
                            }else if(num*2>524288){
                                this.nodeMap[i][j+1].getComponent('youPrefabs').textFongSize(20);
                            }
                            this.bgcolormap[1][j+1]={r:bg2,g:bg3,b:bg1};
                            this.textcolormap[i][j+1]={r:tx1,g:tx2,b:tx3};
                            this.map[i][j+1]=num*2;
                        }

                        this.musicRoot.palysild();

                        hec=true;
                        break
                    
                    }
                }
            }
         }
        this.colorByRGB();
    }else if(dir==='tpo'){
        let hec=true;
        while(hec){
            hec=false;
            for(let i=1;i<5;i++){
                for(let j=1;j<5;j++){

                    if(this.map[i][j]===this.map[i][j-1] && this.map[i][j]!==null && this.map[i][j-1]!==null){
                        let num=this.map[i][j];
                        this.map[i][j]=null;
                        if( this.nodeMap[i][j]!==null){
                        
                        this.nodeMap[i][j].opacity=0;
                        this.nodeMap[i][j].runAction(cc.scaleTo(0.2,0));
                        }
                        this.nodeMap[i][j]=null;

                        let num1=this.randNum(1,3);
                        let bg3=this.randNum(18,24)*10;
                        let bg2=this.randNum(18,24)*10;
                        let tx1=this.randNum(1,25)*10;
                        let tx2=this.randNum(1,25)*10;
                        let bg1=180;
                        let tx3=10;
                        let bglist=null;
                        let txlist=null;
                        if(num1===1){
                            bglist={r:bg1,g:bg2,b:bg3};
                            txlist={r:tx3,g:tx1,b:tx2};
                        }else if(num1===2){
                            bglist={r:bg2,g:bg1,b:bg3};
                            txlist={r:tx1,g:tx3,b:tx2};
                        }else if(num1===3){
                            bglist={r:bg2,g:bg3,b:bg1};
                            txlist={r:tx1,g:tx2,b:tx3};
                        }

                        
                        while(this.bgcolormap.flat().includes(bglist)){
                            bg3=this.randNum(1,25)*10;
                            bg2=this.randNum(1,25)*10;
                        }
                        while(this.textcolormap.flat().includes(txlist)){
                            tx1=this.randNum(1,25)*10;
                            tx2=this.randNum(1,25)*10;
                    }

                    for(let i=1;i<5;i++){
                            for(let j=1;j<5;j++){
                                if(this.map[i][j]===num*2 && num1===1){
                                    bg1=this.bgcolormap[i][j].r;
                                    bg2=this.bgcolormap[i][j].g;
                                    bg3=this.bgcolormap[i][j].b;

                                    tx3=this.textcolormap[i][j].r;
                                    tx1=this.textcolormap[i][j].g;
                                    tx2=this.textcolormap[i][j].b;
                                }else if(this.map[i][j]===num*2 && num1===2){
                                    bg1=this.bgcolormap[i][j].g;
                                    bg2=this.bgcolormap[i][j].r;
                                    bg3=this.bgcolormap[i][j].b;

                                    tx1=this.textcolormap[i][j].r;
                                    tx3=this.textcolormap[i][j].g;
                                    tx3=this.textcolormap[i][j].b;
                                }else if(this.map[i][j]===num*2 && num1===3){
                                    bg1=this.bgcolormap[i][j].b;
                                    bg2=this.bgcolormap[i][j].r;
                                    bg3=this.bgcolormap[i][j].g;

                                    tx1=this.textcolormap[i][j].r;
                                    tx2=this.textcolormap[i][j].g;
                                    tx3=this.textcolormap[i][j].b;
                                }
                            }
                        }
                        this.fenshu.string=Number(this.fenshu.string)+num;
                        if(num1===1 && this.nodeMap[i][j-1]!==null){


                                this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabs(bg1,bg2,bg3);
                                this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                                this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabstextcolro(tx3,tx1,tx2);
                                this.nodeMap[i][j-1].getComponent('youPrefabs').pow(num*2);
                                if(num*2>=16384 && num*2<=524288){
                                    this.nodeMap[i][j-1].getComponent('youPrefabs').textFongSize(40);
                                }else if(num*2>524288){
                                    this.nodeMap[i][j-1].getComponent('youPrefabs').textFongSize(20);
                                }
                                this.bgcolormap[i][j-1]={r:bg1,g:bg2,b:bg3};
                        this.textcolormap[i][j-1]={r:tx3,g:tx1,b:tx2};
                        this.map[i][j-1]=num*2;
                        }else if(num1===2 && this.nodeMap[i][j-1]!==null){

                            this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabs(bg2,bg1,bg3);
                            this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                            this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx3,tx2);
                            this.nodeMap[i][j-1].getComponent('youPrefabs').pow(num*2);
                            if(num*2>=16384 && num*2<=524288){
                                this.nodeMap[i][j-1].getComponent('youPrefabs').textFongSize(40);
                            }else if(num*2>524288){
                                this.nodeMap[i][j-1].getComponent('youPrefabs').textFongSize(20);
                            }
                            this.bgcolormap[i][j-1]={r:bg2,g:bg1,b:bg3};
                        this.textcolormap[i][j-1]={r:tx1,g:tx3,b:tx2};
                        this.map[i][j-1]=num*2;
                        }else if(num1===3 && this.nodeMap[i][j-1]!==null){
            

                            this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabs(bg2,bg3,bg1);
                            this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                            this.nodeMap[i][j-1].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx2,tx3);
                            this.nodeMap[i][j-1].getComponent('youPrefabs').pow(num*2);
                            if(num*2>=16384 && num*2<=524288){
                                this.nodeMap[i][j-1].getComponent('youPrefabs').textFongSize(40);
                            }else if(num*2>524288){
                                this.nodeMap[i][j-1].getComponent('youPrefabs').textFongSize(20);
                            }
                            this.bgcolormap[1][i-1]={r:bg2,g:bg3,b:bg1};
                            this.textcolormap[i][j-1]={r:tx1,g:tx2,b:tx3};
                            this.map[i][j-1]=num*2;
                        }
                        this.musicRoot.palysild();

                        hec=true
                        ;
                        break
                    
                    }
                }
            }
        }

        this.colorByRGB();
        
    }else if(dir==='right'){
        let hec=true;
        while(hec){
            hec=false;
                for(let i=1;i<4;i++){
                    for(let j=1;j<5;j++){

                        if(this.map[i][j]===this.map[i+1][j] && this.map[i][j]!==null && this.map[i+1][j]!==null){
                            let num=this.map[i][j];
                            this.map[i][j]=null;
                            if( this.nodeMap[i][j]!==null){
                            
                            this.nodeMap[i][j].opacity=0;
                            this.nodeMap[i][j].runAction(cc.scaleTo(0.2,0));
                            }
                            this.nodeMap[i][j]=null;

                            let num1=this.randNum(1,3);
                            let bg3=this.randNum(18,24)*10;
                            let bg2=this.randNum(18,24)*10;
                            let tx1=this.randNum(1,25)*10;
                            let tx2=this.randNum(1,25)*10;
                            let bg1=180;
                            let tx3=10;
                            let bglist=null;
                            let txlist=null;
                            if(num1===1){
                                bglist={r:bg1,g:bg2,b:bg3};
                                txlist={r:tx3,g:tx1,b:tx2};
                            }else if(num1===2){
                                bglist={r:bg2,g:bg1,b:bg3};
                                txlist={r:tx1,g:tx3,b:tx2};
                            }else if(num1===3){
                                bglist={r:bg2,g:bg3,b:bg1};
                                txlist={r:tx1,g:tx2,b:tx3};
                            }

                            
                            while(this.bgcolormap.flat().includes(bglist)){
                                bg3=this.randNum(1,25)*10;
                                bg2=this.randNum(1,25)*10;
                            }
                            while(this.textcolormap.flat().includes(txlist)){
                                tx1=this.randNum(1,25)*10;
                                tx2=this.randNum(1,25)*10;
                        }

                        for(let i=1;i<5;i++){
                                for(let j=1;j<5;j++){
                                    if(this.map[i][j]===num*2 && num1===1){
                                        bg1=this.bgcolormap[i][j].r;
                                        bg2=this.bgcolormap[i][j].g;
                                        bg3=this.bgcolormap[i][j].b;

                                        tx3=this.textcolormap[i][j].r;
                                        tx1=this.textcolormap[i][j].g;
                                        tx2=this.textcolormap[i][j].b;
                                    }else if(this.map[i][j]===num*2 && num1===2){
                                        bg1=this.bgcolormap[i][j].g;
                                        bg2=this.bgcolormap[i][j].r;
                                        bg3=this.bgcolormap[i][j].b;

                                        tx1=this.textcolormap[i][j].r;
                                        tx3=this.textcolormap[i][j].g;
                                        tx3=this.textcolormap[i][j].b;
                                    }else if(this.map[i][j]===num*2 && num1===3){
                                        bg1=this.bgcolormap[i][j].b;
                                        bg2=this.bgcolormap[i][j].r;
                                        bg3=this.bgcolormap[i][j].g;

                                        tx1=this.textcolormap[i][j].r;
                                        tx2=this.textcolormap[i][j].g;
                                        tx3=this.textcolormap[i][j].b;
                                    }
                                }
                            }
                            this.fenshu.string=Number(this.fenshu.string)+num;
                            if(num1===1 && this.nodeMap[i+1][j]!==null){


                                    this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabs(bg1,bg2,bg3);
                                    this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                                    this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabstextcolro(tx3,tx1,tx2);
                                    this.nodeMap[i+1][j].getComponent('youPrefabs').pow(num*2);

                                    if(num*2>=16384 && num*2<=524288){
                                        this.nodeMap[i+1][j].getComponent('youPrefabs').textFongSize(40);
                                    }else if(num*2>524288){
                                        this.nodeMap[i+1][j].getComponent('youPrefabs').textFongSize(20);
                                    }

                            this.bgcolormap[i+1][j]={r:bg1,g:bg2,b:bg3};
                            this.textcolormap[i+1][j]={r:tx3,g:tx1,b:tx2};
                            this.map[i+1][j]=num*2;
                            }else if(num1===2 && this.nodeMap[i+1][j]!==null){

                                this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabs(bg2,bg1,bg3);
                                this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                                this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx3,tx2);
                                this.nodeMap[i+1][j].getComponent('youPrefabs').pow(num*2);

                                if(num*2>=16384 && num*2<=524288){
                                    this.nodeMap[i+1][j].getComponent('youPrefabs').textFongSize(40);
                                }else if(num*2>524288){
                                    this.nodeMap[i+1][j].getComponent('youPrefabs').textFongSize(20);
                                }

                                this.bgcolormap[i+1][j]={r:bg2,g:bg1,b:bg3};
                            this.textcolormap[i+1][j]={r:tx1,g:tx3,b:tx2};
                            this.map[i+1][j]=num*2;
                            }else if(num1===3 && this.nodeMap[i+1][j]!==null){
                

                                this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabs(bg2,bg3,bg1);
                                this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                                this.nodeMap[i+1][j].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx2,tx3);
                                this.nodeMap[i+1][j].getComponent('youPrefabs').pow(num*2);

                                if(num*2>=16384 && num*2<=524288){
                                    this.nodeMap[i+1][j].getComponent('youPrefabs').textFongSize(40);
                                }else if(num*2>524288){
                                    this.nodeMap[i+1][j].getComponent('youPrefabs').textFongSize(20);
                                }

                                this.bgcolormap[i+1][j]={r:bg2,g:bg3,b:bg1};
                                this.textcolormap[i+1][j]={r:tx1,g:tx2,b:tx3};
                                this.map[i+1][j]=num*2;
                            }

                            this.musicRoot.palysild();
                                hec=true;
                            break
                        
                        }
                    }
                }
            }
        this.colorByRGB();
    }else if(dir==="left"){
        let hec=true;
        while(hec){
            hec=false;
                for(let i=2;i<5;i++){
                    for(let j=1;j<5;j++){

                        if(this.map[i][j]===this.map[i-1][j] && this.map[i][j]!==null && this.map[i-1][j]!==null){
                            let num=this.map[i][j];
                            this.map[i][j]=null;
                            if( this.nodeMap[i][j]!==null){
                            
                            this.nodeMap[i][j].opacity=0;
                            this.nodeMap[i][j].runAction(cc.scaleTo(0.2,0));
                            }
                            this.nodeMap[i][j]=null;

                            let num1=this.randNum(1,3);
                            let bg3=this.randNum(18,24)*10;
                            let bg2=this.randNum(18,24)*10;
                            let tx1=this.randNum(1,25)*10;
                            let tx2=this.randNum(1,25)*10;
                            let bg1=180;
                            let tx3=10;
                            let bglist=null;
                            let txlist=null;
                            if(num1===1){
                                bglist={r:bg1,g:bg2,b:bg3};
                                txlist={r:tx3,g:tx1,b:tx2};
                            }else if(num1===2){
                                bglist={r:bg2,g:bg1,b:bg3};
                                txlist={r:tx1,g:tx3,b:tx2};
                            }else if(num1===3){
                                bglist={r:bg2,g:bg3,b:bg1};
                                txlist={r:tx1,g:tx2,b:tx3};
                            }

                            
                            while(this.bgcolormap.flat().includes(bglist)){
                                bg3=this.randNum(1,25)*10;
                                bg2=this.randNum(1,25)*10;
                            }
                            while(this.textcolormap.flat().includes(txlist)){
                                tx1=this.randNum(1,25)*10;
                                tx2=this.randNum(1,25)*10;
                        }

                        for(let i=1;i<5;i++){
                                for(let j=1;j<5;j++){
                                    if(this.map[i][j]===num*2 && num1===1){
                                        bg1=this.bgcolormap[i][j].r;
                                        bg2=this.bgcolormap[i][j].g;
                                        bg3=this.bgcolormap[i][j].b;

                                        tx3=this.textcolormap[i][j].r;
                                        tx1=this.textcolormap[i][j].g;
                                        tx2=this.textcolormap[i][j].b;
                                    }else if(this.map[i][j]===num*2 && num1===2){
                                        bg1=this.bgcolormap[i][j].g;
                                        bg2=this.bgcolormap[i][j].r;
                                        bg3=this.bgcolormap[i][j].b;

                                        tx1=this.textcolormap[i][j].r;
                                        tx3=this.textcolormap[i][j].g;
                                        tx3=this.textcolormap[i][j].b;
                                    }else if(this.map[i][j]===num*2 && num1===3){
                                        bg1=this.bgcolormap[i][j].b;
                                        bg2=this.bgcolormap[i][j].r;
                                        bg3=this.bgcolormap[i][j].g;

                                        tx1=this.textcolormap[i][j].r;
                                        tx2=this.textcolormap[i][j].g;
                                        tx3=this.textcolormap[i][j].b;
                                    }
                                }
                            }
                            this.fenshu.string=Number(this.fenshu.string)+num;
                            if(num1===1 && this.nodeMap[i-1][j]!==null){


                                    this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabs(bg1,bg2,bg3);
                                    this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                                    this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabstextcolro(tx3,tx1,tx2);
                                    this.nodeMap[i-1][j].getComponent('youPrefabs').pow(num*2);
                                    if(num*2>=16384 && num*2<=524288){
                                        this.nodeMap[i-1][j].getComponent('youPrefabs').textFongSize(40);
                                    }else if(num*2>524288){
                                        this.nodeMap[i-1][j].getComponent('youPrefabs').textFongSize(20);
                                    }
                            this.bgcolormap[i-1][j]={r:bg1,g:bg2,b:bg3};
                            this.textcolormap[i-1][j]={r:tx3,g:tx1,b:tx2};
                            this.map[i-1][j]=num*2;
                            }else if(num1===2 && this.nodeMap[i-1][j]!==null){

                                this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabs(bg2,bg1,bg3);
                                this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                                this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx3,tx2);
                                
                                if(num*2>=16384 && num*2<=524288){
                                    this.nodeMap[i-1][j].getComponent('youPrefabs').textFongSize(40);
                                }else if(num*2>524288){
                                    this.nodeMap[i-1][j].getComponent('youPrefabs').textFongSize(20);
                                }
                                
                                this.nodeMap[i-1][j].getComponent('youPrefabs').pow(num*2);
                                this.bgcolormap[i-1][j]={r:bg2,g:bg1,b:bg3};
                            this.textcolormap[i-1][j]={r:tx1,g:tx3,b:tx2};
                            this.map[i-1][j]=num*2;
                            }else if(num1===3 && this.nodeMap[i-1][j]!==null){
                

                                this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabs(bg2,bg3,bg1);
                                this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabsLable(num*2);
                                this.nodeMap[i-1][j].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx2,tx3);
                                this.nodeMap[i-1][j].getComponent('youPrefabs').pow(num*2);

                                if(num*2>=16384 && num*2<=524288){
                                    this.nodeMap[i-1][j].getComponent('youPrefabs').textFongSize(40);
                                }else if(num*2>524288){
                                    this.nodeMap[i-1][j].getComponent('youPrefabs').textFongSize(20);
                                }
                                this.bgcolormap[i-1][j]={r:bg2,g:bg3,b:bg1};
                                this.textcolormap[i-1][j]={r:tx1,g:tx2,b:tx3};
                                this.map[i-1][j]=num*2;
                            }
                            this.musicRoot.palysild();
                            hec=true;
                            break
                        
                        }
                    }
                }
            }
        this.colorByRGB();
    }

    for(let i=1;i<5;i++){
        for(let j=1;j<5;j++){

            if(this.map[i][j]>this.maxhec.string){
                this.maxhec.string=this.map[i][j];
                cc.sys.localStorage.setItem('maxhec',this.map[i][j]);
            }

        }
    }
},


//随机生成其他颜色的方块
colorByRGB(){
    let retvo=false;
    if(this.map[1][1]===null ||this.map[1][2]===null ||this.map[1][3]===null||this.map[1][4]===null
        ||this.map[2][1]===null||this.map[2][2]===null||this.map[2][3]===null||this.map[2][4]===null
        ||this.map[3][1]===null||this.map[3][2]===null||this.map[3][2]===null||this.map[3][4]===null
        ||this.map[4][1]===null||this.map[4][2]===null||this.map[4][3]===null||this.map[4][4]===null){
        // let nummap=1048576;
        let nummap=2;

        for(let i=1;i<5;i++){
            for(let j=1;j<5;j++){
                if(this.map[i][j]!==null){
                    nummap=this.map[i][j];
                    retvo=true;
                    break;
                }
            }
            if(retvo){
                break;
            }
        }
    let x=this.randNum(1,4);
    let y=this.randNum(1,4);
   while(this.map[x][y]!==null){
     x=this.randNum(1,4);
     y=this.randNum(1,4);
   }

   let bg1=180;
   let bg3=238;
   let bg2=238;
   let tx1=107;
   let tx2=111;
   let tx3=10;

  

   for(let i=1;i<5;i++){
    for(let j=1;j<5;j++){
        if(this.map[i][j]!==null){
            
            if(nummap>this.map[i][j]){

                nummap=this.map[i][j];
            }

           

            if(this.map[i][j]===nummap){
                bg1=this.bgcolormap[i][j].r;
                bg2=this.bgcolormap[i][j].g;
                bg3=this.bgcolormap[i][j].b;

                tx1=this.textcolormap[i][j].r;
                tx2=this.textcolormap[i][j].g;
                tx3=this.textcolormap[i][j].b;

            }


        }
      
       if(i===4 && j===4){

        console.log(nummap)
        
        if(nummap>=32){

            let number=this.randNum(1,2);
            if(number===1){
            nummap=nummap/8;
            }else{
                nummap=nummap/4;
            }

        }else{
           
            let number=this.randNum(1,2);
            if(number===1){

                nummap=nummap*2;
            }else{

                nummap=nummap;
                this.bgcolormap[x][y]={r:238,g:219,b:180};
                this.textcolormap[x][y]={r:10,g:10,b:111};
                bg1=238;
                bg2=219;
                bg3=180;

                tx1=10;
                tx2=10;
                tx3=111;
            }
        }
       }
    }
   }




   
         this.gameStart(x,y,nummap);
        this.map[x][y]= nummap;

        this.bgcolormap[x][y]={r:bg1,g:bg2,b:bg3};
        this.textcolormap[x][y]={r:tx1,g:tx2,b:tx3};

            this.nodeMap[x][y].getComponent('youPrefabs').updateBythahprefabs(bg1,bg2,bg3);
            this.nodeMap[x][y].getComponent('youPrefabs').updateBythahprefabsLable(nummap);
            this.nodeMap[x][y].getComponent('youPrefabs').updateBythahprefabstextcolro(tx1,tx2,tx3);
            this.nodeMap[x][y].getComponent('youPrefabs').pow(nummap);
            if(nummap>=16384 && nummap<=524288){
                this.nodeMap[x][y].getComponent('youPrefabs').textFongSize(40);
            }else if(nummap>524288){
                this.nodeMap[x][y].getComponent('youPrefabs').textFongSize(20);
            }
            if(Number(this.fenshu.string)>Number(this.maxfenshu.string)){
                this.maxfenshu.string=this.fenshu.string;
                cc.sys.localStorage.setItem('maxfenshu',this.fenshu.string);
            }

    }else{
        let over=false;
        for(let i=1;i<4;i++){
            for(let j=1;j<4;j++){
                if(this.map[i][j]===this.map[i][j+1] || this.map[i][j]===this.map[i+1][j]){
                    
                    over=true;
                    break;
                }else if(i===3 && j===3){

                    console.log("游戏结束1")





                    this.musicRoot.playOver();


                    this.overpage.opacity=133;
                    this.overtitle.active=true;
                    this.overtitle.position=cc.v2(0,0);  
                    this.overtitle.opacity=255;               
                    // this.button.node.on('click', this.onClickThingis, this);
                    // this.buttonnot.node.on('click', this.onClickThingnot, this);


                    let this_=this;

                    
                    //测试
                    this_.advertisement.active=true;
                    this_.advertisement.position=cc.v2(0,0); 
        
                    over=true;
                    break;
                }

            }

            if(over){
                break;
            }
        }



        // this.scheduleOnce(()=>{
        //     cc.director.loadScene('login');
        // })
    }

},

    onClickThingis(){
        this.scheduleOnce(()=>{
            cc.director.loadScene('mainByNumber');
        })
    },

    onClickThingnot(){
        this.scheduleOnce(()=>{
            cc.director.loadScene('login');
        })
    },


        /**
     * 随机数生成
     * @param {*} min 
     * @param {*} max 
     * @returns 
     */
 
         randNum(min,max){
            let value=min+(max-min+1)*Math.random();
            return Math.floor(value);
        },



     update (dt) {},
});
