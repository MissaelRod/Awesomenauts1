game.PlayerEntity = me.Entity.extend({
init: function(x, y, settings) {
this.setSuper(x, y);
        this.setPlayerTimer();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.addAnimation();
        this.renderable.setCurrentAnimation("idle");
      },
      
        setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
        //height and width for player
        image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
        }]);
        },
        
        setPlayerTimer: function() {
        this.now = new Date().getTime();
                this.lastHit = this.now;
                this.lastAttack = new Date().getTime();
        },
        
        setAttributes: function() {
        this.health = game.data.playerHealth;
                this.body.setVelocity(game.data.playerMoveSpeed, 20);
                this.attack = game.data.playerAttack;
        },
        
        setFlags: function() {
        this.facing = "right";
                this.dead = false;
                this.attacking = false;
        },
        
        addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
                //animation for player walking
                this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
                //animation for players attack
                this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        },
        
        update: function(delta) {
        this.now = new Date().getTime();
                //updates my players health at all times

                this.dead = this.checkIfDead();
                this.checkKeyPressesAndMove();
                me.collision.check(this, true, this.collideHandler.bind(this), true);
                this.body.update(delta);
                this._super(me.Entity, "update", [delta]);
                return true;
        },
        
        checkIfDead: function() {
        if (this.health <= 0) {
        return true;
        }
        return false;
        },
        
        checkKeyPressesAndMove: function() {
        if (me.input.isKeyPressed("right")) {
        this.moveRight();
        } else if (me.input.isKeyPressed("left")) {
        //tells player to face left when moving left
        this.moveLeft();
        } else {
        this.body.vel.x = 0;
        }
        //lets me jump and to fall so player wont be stuck in the air
        if (me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
        this.jump();
        }
        this.attacking = me.input.isKeyPressed("attack");
        },
        
        moveRight: function() {
        //sets the position of my x by adding the velocity defined above in
        //setVelocity{} and multiplying it by me.timer.ticker
        this.body.vel.x += this.body.accel.x * me.timer.tick;
                this.facing = "right";
                this.flipX(true);
        },
        
        moveLeft: function() {
        this.facing = "left";
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
                this.flipX(false);
        },
        
        jump: function() {
        this.body.jumping = true;
         this.body.vel.y -= this.body.accel.y * me.timer.tick;
        },
        setAnimation: function() {
        //when a button is pressed the player will attack
        if (this.attacking) {
        if (!this.renderable.isCurrentAnimation("attack")) {
        //sets the animation to attack
        this.renderable.setCurrentAnimation("attack", "idle");
                this.renderable.setAnimationFrame();
        }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
        if (!this.renderable.isCurrentAnimation("walk")) {
        this.renderable.setCurrentAnimation("walk");
        }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
        this.renderable.setCurrentAnimation("idle");
        }
        },
        
        loseHealth: function(damage) {
        //allows player to lose health when hit
        this.health = this.health - damage;
                console.log(this.health);
        },
        
        collideHandler: function(response) {
        //collide handler for enemy base
        if (response.b.type === 'EnemyBaseEntity') {
            this.collideWithEnemyBase(response);
        }else if (response.b.type === 'EnemyCreep'){
            this.collideWithEnemyCreep(response);
        }
    },
    
        collideWithEnemyBase: function(response){
        
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        
        this.stopMovement(xdif);
        
        if(this.checkAttack(xdif, ydif)){
            this.hitCreep(response);
            };
          },
          
        collideWithEnemyCreep: function(response){
            var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        if (ydif < - 40 && xdif < 70 && xdif > - 35) {
           this.body.falling = false;
           this.body.vel.y = - 1;
        }
        else if (xdif > - 35 && this.facing === 'right' && (xdif < 0)) {
        this.body.vel.x = 0;
        this.pos.x = this.pos.x - 1;
        } else if (xdif < 70 && this.facing === 'left' && (xdif > 0)) {
        this.body.vel.x = 0;
        this.pos.x = this.pos.x + 1;
        }

       if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
         this.lastHit = this.now;
         response.b.health(game.data.playerAttack);
        }
      
    },
      
        stopMovement: function(xdif){
        if(xdif>0){
            if(this.facing==="left"){
                this.body.vel.x= 0;
            }
        }else{
            if(this.facing==="left"){
                this.body.vel.x= 0;
            }
        }
      },
      
        checkAttack: function(xdif, ydif){
              if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
             && (Math.abs(ydif) <=40) &&
             (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="left") || ((xdif<0) && this.facing==="right")
            )){
              this.lastHit = this.now;
              return true;
            }
            return false;
        },
        
        hitCreep: function(response){
             if(response.b.heath <= game.data.playerAttack){
                //adds 1 gold when a creep is killed
                game.data.gold += 1;
            }
                response.b.loseHealth(game.data.playerAttack);
        }
  });

