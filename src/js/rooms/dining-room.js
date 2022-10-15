

class DiningRoom extends Room {
  constructor(scene, x, y, width, depth, height) {
    super(scene, x, y, width, depth, height)

    this._addBricks(x + 2, .3, this.minY)
    this._addBricks(x - 2, .8, this.minY)

    this._addBricks(x + 1.6, .3, this.maxY)
    this._addBricks(x - 2.7, .1, this.maxY)

    this._addBricks(this.minX, 1.3, y - .2, true)
    this._addBricks(this.minX, .3, y + 3, true)
    this._addBricks(this.minX, .1, y - 3.6, true)

    this._addBricks(this.maxX, .8, y - 1.2, true)
    this._addBricks(this.maxX, .1, y - 2.9, true)

    this._addDoor(x, this.minY)

    this._addTable(x, y)
    this._addChair(x - 1, y + 1, Math.PI/2) // right
    this._addChair(x + 2, y + 1, 3*Math.PI/2) // left
    this._addChair(x, y - 1) // bottom
    this._addChair(x, y + 3, Math.PI) // top
  }

  _addBricks(xOffset, yOffset, zOffset, rotate) {
    const bricks = new THREE.Group()

    bricks.add(this._addBrick(0, 0 + yOffset, 0))
    bricks.add(this._addBrick(.6, 0 + yOffset, 0))
    bricks.add(this._addBrick(.9, 0 + yOffset, 0))

    bricks.add(this._addBrick(.15, -.1 + yOffset, 0))
    bricks.add(this._addBrick(.45, -.1 + yOffset, 0))
    bricks.add(this._addBrick(.75, -.1 + yOffset, 0))

    bricks.add(this._addBrick(0, -.2 + yOffset, 0))
    bricks.add(this._addBrick(.3, -.2 + yOffset, 0))
    bricks.add(this._addBrick(.6, -.2 + yOffset, 0))

    if (rotate)
      bricks.rotation.y += Math.PI/2

    bricks.position.x += xOffset
    bricks.position.z += zOffset

    this.scene.add(bricks)
  }

  _addTable(x, z) {
    const points = []
    points.push(new THREE.Vector2(0.05, -1.5))
    points.push(new THREE.Vector2(0.1, -1.4))
    points.push(new THREE.Vector2(0.1, -1.35))
    points.push(new THREE.Vector2(0.05, -1.3))
    points.push(new THREE.Vector2(0.15, -0.7))

    const legGeometry = new THREE.LatheGeometry(points)
    const leg1 = this._buildSolidShape(legGeometry, 0, 0)
    const leg2 = this._buildSolidShape(legGeometry, 1.2, 0)
    const leg3 = this._buildSolidShape(legGeometry, 1.2, 2.2)
    const leg4 = this._buildSolidShape(legGeometry, 0, 2.2)

    const tableGeometry1 = new THREE.BoxGeometry(1.6, 0.05, 2.6) // width, height, depth
    const tableGeometry2 = new THREE.BoxGeometry(1.8, 0.05, 2.8) // width, height, depth
    const cube1 = this._buildSolidShape(tableGeometry1, 0.6, 1.1)
    const cube2 = this._buildSolidShape(tableGeometry2, 0.6, 1.1)
    cube1.position.y = -0.675
    cube2.position.y = -0.625

    const group = new THREE.Group()
    group.add(cube1)
    group.add(cube2)
    group.add(leg1)
    group.add(leg2)
    group.add(leg3)
    group.add(leg4)

    group.position.x += x
    group.position.z += z

    this.scene.add(group)
  }

  _addChair(x, z, rotation=0) {
    const points = []
    points.push(new THREE.Vector2(0.025, -1.5))
    points.push(new THREE.Vector2(0.05, -1.45))
    points.push(new THREE.Vector2(0.05, -1.425))
    points.push(new THREE.Vector2(0.025, -1.375))
    points.push(new THREE.Vector2(0.075, -1.1))

    const legGeometry = new THREE.LatheGeometry(points)
    const leg1 = this._buildSolidShape(legGeometry, 0, 0)
    const leg2 = this._buildSolidShape(legGeometry, 0.3, 0)
    const leg3 = this._buildSolidShape(legGeometry, 0.3, 0.3)
    const leg4 = this._buildSolidShape(legGeometry, 0, 0.3)

    const chairseatGeometry1 = new THREE.BoxGeometry(0.45, 0.05, 0.45) // width, height, depth
    const cube1 = this._buildSolidShape(chairseatGeometry1, 0.15, 0.15)

    const backShape = new THREE.Shape()
    backShape.moveTo(0,0)
    backShape.lineTo(0.225,0)
    backShape.lineTo(0.225,0.3)
    backShape.quadraticCurveTo(0.075, 0.3, 0.075, 0.75)
    backShape.quadraticCurveTo(0.225, 0.75, 0.225, 0.8125)
    backShape.quadraticCurveTo(0.225, 0.875, 0.075, 0.875)
    backShape.quadraticCurveTo(0.075, 1, 0, 1)
    backShape.quadraticCurveTo(-0.075, 1, -0.075, 0.875)
    backShape.quadraticCurveTo(-0.225, 0.875, -0.225, 0.8125)
    backShape.quadraticCurveTo(-0.225, 0.75, -0.075, 0.75)
    backShape.quadraticCurveTo(-0.075, 0.3, -0.225, 0.3)
    backShape.lineTo(-0.225,0)
    backShape.autoClose = true

    const extrudeSettings = { amount: 0.05, steps: 1, bevelEnabled: false}
    const backGeometry = new THREE.ExtrudeGeometry(backShape, extrudeSettings)

    const back = this._buildSolidShape(backGeometry, 0.15, -0.07)


    back.position.y = -1.05
    cube1.position.y = -1.075
    const group = new THREE.Group()
    group.add(cube1)
    group.add(back)
    //group.add(cube2)
    group.add(leg1)
    group.add(leg2)
    group.add(leg3)
    group.add(leg4)

    group.rotation.y += rotation
    group.position.x += x
    group.position.z += z

    this.scene.add(group)
  }
}