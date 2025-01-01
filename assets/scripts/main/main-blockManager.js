
cc.Class({
    extends: cc.Component,

    properties: ()=>({
        blockPrefab:cc.Prefab,
        blockSpriteFrames:[cc.SpriteFrame],
        mainCanves:require('main-canvas'),
        musicRoot:require('main-music'),
       
    }),
     onLoad () {
        this.into();
        this.pool=new cc.NodePool();
        for(let i=0;i<30;i++){
            this.pool.put(cc.instantiate(this.blockPrefab))
        }
        this.count=0;
        this.hits=0;
     },

    start () {
        this.gameStart();
    },
    mapForCount(col,row,num){
        let dir=[[0,1],[1,0],[0,-1],[-1,0]];
        for(let k=0;k<4;k++){
            let i=col+dir[k][0];
            let j=row+dir[k][1];
            if(i<1 || i>5 || j<1 || j>5){
                continue;
            }
            if(this.map[i][j]===num && this.book[i][j]===0){
                this.book[i][j]=1;
                this.count+=1;
                this.mapForCount(i,j,num);
            }
        }
        
    },
    doActionForBook(col,row){
        this.mainCanves.updateScore(this.count,this.map[col][row]);
        for(let i=0;i<6;i++){
            for(let j=0;j<6;j++){
                if(i===col && j===row){
                    continue;
                }else if(this.book[i][j]===1){
                    this.mapNode[i][j].runAction(
                        cc.sequence(
                        cc.scaleTo(0.15,0),//缩小
                        cc.callFunc(()=>{//回调
                            this.pool.put(this.mapNode[i][j]);
                            this.map[i][j]=null;
                            this.mapNode[i][j]=null;
                        },this)
                        )
                    )
                }
            }
        }
        this.mapNode[col][row].runAction(
            cc.sequence(
                cc.scaleTo(0.15,1.2),
                cc.callFunc(()=>{
                    this.blockAddOne(col,row);
                },this),
                cc.scaleTo(0.15,1),
                cc.callFunc(()=>{
                    //方块下落,方块下落的方法
                    this.blockDown();
                 
                },this)
            )

           
        );
        //每次消除hp+1
    if(Number(this.mainCanves.hp)<5){
        this.mainCanves.hp+=1;
    }else{
        this.mainCanves.hp=5;
    }
        this.mainCanves.updateHpShow(this.mainCanves.hp);

        this.hits+=1;
        this.musicRoot.playCombo(this.hits);
       

    },

    blockDown(){
        let downFlag=true;
        while(downFlag){
            downFlag=false;
            for(let i=1;i<6;i++){
                for(let j=1;j<5;j++){
                    if(this.mapNode[i][j]!==null && this.mapNode[i][j+1]===null){
                        console.log('找到',i,j)
                        this.mapNode[i][j].runAction(cc.moveBy(0.1,0,-130));
                        this.mapNode[i][j+1]=this.mapNode[i][j];
                        this.map[i][j+1]=this.map[i][j];
                        this.mapNode[i][j]=null;
                        this.map[i][j]=null;
                        downFlag=true;
                    }
                }
            }
        }
        this.scheduleOnce(this.checkNullBlock,0.3);        
    },

    checkNullBlock(){
        let creakb=1;
        for(let k=1;k<6;k++){
            for(let l=1;l<5;l++){
                if(this.map[k][l]<this.map[k][l+1]){
                    creakb=this.map[k][l];
                }
            }
        }

                    for(let i=1;i<6;i++){
                        for(let j=1;j<6;j++){
                            if(this.mapNode[i][j]===null){
            
                                
            
                                let x=-260+(i-1)*130;
                                let y=260-(j-1)*130;
            
                                let num=this.randNum(creakb,Number(creakb+4));
            
                                this.map[i][j]=num;
            
                                if(this.map[i][j]===1){
                                    this.bgcolormap[i][j]={r:252,g:199,b:199};
                                    this.textcolormap[i][j]={r:177,g:39,b:39};
                                    this.mapNode[i][j]=this.createBlock(x,y,num,252,199,199,177,39,39);
                                }else if(this.map[i][j]===2){
                                    this.bgcolormap[i][j]={r:212,g:199,b:199};
                                    this.textcolormap[i][j]={r:39,g:39,b:177};
                                    this.mapNode[i][j]=this.createBlock(x,y,num,212,199,199,39,39,117);
                                }else if(this.map[i][j]===3){
                                    this.bgcolormap[i][j]={r:199,g:252,b:244};
                                    this.textcolormap[i][j]={r:39,g:160,b:117};
                                    this.mapNode[i][j]=this.createBlock(x,y,num,199,252,244,39,160,117);
                                }else if(this.map[i][j]===4){
                                    this.bgcolormap[i][j]={r:216,g:525,b:199};
                                    this.textcolormap[i][j]={r:61,g:117 ,b:39};
                                    this.mapNode[i][j]=this.createBlock(x,y,num,216,525,199,61,117,39);
                                }else if(this.map[i][j]===5){
                                    this.bgcolormap[i][j]={r:247,g:210,b:118};
                                    this.textcolormap[i][j]={r:117 ,g:115,b:39};
                                    this.mapNode[i][j]=this.createBlock(x,y,num,247,210,118,117,115,39);
                                }
                                // this.mapNode[i][j].scale=0;

                                if(this.mapNode[i][j]!=null){
                                    this.mapNode[i][j].runAction(cc.scaleTo(0.2,1));
                                    this.mapNode[i][j].scale=0;
                                }
                                
                            }
                        }
                    }

        this.scheduleOnce(this.checkCount,0.3);
    },

    checkCount(){
        let checkFlag=true;
        for(let i=1;i<6;i++){
            for(let j=1;j<6;j++){
                if(checkFlag===false)break;
                this.count=0;
                this.setZeroBook(),
                this.mapForCount(i,j,this.map[i][j]);
                if(this.count>=3){
                    this.doActionForBook(i,j);
                    // this.mainCanves.updateScore(this.count,this.map[i][j]);
                    checkFlag=false;
                }
            }
        }

        if(checkFlag===true){
            this.mainCanves.openTouch();
        }
       
    },
    blockAddOne(col,row){
        
        this.map[col][row]+=1;
        let num=this.map[col][row];

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


                   for(let i=1;i<6;i++){
                    for(let j=1;j<6;j++){
                        if(num===this.map[i][j]){
                            bg3=this.bgcolormap[i][j].b;
                            bg2=this.bgcolormap[i][j].g;
                            tx1=this.textcolormap[i][j].r;
                            tx2=this.textcolormap[i][j].g;
                            bg1=this.bgcolormap[i][j].r;
                            tx3=this.textcolormap[i][j].b;
                        }
                    }
                }

                   
                    

       
        this.mapNode[col][row].getComponent('b1prefab').updateBythahprefabs(bg1,bg2,bg3);
        this.mapNode[col][row].getComponent('b1prefab').updateBythahprefabsLable(num);
        this.mapNode[col][row].getComponent('b1prefab').updateBythahprefabstextcolro(tx1,tx2,tx3);

        this.bgcolormap[col][row]=bglist;
        this.textcolormap[col][row]=txlist;

        return true;
         
    },
    gameStart(){
        for(let i=1;i<6;i++){
            for(let j=1;j<6;j++){
                let x=-260+(i-1)*130;
                let y=260-(j-1)*130;
                let num=this.randNum(1,5);
                this.map[i][j]=num;

                while(this.map[i][j]===this.map[i-1][j] ||
                    this.map[i][j]===this.map[i][j+1] ||
                    this.map[i][j]===this.map[i+1][j] ||
                    this.map[i][j]===this.map[i][j-1]){
                        num=this.randNum(1,5);
                        this.map[i][j]=num;
                    }
                    if(this.map[i][j]===1){
                        this.bgcolormap[i][j]={r:252,g:199,b:199};
                        this.textcolormap[i][j]={r:177,g:39,b:39};
                        this.mapNode[i][j]=this.createBlock(x,y,num,252,199,199,177,39,39);
                    }else if(this.map[i][j]===2){
                        this.bgcolormap[i][j]={r:212,g:199,b:199};
                        this.textcolormap[i][j]={r:39,g:39,b:177};
                        this.mapNode[i][j]=this.createBlock(x,y,num,212,199,199,39,39,117);
                    }else if(this.map[i][j]===3){
                        this.bgcolormap[i][j]={r:199,g:252,b:244};
                        this.textcolormap[i][j]={r:39,g:160,b:117};
                        this.mapNode[i][j]=this.createBlock(x,y,num,199,252,244,39,160,117);
                    }else if(this.map[i][j]===4){
                        this.bgcolormap[i][j]={r:216,g:525,b:199};
                        this.textcolormap[i][j]={r:61,g:117 ,b:39};
                        this.mapNode[i][j]=this.createBlock(x,y,num,216,525,199,61,117,39);
                    }else if(this.map[i][j]===5){
                        this.bgcolormap[i][j]={r:247,g:210,b:118};
                        this.textcolormap[i][j]={r:117 ,g:115,b:39};
                        this.mapNode[i][j]=this.createBlock(x,y,num,247,210,118,117,115,39);
                    }
               
            }
        }
    },

    createBlock(x,y,num,bg1,bg2,bg3,tc1,tc2,tc3){
        let b=null;
        //获取前判断对象池里是否为空
        if(this.pool.size()>0){
            b=this.pool.get();
        } else {
            b=cc.instantiate(this.blockPrefab);
        }
        b.parent=this.node;
        b.x=x;
        b.y=y;
        // b.getComponent(cc.Sprite).spriteFrame=this.blockSpriteFrames[num];
        b.getComponent('b1prefab').updateBythahprefabs(bg1,bg2,bg3);
        b.getComponent('b1prefab').updateBythahprefabsLable(num);
        b.getComponent('b1prefab').updateBythahprefabstextcolro(tc1,tc2,tc3);
        return b;
    },

    into(){
        this.map=[];
        this.mapNode=[];
        this.book=[];
        this.bgcolormap=[];
        this.textcolormap=[];
        //创建二维数组
        for(let i=0;i<7;i++){
            this.map[i]=[];
            this.mapNode[i]=[];
            this.book[i]=[];
            this.bgcolormap[i]=[];
            this.textcolormap[i]=[];
            for(let j=0;j<7;j++){
                this.map[i][j]=null;
                this.mapNode[i][j]=null;
                this.book[i][j]=0;
                this.bgcolormap[i][j]=null;
                this.textcolormap[i][j]=null;
            }
        }
        

    },

    setZeroBook(){
        for(let i=0;i<7;i++){
            for(let j=0;j<7;j++){
                this.book[i][j]=0;
            }
        }
    },

    randNum(min,max){
        let value=min+(max-min+1)*Math.random();
        return Math.floor(value);
    }

    // update (dt) {},
});
