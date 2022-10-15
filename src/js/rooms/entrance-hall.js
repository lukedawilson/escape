class EntranceHall extends Room {
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

    this._addDoor(x, this.maxY)
    this._addDoor(this.maxX, y, true)

    this._addArmour(x - 1.5, this.maxY - .3)
    this._addArmour(x + 1.5, this.maxY - .3)
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

  _addArmour(x, z) {
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.2) // width, height, depth
    const body = this._buildSolidShape(bodyGeometry, x, z)
    body.position.y += 0.2

    const points = []
    points.push( new THREE.Vector2( 0.16, 0 ))
    points.push( new THREE.Vector2( 0.15, 0.03 ))
    points.push( new THREE.Vector2( 0.1, 0.065 ))
    points.push( new THREE.Vector2( 0.05, 0.075 ))
    points.push( new THREE.Vector2( 0, 0.08 ))

    const shoulderGeometry = new THREE.LatheGeometry( points)
    const leftShoulder = this._buildSolidShape(shoulderGeometry, 0, 0)
    leftShoulder.rotation.z -= 1 * Math.PI / 8
    leftShoulder.rotation.y += 2 * Math.PI / 8
    leftShoulder.position.y += 0.4
    leftShoulder.position.x = x + 0.2
    leftShoulder.position.z = z

    const rightShoulder = this._buildSolidShape(shoulderGeometry, 0, 0)
    rightShoulder.rotation.z += 1 * Math.PI / 8
    rightShoulder.rotation.y -= 2 * Math.PI / 8
    rightShoulder.position.y += 0.4
    rightShoulder.position.x = x - 0.2
    rightShoulder.position.z = z

    const points3 = []
    points3.push( new THREE.Vector2( 0.06, 0.4 ))
    points3.push( new THREE.Vector2( 0.06, 0.45 ))
    points3.push( new THREE.Vector2( 0.1, 0.5 ))
    points3.push( new THREE.Vector2( 0.12, 0.65 ))
    points3.push( new THREE.Vector2( 0.14, 0.65 ))
    points3.push( new THREE.Vector2( 0.11, 0.75 ))
    points3.push( new THREE.Vector2( 0.06, 0.8 ))

    const headGeometry = new THREE.LatheGeometry( points3)
    const head = this._buildSolidShape(headGeometry, x, z)

    const points2 = []
    points2.push( new THREE.Vector2( 0.06, 0 ))
    points2.push( new THREE.Vector2( 0.05, 0.22 ))
    points2.push( new THREE.Vector2( 0.07, 0.25 ))
    points2.push( new THREE.Vector2( 0.08, 0.28 ))
    points2.push( new THREE.Vector2( 0.07, 0.31 ))
    points2.push( new THREE.Vector2( 0.03, 0.34 ))
    points2.push( new THREE.Vector2( 0, 0.34 ))

    const upperarmGeometry = new THREE.LatheGeometry( points2)
    const leftupperarm = this._buildSolidShape(upperarmGeometry, 0, 0)
    const rightupperarm = this._buildSolidShape(upperarmGeometry, 0, 0)
    leftupperarm.rotation.z -= 6 * Math.PI / 8
    leftupperarm.rotation.y += 2 * Math.PI / 8
    leftupperarm.position.x = x + 0.2
    leftupperarm.position.y = 0.37
    leftupperarm.position.z = z

    rightupperarm.rotation.z += 6 * Math.PI / 8
    rightupperarm.rotation.y -= 2 * Math.PI / 8
    rightupperarm.position.x = x - 0.2
    rightupperarm.position.y = 0.37
    rightupperarm.position.z = z

    const points4 = []
    points4.push( new THREE.Vector2( 0.05, 0 ))
    points4.push( new THREE.Vector2( 0.02, 0.18 ))
    points4.push( new THREE.Vector2( 0.04, 0.20 ))
    points4.push( new THREE.Vector2( 0.05, 0.22 ))
    points4.push( new THREE.Vector2( 0.04, 0.24 ))
    points4.push( new THREE.Vector2( 0, 0.26 ))

    const lowerarmGeometry = new THREE.LatheGeometry( points4)
    const leftlowerarm = this._buildSolidShape(lowerarmGeometry, 0, 0)
    const rightlowerarm = this._buildSolidShape(lowerarmGeometry, 0, 0)
    leftlowerarm.rotation.z -= 7 * Math.PI / 8
    leftlowerarm.rotation.y += 2 * Math.PI / 8
    leftlowerarm.position.x = x + 0.35
    leftlowerarm.position.y = 0.15
    leftlowerarm.position.z = z - 0.15

    rightlowerarm.rotation.z += 4 * Math.PI / 8
    rightlowerarm.rotation.y -= 4 * Math.PI / 8
    rightlowerarm.position.x = x - 0.35
    rightlowerarm.position.y = 0.15
    rightlowerarm.position.z = z - 0.15

    const dpShape = new THREE.Shape()
    dpShape.moveTo(0,0)
    dpShape.lineTo(0.16,0)
    dpShape.quadraticCurveTo(0.3, -0.15, 0.13, -0.2)
    dpShape.lineTo(0.08,-0.2)
    dpShape.quadraticCurveTo(0.08, -0.09, 0, -0.09)
    dpShape.quadraticCurveTo(-0.08, -0.09, -0.08, -0.2)
    dpShape.lineTo(-0.15,-0.2)
    dpShape.quadraticCurveTo(-0.35, -0.13, -0.16, 0)
    dpShape.autoClose = true

    const extrudeSettings = {
      steps: 2,
      amount: 0,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.05,
      bevelSegments: 2
    }
    const dpGeometry = new THREE.ExtrudeGeometry( dpShape, extrudeSettings )

    const dp = this._buildSolidShape(dpGeometry, 0, 0)
    dp.rotation.x += 1 * Math.PI / 16
    dp.position.x = x
    dp.position.z = z - 0.1

    const dp2 = this._buildSolidShape(dpGeometry, 0, 0)
    dp2.rotation.x -= 1 * Math.PI / 8
    dp2.position.x = x
    dp2.position.z = z + 0.1

    const spShape = new THREE.Shape()
    spShape.moveTo(0,0)
    spShape.lineTo(0.12,0)
    spShape.lineTo(0.15,-0.15)
    spShape.quadraticCurveTo(0, -0.25, -0.15, -0.15)
    spShape.lineTo(-0.12,0)
    spShape.autoClose = true

    const spGeometry = new THREE.ExtrudeGeometry( spShape, extrudeSettings )

    const axis = new THREE.Vector3(0, 0.71, -0.71)
    const sp = this._buildSolidShape(spGeometry, 0, 0)
    sp.rotation.x += 2 * Math.PI / 8
    sp.rotateOnAxis(axis, 4 * Math.PI / 8)
    sp.position.x = x - 0.23
    sp.position.z = z

    const sp2 = this._buildSolidShape(spGeometry, 0, 0)
    sp2.rotation.x += 2 * Math.PI / 8
    sp2.rotateOnAxis(axis, -4 * Math.PI / 8)
    sp2.position.x = x + 0.23
    sp2.position.z = z

    const points5 = []
    points5.push( new THREE.Vector2( 0, 0 ))
    points5.push( new THREE.Vector2( 0.09, 0 ))
    points5.push( new THREE.Vector2( 0.07, -0.35 ))
    points5.push( new THREE.Vector2( 0.085, -0.375 ))
    points5.push( new THREE.Vector2( 0.09, -0.4 ))
    points5.push( new THREE.Vector2( 0.085, -0.425 ))
    points5.push( new THREE.Vector2( 0.07, -0.45 ))
    points5.push( new THREE.Vector2( 0.04, -0.7))
    points5.push( new THREE.Vector2( 0.05, -0.8 ))
    points5.push( new THREE.Vector2( 0, -0.8 ))

    const legGeometry = new THREE.LatheGeometry( points5)
    const leftleg = this._buildSolidShape(legGeometry, x-0.1, z)
    const rightleg = this._buildSolidShape(legGeometry, x+0.1, z)

    const footGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.2) // width, height, depth
    const leftfoot = this._buildSolidShape(footGeometry, x-0.1, z-0.05)
    leftfoot.position.y -= 0.775
    const rightfoot = this._buildSolidShape(footGeometry, x+0.1, z-0.05)
    rightfoot.position.y -= 0.775

    const handleShape = new THREE.Shape()
    handleShape.moveTo(0,0)
    handleShape.quadraticCurveTo(-0.05, 0, -0.05, -0.05)
    handleShape.quadraticCurveTo(-0.05, -0.1, -0.02, -0.1)
    handleShape.lineTo(-0.01,-0.29)
    handleShape.quadraticCurveTo(-0.28, -0.29, -0.28, -0.27)
    handleShape.lineTo(-0.3,-0.3)
    handleShape.lineTo(-0.28,-0.32)
    handleShape.quadraticCurveTo(0, -0.3, 0.28, -0.32)
    handleShape.lineTo(0.3,-0.3)
    handleShape.lineTo(0.28,-0.28)
    handleShape.quadraticCurveTo(0.28, -0.29, 0.01, -0.29)
    handleShape.lineTo(0.02,-0.1)
    handleShape.quadraticCurveTo(0.05, -0.1, 0.05, -0.05)
    handleShape.quadraticCurveTo(0.05, 0, 0, 0)
    handleShape.autoClose = true

    const extrudeSettings2 = {
      steps: 2,
      amount: 0.01,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 1
    }
    const handleGeometry = new THREE.ExtrudeGeometry( handleShape, extrudeSettings2 )

    const handle = this._buildSolidShape(handleGeometry, 0, 0)
    //dp.rotation.x += 1 * Math.PI / 16
    handle.position.x = x - 0.35
    handle.position.z = z - 0.36
    handle.position.y += 0.35

    const bladeShape = new THREE.Shape()
    bladeShape.moveTo(-0.03,0)
    bladeShape.quadraticCurveTo(0, -0.18, -0.05, -0.18)
    bladeShape.quadraticCurveTo(-0.01, -0.18, -0.01, -0.5)
    bladeShape.quadraticCurveTo(-0.01, -0.85, 0, -0.85)
    bladeShape.quadraticCurveTo(0.01, -0.85, 0.01, -0.5)
    bladeShape.quadraticCurveTo(0.01, -0.18, 0.05, -0.18)
    bladeShape.quadraticCurveTo(0, -0.18, 0.03, 0)
    bladeShape.autoClose = true

    const extrudeSettings3 = {
      steps: 2,
      amount: 0,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.03,
      bevelSegments: 1
    }

    const bladeGeometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings3 )

    const blade = this._buildSolidShape(bladeGeometry, 0, 0)
    //dp.rotation.x += 1 * Math.PI / 16
    blade.position.y += 0.05
    blade.position.x = x - 0.35
    blade.position.z = z - 0.36

    const group = new THREE.Group()
    group.add( body )
    group.add( leftShoulder )
    group.add( rightShoulder )
    group.add( head )
    group.add( leftupperarm )
    group.add( rightupperarm )
    group.add( leftlowerarm )
    group.add( rightlowerarm )
    group.add( dp )
    group.add( dp2 )
    group.add( sp )
    group.add( sp2 )
    group.add( leftleg )
    group.add( rightleg )
    group.add( leftfoot )
    group.add( rightfoot )
    group.add( handle )
    group.add( blade )

    group.position.y -= 0.7

    this.scene.add(group)
  }
}
