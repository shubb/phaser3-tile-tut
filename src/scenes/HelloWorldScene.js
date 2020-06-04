import Phaser from 'phaser'

const MARIO_TILES_KEY = 'mario-tiles'
const CATASTROPHI_TILES_KEY = 'catastrophi-tiles'
const CATASTROPHI_MAP_KEY = 'catastrophi-tiles'

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
        super('hello-world')
        this.map = undefined
        this.camera_controls = undefined
	}

	preload()
    {
        this.load.image(MARIO_TILES_KEY, 'assets/tilesets/super-mario-tiles.png')
        this.load.image(CATASTROPHI_TILES_KEY, 'assets/tilesets/catastrophi_tiles_16_blue.png')
        this.load.tilemapCSV(CATASTROPHI_MAP_KEY, 'assets/tilemaps/catastrophi_level3.csv')
        
    }

    create()
    {
        this.map = this.createMap()
        this.camera_controls = this.createCamera()
    }

    createMap()
    {
        // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ key: CATASTROPHI_MAP_KEY, tileWidth: 16, tileHeight: 16})
        const tiles = map.addTilesetImage(CATASTROPHI_TILES_KEY)
        const layer = map.createStaticLayer(0, tiles, 0, 0)
        return map
    }

    createCamera()
    {
        const camera = this.cameras.main
        const cursors = this.input.keyboard.createCursorKeys()
        camera.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)

        const controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: camera,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        })

        return controls
    }

    update(time, delta)
    {
        this.camera_controls.update(delta)
    }

}
