class Game{
    constructor(){
        this.name = createInput("Name:");
        this.submit = createButton("Submit");
        this.end = createButton("Restart");
        this.name.position(displayWidth/2,displayHeight/2-150);
        // this.end.position(displayWidth/2+150,displayHeight/2+150);
        this.submit.position(displayWidth/2+100,displayHeight/2+150);
        this.end.mousePressed(()=>{
            gameState = 1;
        })
        
    }

    serve(){
        if(gameState === 0){
            player.sprite.velocityX = 0;
            this.end.hide();
            
            playerImage1.visible = true;
            playerImage2.visible = true;
            player.sprite.visible = false;
            invisibleGround.visible = false;
            text("Choose Your Player",playerImage1.x,playerImage1.y-500)

            if(mousePressedOver(playerImage1)){
                player.sprite.addImage("boyRunning",boyRunning);
                player.playerCharacter = "Shekolot";
                playerImage2.destroy();
            }

            if(mousePressedOver(playerImage2)){
                player.sprite.addImage("girlRunning",girlRunning);
                player.playerCharacter = "Kooki";
                playerImage1.destroy();
            }
           
            this.submit.mousePressed(()=>{
                gameState = 1;
                // playerImage1.hide();
                // playerImage2.hide();
                player.sprite.velocityX = 5;
                player.playerName = this.name.value();
                


                
            })
        }
    }

    restart(){
        this.end.mousePressed(()=>{
            gameState = 1;
        })
    }

    
}