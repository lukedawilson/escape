class Game {
  constructor(width, height) {
    this.LIGHT_GREEN = 0x808080;

    this.counter = 1;

    this.width = width;
    this.height = height;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    this.camera.position.z = -5;
    this.camera.rotation.y += Math.PI;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    document.body.appendChild(this.renderer.domElement);

    // define room
    var x = this.camera.position.x;
    var y = this.camera.position.z;
    this._addCube(x, y);
    this._addKey(x - 1, y + 2);
    this._addGhost(x + 1, y + 2)

    //this.scene.add( key );
    //this.axis = new THREE.Vector3(1,0, 0);

    // subscribe to input events
    var self = this;
    document.onkeydown = e => self._handleInput(self, e);
  }

  _addCube(x, z) {
    var geometry = new THREE.BoxGeometry(10, 3, 10); // width, height, depth
    var cube = this._buildSolidShape(geometry, x, z);
    cube.rotation.y += 2;
    this.scene.add(cube);
    return cube;
  }

  _addGhost(x, z) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(-0.2, 0, -0.1),
      new THREE.Vector3(-0.2, 0, 0.1),
      new THREE.Vector3(0.2, 0, -0.1),
      new THREE.Vector3(0.2, 0, 0.1),
      new THREE.Vector3(-0.3, -0.25, -0.075),
      new THREE.Vector3(-0.3, -0.25, 0.075),
      new THREE.Vector3(0, -0.25, -0.075),
      new THREE.Vector3(0, -0.25, 0.075),
      new THREE.Vector3(-0.2, -0.5, -0.05),
      new THREE.Vector3(-0.2, -0.5, 0.05),
      new THREE.Vector3(0, -0.5, -0.05),
      new THREE.Vector3(0, -0.5, 0.05),
      new THREE.Vector3(0.1, -0.75, 0));
    geometry.faces.push(
      new THREE.Face3(0, 1, 4),
      new THREE.Face3(1, 4, 5),
      new THREE.Face3(0, 2, 4),
      new THREE.Face3(2, 4, 6),
      new THREE.Face3(2, 3, 6),
      new THREE.Face3(3, 6, 7),
      new THREE.Face3(1, 3, 5),
      new THREE.Face3(3, 5, 7),
      new THREE.Face3(4, 5, 8),
      new THREE.Face3(5, 8, 9),
      new THREE.Face3(4, 6, 8),
      new THREE.Face3(6, 8, 10),
      new THREE.Face3(6, 7, 10),
      new THREE.Face3(7, 10, 11),
      new THREE.Face3(5, 7, 9),
      new THREE.Face3(7, 9, 11),
      new THREE.Face3(8, 9, 12),
      new THREE.Face3(9, 10, 12),
      new THREE.Face3(10, 11, 12),
      new THREE.Face3(8, 11, 12));

    var ghostBottom = this._buildShape(geometry, x, z);

    var bodyGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.2); // width, height, depth
    var body = this._buildShape(bodyGeometry, x, z);
    body.position.y += 0.2

    var points = [];
    points.push( new THREE.Vector2( 0.06, 0.4 ));
    points.push( new THREE.Vector2( 0.06, 0.45 ));
    points.push( new THREE.Vector2( 0.1, 0.5 ));
    points.push( new THREE.Vector2( 0.12, 0.65 ));
    points.push( new THREE.Vector2( 0.14, 0.65 ));
    points.push( new THREE.Vector2( 0.11, 0.75 ));
    points.push( new THREE.Vector2( 0.06, 0.8 ));

    var headGeometry = new THREE.LatheGeometry( points)
    var head = this._buildShape(headGeometry, x, z);

    var points2 = [];
    points2.push( new THREE.Vector2( 0.06, 0 ));
    points2.push( new THREE.Vector2( 0.05, 0.3 ));
    points2.push( new THREE.Vector2( 0.02, 0.3 ));
    points2.push( new THREE.Vector2( 0.045, 0.325 ));
    points2.push( new THREE.Vector2( 0.06, 0.35 ));
    points2.push( new THREE.Vector2( 0.045, 0.375 ));
    points2.push( new THREE.Vector2( 0, 0.4 ));

    var armGeometry = new THREE.LatheGeometry( points2)
    var arm = this._buildShape(armGeometry, 0, 0);
    var arm2 = this._buildShape(armGeometry, 0, 0);
    arm.rotation.z -= 7 * Math.PI / 8
    arm.position.x = x + 0.2
    arm.position.y = 0.37
    arm.position.z = z

    arm2.rotation.z += 7 * Math.PI / 8
    arm2.position.x = x - 0.2
    arm2.position.y = 0.37
    arm2.position.z = z

    var group = new THREE.Group();
    group.add( body )
    group.add( ghostBottom )
    group.add( head )
    group.add( arm )
    group.add( arm2 )

    group.position.y -= 0.25

    this.scene.add(group);
  }

  _addKey(x, z) {
    var ss = 0.4 // shape size
    var trackShape = new THREE.Shape();
    trackShape.moveTo( 0.1 * ss, 0.075  * ss);
    trackShape.lineTo( 0.4 * ss, 0.3 * ss );
    trackShape.lineTo( 0.4 * ss, 0.7 * ss );
    trackShape.lineTo( 0 * ss, 1 * ss );
    trackShape.lineTo( -0.4 * ss, 0.7 * ss );
    trackShape.lineTo( -0.4 * ss, 0.3 * ss );
    trackShape.lineTo( -0.1 * ss, 0.075 * ss );
    trackShape.lineTo( -0.1 * ss, -1.5 * ss );
    trackShape.lineTo( 0.1 * ss, -1.5 * ss );
    trackShape.lineTo( 0.1 * ss, -1.4 * ss );
    trackShape.lineTo( 0.4 * ss, -1.4 * ss );
    trackShape.lineTo( 0.4 * ss, -1 * ss );
    trackShape.lineTo( 0.1 * ss, -1 * ss );

    trackShape.autoClose = true;
    //var geometry = new THREE.ShapeBufferGeometry( trackShape );
    var extrudeSettings = {
      steps: 1,
      amount: 0.1 * ss,
      bevelEnabled: false,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 1
    };

    var geometry = new THREE.ExtrudeGeometry( trackShape, extrudeSettings );

    //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //var mesh = new THREE.Mesh( geometry, material ) ;
    var object = this._buildSolidShape(geometry, x, z);
    //this.scene.add( mesh );
    this.scene.add( object );
    return object
  }

  gameLoop(refreshRateMs = 50) {
    setInterval(() => {
      this._render();
      //this.group.rotateOnAxis(this.axis,0.01);
    }, refreshRateMs);
  }

  _render() {
    //requestAnimationFrame(sender._render(sender));
    this.renderer.render(this.scene, this.camera);
  }

  _buildShape(geometry, x, z) {
    var edges = new THREE.EdgesGeometry(geometry);
    var material = new THREE.LineBasicMaterial({color: this.LIGHT_GREEN});
    var shape = new THREE.LineSegments(edges, material);
    shape.position.x = x;
    shape.position.z = z;
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

  _getPosVector(d, theta) {
    var hyp = d;
    var opp = hyp * Math.sin(theta);
    var adj = hyp * Math.cos(theta);
    return new THREE.Vector2(opp, adj);
  }

  _handleInput(sender, e) {
    var theta = sender.camera.rotation.y - Math.PI;
    var pos = sender._getPosVector(.1, theta);

    switch(e.keyCode) {
      case 38: // up
        if (sender.camera.position.x + pos.x >= 5 - 1 ||
            sender.camera.position.x + pos.x <= -5 +1 ||
            sender.camera.position.z + pos.y >= 0 - 1 ||
            sender.camera.position.z + pos.y <= -10 + 1)
          return;

        sender.camera.position.x += pos.x;
        sender.camera.position.z += pos.y;
        break;
      case 40: // down
        if (sender.camera.position.x - pos.x >= 5 - 1 ||
            sender.camera.position.x - pos.x <= -5 + 1 ||
            sender.camera.position.z - pos.y >= 0 - 1 ||
            sender.camera.position.z - pos.y <= -10 + 1)
          return;

        sender.camera.position.x -= pos.x;
        sender.camera.position.z -= pos.y;
        break;
      case 37: // left
        sender.camera.rotation.y += .1;
        break;
      case 39: // right
        sender.camera.rotation.y -= .1;
        break;
    }
  }
}