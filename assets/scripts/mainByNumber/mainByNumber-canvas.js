
cc.Class({
    extends: cc.Component,

    properties: ()=>({
        mainByNumberRoot:require('mainByNumber-root'),
    }),

    start () {
        this.openTouch();
        this.ClickTime=new Date().getTime();
        this.ClickMinTime=100;
    },

        /**
     * 点击开始方法qq
     * @param {} e 
     */
         touchEnd(e){
        
            let nowTime=new Date().getTime();

            if(nowTime-this.ClickTime>this.ClickMinTime){

            let coordinate=this.node.convertToNodeSpaceAR(e.getStartLocation());

            // let coordinate=e.getStartLocation();
            let x=Math.floor((220+coordinate.x)/135)+1;
            let y=Math.floor((240-coordinate.y)/135)+1;

            if(x<1 || x>4 || y<1 || y>4){
                // console.log("不在范围内")
                return;
            }

            // 开始监听事件
             let direction=this.onTouchEnd(e);


            //交换点击的方块
            this.mainByNumberRoot.slideDirectionfun(direction);

            //检查是否有相同色彩的豆豆，然后放到select集合中 

             }
             this.ClickTime=nowTime;
            },


       /**
     * 打开点击
     */
        openTouch(){
            this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        },
    
         /**
         * 关闭点击
         */
          offTouch(){
            this.node.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        },

        onTouchEnd(event) {
            // 获取触摸开始和结束的位置
            let startPos = event.getStartLocation();
            let endPos = event.getLocation();
     
            // 计算位置差
            let dx = endPos.x - startPos.x;
            let dy = endPos.y - startPos.y;
     
            // 根据位置差判断方向
            if (Math.abs(dx) > Math.abs(dy)) {
                // 水平方向移动较多（左或右）
                if (dx > 0) {
                    // 右
                    // console.log('从左向右');
                    return 'right';
                } else {
                    // 左
                    // console.log('从右向左');
                    return 'left';
                }
            } else {
                // 垂直方向移动较多（上或下）
                if (dy > 0) {
                    // 下
                    // console.log('从下向上');
                    return 'tpo';
                } else {
                    // 上
                    // console.log('从上向下');
                    return 'bottom';
                }
            }
     
        },

        //返回首页
        tohome(){
            this.scheduleOnce(()=>{
                cc.director.loadScene('login');
            })
        },
    // update (dt) {},
});
