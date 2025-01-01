
cc.Class({
    extends: cc.Component,

    properties:()=>({
        thatByprefabs:cc.Node,
        thatByvale:cc.Label,
        thatByvalenode:cc.Node,

        powmi:cc.Label,
    }),

    // onLoad () {},

    start () {
        

    },


    /**
     * 改变预制体的颜色方法
     */

    updateBythahprefabs(bg1,bg2,bg3){
        this.thatByprefabs.color=new cc.Color(bg1,bg2,bg3,255);
    },


    /**
     * 改变预制体数字
     */
    updateBythahprefabsLable(value){
        this.thatByvale.string=value;
    },

    /**
     * 改变字体颜色
     */
    updateBythahprefabstextcolro(tx1,tx2,tx3){
        this.thatByvalenode.color=new cc.Color(tx1,tx2,tx3,255);
    },

    /**
     * 改变字体大小
     * 
     */

    textFongSize(num){
        this.thatByvale.fontSize=num;
    },

    pow(num){
       
        this.powmi.string='2^('+Math.log2(num)+')';
        
    }


    // update (dt) {},
});
