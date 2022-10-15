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
    this.addCube(x, y);
    //var key = this.addKey(x, y);
    var table = this.addTable(x, y)
    var chair = this.addChair(x, y)
    //var ghost = this.addGhost(x, y)

    var armour = this.addArmour(x, y)

    //this.scene.add( key );
    //this.axis = new THREE.Vector3(1,0, 0);

    // subscribe to input events
    var self = this;
    document.onkeydown = e => self._handleInput(self, e);
  }

  addCube(x, z) {
    var geometry = new THREE.BoxGeometry(10, 3, 10); // width, height, depth
    var cube = this._buildSolidShape(geometry, x, z);
    cube.rotation.y += 2;
    this.scene.add(cube);
    return cube;
  }

  addPyramid(x, z) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 1),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0.5, 1, 0.5));
    geometry.faces.push(
      new THREE.Face3(0, 2, 1),
      new THREE.Face3(0, 3, 2),
      new THREE.Face3(1, 4, 0),
      new THREE.Face3(2, 4, 1),
      new THREE.Face3(3, 4, 2),
      new THREE.Face3(0, 4, 3));

    var pyramid = this._buildSolidShape(geometry, x, z);
    pyramid.position.y = -0.5;
    this.scene.add(pyramid);
    return pyramid;
  }

  addTable(x, z) {
    var points = [];
    points.push( new THREE.Vector2( 0.05, -1.5 ));
    points.push( new THREE.Vector2( 0.1, -1.4 ));
    points.push( new THREE.Vector2( 0.1, -1.35 ));
    points.push( new THREE.Vector2( 0.05, -1.3 ));
    points.push( new THREE.Vector2( 0.15, -0.7 ));

    var legGeometry = new THREE.LatheGeometry( points)
    var leg1 = this._buildSolidShape(legGeometry, x, z);
    var leg2 = this._buildSolidShape(legGeometry, x+1.2, z);
    var leg3 = this._buildSolidShape(legGeometry, x+1.2, z+2.2);
    var leg4 = this._buildSolidShape(legGeometry, x, z+2.2);

    var tableGeometry1 = new THREE.BoxGeometry(1.6, 0.05, 2.6); // width, height, depth
    var tableGeometry2 = new THREE.BoxGeometry(1.8, 0.05, 2.8); // width, height, depth
    var cube1 = this._buildSolidShape(tableGeometry1, x+0.6, z+1.1);
    var cube2 = this._buildSolidShape(tableGeometry2, x+0.6, z+1.1);
    cube1.position.y = -0.675
    cube2.position.y = -0.625
    // cube.rotation.y += 2;
    var group = new THREE.Group();
    group.add( cube1 )
    group.add( cube2 )
    group.add( leg1 )
    group.add( leg2 )
    group.add( leg3 )
    group.add( leg4 )
    group.rotation.y += Math.PI / 4
    this.scene.add(group);
  }

  addGhost(x, z) {
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

  addArmour(x, z) {
    var bodyGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.2); // width, height, depth
    var body = this._buildSolidShape(bodyGeometry, x, z);
    body.position.y += 0.2

    var points = [];
    points.push( new THREE.Vector2( 0.16, 0 ));
    points.push( new THREE.Vector2( 0.15, 0.03 ));
    points.push( new THREE.Vector2( 0.1, 0.065 ));
    points.push( new THREE.Vector2( 0.05, 0.075 ));
    points.push( new THREE.Vector2( 0, 0.08 ));

    var shoulderGeometry = new THREE.LatheGeometry( points)
    var leftShoulder = this._buildSolidShape(shoulderGeometry, 0, 0);
    leftShoulder.rotation.z -= 1 * Math.PI / 8
    leftShoulder.rotation.y += 2 * Math.PI / 8
    leftShoulder.position.y += 0.4
    leftShoulder.position.x = x + 0.2
    leftShoulder.position.z = z

    var rightShoulder = this._buildSolidShape(shoulderGeometry, 0, 0);
    rightShoulder.rotation.z += 1 * Math.PI / 8
    rightShoulder.rotation.y -= 2 * Math.PI / 8
    rightShoulder.position.y += 0.4
    rightShoulder.position.x = x - 0.2
    rightShoulder.position.z = z



    var points3 = [];
    points3.push( new THREE.Vector2( 0.06, 0.4 ));
    points3.push( new THREE.Vector2( 0.06, 0.45 ));
    points3.push( new THREE.Vector2( 0.1, 0.5 ));
    points3.push( new THREE.Vector2( 0.12, 0.65 ));
    points3.push( new THREE.Vector2( 0.14, 0.65 ));
    points3.push( new THREE.Vector2( 0.11, 0.75 ));
    points3.push( new THREE.Vector2( 0.06, 0.8 ));





    var headGeometry = new THREE.LatheGeometry( points3)
    var head = this._buildSolidShape(headGeometry, x, z);


    var points2 = [];
    points2.push( new THREE.Vector2( 0.06, 0 ));
    points2.push( new THREE.Vector2( 0.05, 0.22 ));
    points2.push( new THREE.Vector2( 0.07, 0.25 ));
    points2.push( new THREE.Vector2( 0.08, 0.28 ));
    points2.push( new THREE.Vector2( 0.07, 0.31 ));
    points2.push( new THREE.Vector2( 0.03, 0.34 ));
    points2.push( new THREE.Vector2( 0, 0.34 ));


    var upperarmGeometry = new THREE.LatheGeometry( points2)
    var leftupperarm = this._buildSolidShape(upperarmGeometry, 0, 0);
    var rightupperarm = this._buildSolidShape(upperarmGeometry, 0, 0);
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

    var points4 = [];
    points4.push( new THREE.Vector2( 0.05, 0 ));
    points4.push( new THREE.Vector2( 0.02, 0.18 ));
    points4.push( new THREE.Vector2( 0.04, 0.20 ));
    points4.push( new THREE.Vector2( 0.05, 0.22 ));
    points4.push( new THREE.Vector2( 0.04, 0.24 ));
    points4.push( new THREE.Vector2( 0, 0.26 ));

    var lowerarmGeometry = new THREE.LatheGeometry( points4)
    var leftlowerarm = this._buildSolidShape(lowerarmGeometry, 0, 0);
    var rightlowerarm = this._buildSolidShape(lowerarmGeometry, 0, 0);
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

    var dpShape = new THREE.Shape();
    dpShape.moveTo(0,0);
    dpShape.lineTo(0.16,0);
    dpShape.quadraticCurveTo(0.3, -0.15, 0.13, -0.2);
    dpShape.lineTo(0.08,-0.2);
    dpShape.quadraticCurveTo(0.08, -0.09, 0, -0.09);
    dpShape.quadraticCurveTo(-0.08, -0.09, -0.08, -0.2);
    dpShape.lineTo(-0.15,-0.2);
    dpShape.quadraticCurveTo(-0.35, -0.13, -0.16, 0);
    dpShape.autoClose = true;



    var extrudeSettings = {
      steps: 2,
      amount: 0,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.05,
      bevelSegments: 2
    };
    var dpGeometry = new THREE.ExtrudeGeometry( dpShape, extrudeSettings );

    var dp = this._buildSolidShape(dpGeometry, 0, 0);
    dp.rotation.x += 1 * Math.PI / 16
    dp.position.x = x
    dp.position.z = z - 0.1

    var dp2 = this._buildSolidShape(dpGeometry, 0, 0);
    dp2.rotation.x -= 1 * Math.PI / 8
    dp2.position.x = x
    dp2.position.z = z + 0.1


    var spShape = new THREE.Shape();
    spShape.moveTo(0,0);
    spShape.lineTo(0.12,0);
    spShape.lineTo(0.15,-0.15);
    spShape.quadraticCurveTo(0, -0.25, -0.15, -0.15);
    spShape.lineTo(-0.12,0);
    spShape.autoClose = true;

    var spGeometry = new THREE.ExtrudeGeometry( spShape, extrudeSettings );

    var axis = new THREE.Vector3(0, 0.71, -0.71)
    var sp = this._buildSolidShape(spGeometry, 0, 0);
    sp.rotation.x += 2 * Math.PI / 8;
    sp.rotateOnAxis(axis, 4 * Math.PI / 8);
    sp.position.x = x - 0.23;
    sp.position.z = z;

    var sp2 = this._buildSolidShape(spGeometry, 0, 0);
    sp2.rotation.x += 2 * Math.PI / 8;
    sp2.rotateOnAxis(axis, -4 * Math.PI / 8);
    sp2.position.x = x + 0.23;
    sp2.position.z = z;

    var points5 = [];
    points5.push( new THREE.Vector2( 0, 0 ));
    points5.push( new THREE.Vector2( 0.09, 0 ));
    points5.push( new THREE.Vector2( 0.07, -0.35 ));
    points5.push( new THREE.Vector2( 0.085, -0.375 ));
    points5.push( new THREE.Vector2( 0.09, -0.4 ));
    points5.push( new THREE.Vector2( 0.085, -0.425 ));
    points5.push( new THREE.Vector2( 0.07, -0.45 ));
    points5.push( new THREE.Vector2( 0.04, -0.7));
    points5.push( new THREE.Vector2( 0.05, -0.8 ));
    points5.push( new THREE.Vector2( 0, -0.8 ));

    var legGeometry = new THREE.LatheGeometry( points5)
    var leftleg = this._buildSolidShape(legGeometry, x-0.1, z);
    var rightleg = this._buildSolidShape(legGeometry, x+0.1, z);

    var footGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.2); // width, height, depth
    var leftfoot = this._buildSolidShape(footGeometry, x-0.1, z-0.05);
    leftfoot.position.y -= 0.775
    var rightfoot = this._buildSolidShape(footGeometry, x+0.1, z-0.05);
    rightfoot.position.y -= 0.775

    var handleShape = new THREE.Shape();
    handleShape.moveTo(0,0);
    handleShape.quadraticCurveTo(-0.05, 0, -0.05, -0.05);
    handleShape.quadraticCurveTo(-0.05, -0.1, -0.02, -0.1);
    handleShape.lineTo(-0.01,-0.29);
    handleShape.quadraticCurveTo(-0.28, -0.29, -0.28, -0.27);
    handleShape.lineTo(-0.3,-0.3);
    handleShape.lineTo(-0.28,-0.32);
    handleShape.quadraticCurveTo(0, -0.3, 0.28, -0.32);
    handleShape.lineTo(0.3,-0.3);
    handleShape.lineTo(0.28,-0.28);
    handleShape.quadraticCurveTo(0.28, -0.29, 0.01, -0.29);
    handleShape.lineTo(0.02,-0.1);
    handleShape.quadraticCurveTo(0.05, -0.1, 0.05, -0.05);
    handleShape.quadraticCurveTo(0.05, 0, 0, 0);
    handleShape.autoClose = true;

    var extrudeSettings2 = {
      steps: 2,
      amount: 0.01,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 1
    };
    var handleGeometry = new THREE.ExtrudeGeometry( handleShape, extrudeSettings2 );

    var handle = this._buildSolidShape(handleGeometry, 0, 0);
    //dp.rotation.x += 1 * Math.PI / 16
    handle.position.x = x - 0.35
    handle.position.z = z - 0.36
    handle.position.y += 0.35

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-0.03,0);
    bladeShape.quadraticCurveTo(0, -0.18, -0.05, -0.18);
    bladeShape.quadraticCurveTo(-0.01, -0.18, -0.01, -0.5);
    bladeShape.quadraticCurveTo(-0.01, -0.85, 0, -0.85);
    bladeShape.quadraticCurveTo(0.01, -0.85, 0.01, -0.5);
    bladeShape.quadraticCurveTo(0.01, -0.18, 0.05, -0.18);
    bladeShape.quadraticCurveTo(0, -0.18, 0.03, 0);
    bladeShape.autoClose = true;

    var extrudeSettings3 = {
      steps: 2,
      amount: 0,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.03,
      bevelSegments: 1
    };

    var bladeGeometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings3 );

    var blade = this._buildSolidShape(bladeGeometry, 0, 0);
    //dp.rotation.x += 1 * Math.PI / 16
    blade.position.y += 0.05
    blade.position.x = x - 0.35
    blade.position.z = z - 0.36

    var group = new THREE.Group();
    group.add( body );
    group.add( leftShoulder );
    group.add( rightShoulder );
    group.add( head );
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

    this.scene.add(group);
  }

  addChair(x, z) {
    var points = [];
    points.push( new THREE.Vector2( 0.025, -1.5 ));
    points.push( new THREE.Vector2( 0.05, -1.45 ));
    points.push( new THREE.Vector2( 0.05, -1.425 ));
    points.push( new THREE.Vector2( 0.025, -1.375 ));
    points.push( new THREE.Vector2( 0.075, -1.1 ));

    var legGeometry = new THREE.LatheGeometry( points)
    var leg1 = this._buildSolidShape(legGeometry, x, z);
    var leg2 = this._buildSolidShape(legGeometry, x+0.3, z);
    var leg3 = this._buildSolidShape(legGeometry, x+0.3, z+0.3);
    var leg4 = this._buildSolidShape(legGeometry, x, z+0.3);

    var chairseatGeometry1 = new THREE.BoxGeometry(0.45, 0.05, 0.45); // width, height, depth
    var cube1 = this._buildSolidShape(chairseatGeometry1, x+0.15, z+0.15);

    var backShape = new THREE.Shape();
    backShape.moveTo(0,0);
    backShape.lineTo(0.225,0);
    backShape.lineTo(0.225,0.3);
    backShape.quadraticCurveTo(0.075, 0.3, 0.075, 0.75);
    backShape.quadraticCurveTo(0.225, 0.75, 0.225, 0.8125);
    backShape.quadraticCurveTo(0.225, 0.875, 0.075, 0.875);
    backShape.quadraticCurveTo(0.075, 1, 0, 1);
    backShape.quadraticCurveTo(-0.075, 1, -0.075, 0.875);
    backShape.quadraticCurveTo(-0.225, 0.875, -0.225, 0.8125);
    backShape.quadraticCurveTo(-0.225, 0.75, -0.075, 0.75);
    backShape.quadraticCurveTo(-0.075, 0.3, -0.225, 0.3);
    backShape.lineTo(-0.225,0);
    backShape.autoClose = true;

    var extrudeSettings = { amount: 0.05, steps: 1, bevelEnabled: false};
    var backGeometry = new THREE.ExtrudeGeometry( backShape, extrudeSettings );

    var back = this._buildSolidShape(backGeometry, x+0.15, z-0.07);

    back.position.y = -1.05
    cube1.position.y = -1.075
    var group = new THREE.Group();
    group.add( cube1 )
    group.add( back )
    //group.add( cube2 )
    group.add( leg1 )
    group.add( leg2 )
    group.add( leg3 )
    group.add( leg4 )
    group.rotation.y += -Math.PI / 6
    this.scene.add(group);
  }

  addKey(x, z) {
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