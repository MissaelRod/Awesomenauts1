game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("load-Screen")), -10); // TODO
        //when im in the load profile screen these keys are no longer being used for skills 
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.A);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                //font and color for the text
                this.font = new me.Font("Arial", 25, "white");
            },
            draw: function(renderer) {
                //adds text to the load profile screen
                this.font.draw(renderer.getContext(), "ENRER YOUR USERNAME AND PASSWORD", this.pos.x, this.pos.y);
            }
        })));
       
   },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        
    }
});




