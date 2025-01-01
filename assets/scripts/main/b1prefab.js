
cc.Class({
    extends: cc.Component,

    properties:()=>({
        thatByprefabs:cc.Node,
        thatByvale:cc.Label,
        thatByvalenode:cc.Node,
    }),
    start () {
    },
    updateBythahprefabs(bg1,bg2,bg3){
        this.thatByprefabs.color=new cc.Color(bg1,bg2,bg3,255);
    },
    updateBythahprefabsLable(value){
        this.thatByvale.string=value;
    },
    updateBythahprefabstextcolro(tx1,tx2,tx3){
        this.thatByvalenode.color=new cc.Color(tx1,tx2,tx3,255);
    }
});
