class Room {
  constructor(scene, x, y, width, depth, height) {
    this.WIREFRAME_COLOUR = 0x808080;

    var geometry = new THREE.BoxGeometry(width, height, depth);
    var cube = this._buildSolidShape(geometry, x, y);
    scene.add(cube);

    this.scene = scene;
    this.shape = cube;
    this.width = width;
    this.height = height;
    this.depth = depth;

    this.x = x;
    this.y = y;

    this.maxX = x + width/2;
    this.minX = x - width/2;
    this.maxY = y + depth/2;
    this.minY = y - depth/2;

    this.doors = [];
  }

  hitsWall(deltaX, deltaY) {
    for (var i = 0; i < this.doors.length; i++) {
      var v = this.doors[i];

      if (deltaY >= v.y - 1 && deltaY <= v.y + 1 && deltaX >= this.x - .65 && deltaX <= this.x + .65)
        return false;

      if (deltaX >= v.x - 1 && deltaX <= v.x + 1 && deltaY >= this.y - .65 && deltaY <= this.y + .65)
        return false;
    }

    return deltaX >= this.maxX - 1 ||
           deltaX <= this.minX + 1 ||
           deltaY >= this.maxY - 1||
           deltaY <= this.minY + 1;
  }

  inRoom(x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }

  _addBrick(x, y, z) {
    var geometry = new THREE.BoxGeometry(.3, .1, 0);
    var brick = this._buildShape(geometry, x, z, y);
    return brick;
  }

  _addDoor(x, z, rotate) {
    var door = new THREE.Group();

    // outer
    var curve = new THREE.EllipseCurve(0, 0 /*ax, ay*/, .75, .75 /* xRadius, yRadius */, 0, Math.PI /* aStartAngle, aEndAngle */, false);
    var points = curve.getSpacedPoints( 20 );
    var path = new THREE.Path();
    var geometry = path.createGeometry( points );
    var material = new THREE.LineBasicMaterial( { color : this.WIREFRAME_COLOUR } );
    var outer = new THREE.Line( geometry, material );
    door.add(outer);

    var lg1 = new THREE.Geometry();
    lg1.vertices.push(new THREE.Vector3(.75, -1.5, 0), new THREE.Vector3(.75, 0, 0));
    var l1 = new THREE.Line(lg1, material);
    door.add(l1);

    var lg2 = new THREE.Geometry();
    lg2.vertices.push(new THREE.Vector3(-.75, -1.5, 0), new THREE.Vector3(-.75, 0, 0));
    var l2 = new THREE.Line(lg2, material);
    door.add(l2);

    // inner
    curve = new THREE.EllipseCurve(0, 0 /*ax, ay*/, .65, .65 /* xRadius, yRadius */, 0, Math.PI /* aStartAngle, aEndAngle */, false);
    points = curve.getSpacedPoints( 20 );
    path = new THREE.Path();
    geometry = path.createGeometry( points );
    material = new THREE.LineBasicMaterial( { color : this.WIREFRAME_COLOUR } );
    var inner = new THREE.Line( geometry, material );
    door.add(inner);

    lg1 = new THREE.Geometry();
    lg1.vertices.push(new THREE.Vector3(.65, -1.5, 0), new THREE.Vector3(.65, 0, 0));
    l1 = new THREE.Line(lg1, material);
    door.add(l1);

    lg2 = new THREE.Geometry();
    lg2.vertices.push(new THREE.Vector3(-.65, -1.5, 0), new THREE.Vector3(-.65, 0, 0));
    l2 = new THREE.Line(lg2, material);
    door.add(l2);

    if (rotate)
      door.rotation.y += Math.PI/2;

    door.position.x += x;
    door.position.z += z;

    this.scene.add(door);
    this.doors.push(new THREE.Vector2(x, z));
  }

  _buildShape(geometry, x, z, y=0) {
    var edges = new THREE.EdgesGeometry(geometry);
    var material = new THREE.LineBasicMaterial({color: this.WIREFRAME_COLOUR});
    var shape = new THREE.LineSegments(edges, material);
    shape.position.x = x;
    shape.position.z = z;
    shape.position.y = y;
    return shape;
  }

  _buildSolidShape(geometry, x, z, y=0) {
    // mesh
    var material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
    });
    var mesh = new THREE.Mesh( geometry, material );
    
    // wireframe
    var geo = new THREE.EdgesGeometry(mesh.geometry);
    var mat = new THREE.LineBasicMaterial( { color: this.WIREFRAME_COLOUR } );
    var wireframe = new THREE.LineSegments( geo, mat );
    
    mesh.add( wireframe );
    
    mesh.position.x = x;
    mesh.position.z = z;
    mesh.position.y = y;
    
    return mesh;
  } 
}