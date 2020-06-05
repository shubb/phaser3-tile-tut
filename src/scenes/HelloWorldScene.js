

import Phaser from 'phaser'

const tuxmon_TILES_KEY = 'tiles'
const tuxmonI_MAP_KEY = 'map'
const misa_ATLAS_KEY = 'atlas'

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
        super('hello-world')
        this.map = undefined
        this.worldlayer = undefined
        this.camera_controls = undefined
        this.cursors = undefined
	}

	preload()
    {
        this.load.image(tuxmon_TILES_KEY, 'assets/tilesets/tuxmon-sample-32px-extruded.png')
        this.load.tilemapTiledJSON(tuxmonI_MAP_KEY, 'assets/tilemaps/tuxemon-town.json')   
        this.load.atlas(misa_ATLAS_KEY, 'assets/atlas/atlas.png', 'assets/atlas/atlas.json')
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();

        // This only works if wrapped in brackets so js knows it' a coe block, and with a colon before it
        ([this.map, this.worldlayer] = this.createMap())

        this.camera_controls = this.createCamera()
        this.player = this.createPlayer()

        this.physics.add.collider(this.player, this.worldlayer);
    }

    createMap()
    {
        // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ key: tuxmonI_MAP_KEY });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", tuxmon_TILES_KEY);
      
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });


        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        return [map, worldLayer]
    }

    createCamera()
    {
        const camera = this.cameras.main
        camera.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)

        const controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: camera,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5
        })

        return controls
    }

    createPlayer()
    {
        const player = this.physics.add.sprite(400, 350, misa_ATLAS_KEY, "misa-front");
        return player
    }



    update(time, delta)
    {
        /*this.camera_controls.update(delta)*/
        
        this.player.setVelocity(0)

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-100)
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(100)
        }

        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-100)
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(100)
        }



    }

}
