game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                //height and width for enemyBase
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        this.broken = false;
        this.heath = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        this.type = "PlayerBase";
        //animation for when the base is broken
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
        if (this.heath <= 0) {
            this.broken = true;
            game.data.win = false;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        //updates the bases health
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    loseHealth: function(damage) {
        this.health = this.health = damage;
    },
    onCollision: function() {

    }

});

