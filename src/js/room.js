class Room {
  constructor(scene, x, y, width, depth, height) {
    this.WIREFRAME_COLOUR = 0x808080

    const geometry = new THREE.BoxGeometry(width, height, depth)
    const cube = this._buildSolidShape(geometry, x, y)
    scene.add(cube)

    this.scene = scene
    this.shape = cube
    this.width = width
    this.height = height
    this.depth = depth

    this.x = x
    this.y = y

    this.maxX = x + width/2
    this.minX = x - width/2
    this.maxY = y + depth/2
    this.minY = y - depth/2

    this.doors = []
  }

  hitsWall(deltaX, deltaY) {
    for (const i = 0; i < this.doors.length; i++) {
      const v = this.doors[i]

      if (deltaY >= v.y - 1 && deltaY <= v.y + 1 && deltaX >= this.x - .65 && deltaX <= this.x + .65)
        return false

      if (deltaX >= v.x - 1 && deltaX <= v.x + 1 && deltaY >= this.y - .65 && deltaY <= this.y + .65)
        return false
    }

    return deltaX >= this.maxX - 1 ||
           deltaX <= this.minX + 1 ||
           deltaY >= this.maxY - 1||
           deltaY <= this.minY + 1
  }

  inRoom(x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY
  }

  _addBrick(x, y, z) {
    const geometry = new THREE.BoxGeometry(.3, .1, 0)
    const brick = this._buildShape(geometry, x, z, y)
    return brick
  }

  _addDoor(x, z, rotate) {
    const doorFrame = new THREE.Group()

    // outer
    const curve = new THREE.EllipseCurve(0, 0 /*ax, ay*/, .75, .75 /* xRadius, yRadius */, 0, Math.PI /* aStartAngle, aEndAngle */, false)
    const points = curve.getSpacedPoints( 20 )
    const path = new THREE.Path()
    const geometry = path.createGeometry( points )
    const material = new THREE.LineBasicMaterial( { color : this.WIREFRAME_COLOUR } )
    const outer = new THREE.Line( geometry, material )
    doorFrame.add(outer)

    const lg1 = new THREE.Geometry()
    lg1.vertices.push(new THREE.Vector3(.75, -1.5, 0), new THREE.Vector3(.75, 0, 0))
    const l1 = new THREE.Line(lg1, material)
    doorFrame.add(l1)

    const lg2 = new THREE.Geometry()
    lg2.vertices.push(new THREE.Vector3(-.75, -1.5, 0), new THREE.Vector3(-.75, 0, 0))
    const l2 = new THREE.Line(lg2, material)
    doorFrame.add(l2)

    // inner
    curve = new THREE.EllipseCurve(0, 0 /*ax, ay*/, .65, .65 /* xRadius, yRadius */, 0, Math.PI /* aStartAngle, aEndAngle */, false)
    points = curve.getSpacedPoints( 20 )
    path = new THREE.Path()
    geometry = path.createGeometry( points )
    material = new THREE.LineBasicMaterial( { color : this.WIREFRAME_COLOUR } )
    const inner = new THREE.Line( geometry, material )
    doorFrame.add(inner)

    lg1 = new THREE.Geometry()
    lg1.vertices.push(new THREE.Vector3(.65, -1.5, 0), new THREE.Vector3(.65, 0, 0))
    l1 = new THREE.Line(lg1, material)
    doorFrame.add(l1)

    lg2 = new THREE.Geometry()
    lg2.vertices.push(new THREE.Vector3(-.65, -1.5, 0), new THREE.Vector3(-.65, 0, 0))
    l2 = new THREE.Line(lg2, material)
    doorFrame.add(l2)

    // door
    const door = new THREE.Group()

    curve = new THREE.EllipseCurve(0, 0 /*ax, ay*/, .65, .65 /* xRadius, yRadius */, 0, Math.PI /* aStartAngle, aEndAngle */, false)
    points = curve.getSpacedPoints( 20 )
    path = new THREE.Path()
    geometry = path.createGeometry( points )
    material = new THREE.LineBasicMaterial( { color : this.WIREFRAME_COLOUR } )
    const inner = new THREE.Line( geometry, material )
    door.add(inner)

    lg1 = new THREE.Geometry()
    lg1.vertices.push(new THREE.Vector3(.65, -1.5, 0), new THREE.Vector3(.65, 0, 0))
    l1 = new THREE.Line(lg1, material)
    door.add(l1)

    lg2 = new THREE.Geometry()
    lg2.vertices.push(new THREE.Vector3(-.65, -1.5, 0), new THREE.Vector3(-.65, 0, 0))
    l2 = new THREE.Line(lg2, material)
    door.add(l2)

    const lg = new THREE.Geometry()
    lg.vertices.push(new THREE.Vector3(.39, -1.5, 0), new THREE.Vector3(.39, 0.52, 0))
    const l = new THREE.Line(lg, material)
    door.add(l)

    lg = new THREE.Geometry()
    lg.vertices.push(new THREE.Vector3(.13, -1.5, 0), new THREE.Vector3(.13, 0.64, 0))
    l = new THREE.Line(lg, material)
    door.add(l)

    lg = new THREE.Geometry()
    lg.vertices.push(new THREE.Vector3(-.13, -1.5, 0), new THREE.Vector3(-.13, 0.64, 0))
    l = new THREE.Line(lg, material)
    door.add(l)

    lg = new THREE.Geometry()
    lg.vertices.push(new THREE.Vector3(-.39, -1.5, 0), new THREE.Vector3(-.39, 0.52, 0))
    l = new THREE.Line(lg, material)
    door.add(l)

    // put it all together
    if (rotate) {
      doorFrame.rotation.y += Math.PI/2
      door.rotation.y += Math.PI/2
    }

    doorFrame.position.x += x
    doorFrame.position.z += z

    door.position.x += x + 1.3
    door.position.z += z

    this.scene.add(doorFrame)
    //this.scene.add(door)
    this.doors.push(new THREE.Vector2(x, z))
  }

  _buildShape(geometry, x, z, y=0) {
    const edges = new THREE.EdgesGeometry(geometry)
    const material = new THREE.LineBasicMaterial({color: this.WIREFRAME_COLOUR})
    const shape = new THREE.LineSegments(edges, material)
    shape.position.x = x
    shape.position.z = z
    shape.position.y = y
    return shape
  }

  _buildSolidShape(geometry, x, z, y=0) {
    // mesh
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
    })
    const mesh = new THREE.Mesh( geometry, material )

    // wireframe
    const geo = new THREE.EdgesGeometry(mesh.geometry)
    const mat = new THREE.LineBasicMaterial( { color: this.WIREFRAME_COLOUR } )
    const wireframe = new THREE.LineSegments( geo, mat )

    mesh.add( wireframe )

    mesh.position.x = x
    mesh.position.z = z
    mesh.position.y = y

    return mesh
  }
}