class Game {
  constructor(width, height) {
    this.counter = 1

    this.width = width
    this.height = height

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
    this.camera.position.y = -.5
    this.camera.rotation.y += Math.PI

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(width, height)
    document.body.appendChild(this.renderer.domElement)

    // define room
    this.camera.position.x = 0
    this.camera.position.z = 0

    const entranceHall = new EntranceHall(this.scene, 0, 0, 10, 10, 3)
    const diningRoom = new DiningRoom(this.scene, 0, 10, 10, 10, 3)
    const armoury = new Armoury(this.scene, 10, 0, 10, 10, 3)
    const library = new Library(this.scene, 10, 10, 10, 10, 3)
    this.rooms = [entranceHall, diningRoom, armoury, library]
    this.room = entranceHall

    // subscribe to input events
    const self = this
    document.onkeydown = e => self._handleInput(self, e)
  }

  gameLoop(refreshRateMs = 50) {
    setInterval(() => {
      this._render()
    }, refreshRateMs)
  }

  _render() {
    this.renderer.render(this.scene, this.camera)
  }

  _getPosVector(d, theta) {
    const hyp = d
    const opp = hyp * Math.sin(theta)
    const adj = hyp * Math.cos(theta)
    return new THREE.Vector2(opp, adj)
  }

  _handleInput(sender, e) {
    const theta = sender.camera.rotation.y - Math.PI
    const pos = sender._getPosVector(.1, theta)

    switch(e.keyCode) {
      case 38: { // up
        const deltaX = sender.camera.position.x + pos.x
        const deltaY = sender.camera.position.z + pos.y

        if (sender.room.hitsWall(deltaX, deltaY))
          return

        for (let i = 0; i < this.rooms.length; i++) {
          const room = this.rooms[i]
          if (room.inRoom(deltaX, deltaY)) {
            this.room = room
            break
          }
        }

        sender.camera.position.x += pos.x
        sender.camera.position.z += pos.y
        break
      }
      case 40: { // down
        const deltaX = sender.camera.position.x - pos.x
        const deltaY = sender.camera.position.z - pos.y

        if (sender.room.hitsWall(deltaX, deltaY))
          return

        for (let i = 0; i < this.rooms.length; i++) {
          const room = this.rooms[i]
          if (room.inRoom(deltaX, deltaY)) {
            this.room = room
            break
          }
        }

        sender.camera.position.x -= pos.x
        sender.camera.position.z -= pos.y
        break
      }
      case 37: // left
        sender.camera.rotation.y += .1
        break
      case 39: // right
        sender.camera.rotation.y -= .1
        break
    }
  }
}