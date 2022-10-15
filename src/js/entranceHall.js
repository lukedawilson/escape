class EntranceHall extends Room {
  constructor(scene, x, y, width, depth, height) {
    super(scene, x, y, width, depth, height);

    this._addBricks(x + 2, .3, this.minY);
    this._addBricks(x - 2, .8, this.minY);

    this._addBricks(x + 1.6, .3, this.maxY);
    this._addBricks(x - 2.7, .1, this.maxY);

    this._addBricks(this.minX, 1.3, y - .2, true);
    this._addBricks(this.minX, .3, y + 3, true);
    this._addBricks(this.minX, .1, y - 3.6, true);

    this._addBricks(this.maxX, .8, y - 1.2, true);
    this._addBricks(this.maxX, .1, y - 2.9, true);

    this._addDoor(x, this.maxY);
    this._addDoor(this.maxX, y, true);

    this._addArmour(x - 1.5, this.maxY - .3);
    this._addArmour(x + 1.5, this.maxY - .3);
  }

  _addBricks(xOffset, yOffset, zOffset, rotate) {
    var bricks = new THREE.Group();

    bricks.add(this._addBrick(0, 0 + yOffset, 0));
    bricks.add(this._addBrick(.6, 0 + yOffset, 0));
    bricks.add(this._addBrick(.9, 0 + yOffset, 0));

    bricks.add(this._addBrick(.15, -.1 + yOffset, 0));
    bricks.add(this._addBrick(.45, -.1 + yOffset, 0));
    bricks.add(this._addBrick(.75, -.1 + yOffset, 0));

    bricks.add(this._addBrick(0, -.2 + yOffset, 0));
    bricks.add(this._addBrick(.3, -.2 + yOffset, 0));
    bricks.add(this._addBrick(.6, -.2 + yOffset, 0));

    if (rotate)
      bricks.rotation.y += Math.PI/2;

    bricks.position.x += xOffset;
    bricks.position.z += zOffset;

    this.scene.add(bricks);
  }

  _addArmour(x, z) {
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
}

class DiningRoom extends Room {
  constructor(scene, x, y, width, depth, height) {
    super(scene, x, y, width, depth, height);

    this._addBricks(x + 2, .3, this.minY);
    this._addBricks(x - 2, .8, this.minY);

    this._addBricks(x + 1.6, .3, this.maxY);
    this._addBricks(x - 2.7, .1, this.maxY);

    this._addBricks(this.minX, 1.3, y - .2, true);
    this._addBricks(this.minX, .3, y + 3, true);
    this._addBricks(this.minX, .1, y - 3.6, true);

    this._addBricks(this.maxX, .8, y - 1.2, true);
    this._addBricks(this.maxX, .1, y - 2.9, true);

    this._addDoor(x, this.minY);

    this._addTable(x, y);
    this._addChair(x - 1, y + 1, Math.PI/2); // right
    this._addChair(x + 2, y + 1, 3*Math.PI/2); // left
    this._addChair(x, y - 1); // bottom
    this._addChair(x, y + 3, Math.PI); // top
  }

  _addBricks(xOffset, yOffset, zOffset, rotate) {
    var bricks = new THREE.Group();

    bricks.add(this._addBrick(0, 0 + yOffset, 0));
    bricks.add(this._addBrick(.6, 0 + yOffset, 0));
    bricks.add(this._addBrick(.9, 0 + yOffset, 0));

    bricks.add(this._addBrick(.15, -.1 + yOffset, 0));
    bricks.add(this._addBrick(.45, -.1 + yOffset, 0));
    bricks.add(this._addBrick(.75, -.1 + yOffset, 0));

    bricks.add(this._addBrick(0, -.2 + yOffset, 0));
    bricks.add(this._addBrick(.3, -.2 + yOffset, 0));
    bricks.add(this._addBrick(.6, -.2 + yOffset, 0));

    if (rotate)
      bricks.rotation.y += Math.PI/2;

    bricks.position.x += xOffset;
    bricks.position.z += zOffset;

    this.scene.add(bricks);
  }

  _addTable(x, z) {
    var points = [];
    points.push( new THREE.Vector2( 0.05, -1.5 ));
    points.push( new THREE.Vector2( 0.1, -1.4 ));
    points.push( new THREE.Vector2( 0.1, -1.35 ));
    points.push( new THREE.Vector2( 0.05, -1.3 ));
    points.push( new THREE.Vector2( 0.15, -0.7 ));

    var legGeometry = new THREE.LatheGeometry( points)
    var leg1 = this._buildSolidShape(legGeometry, 0, 0);
    var leg2 = this._buildSolidShape(legGeometry, 1.2, 0);
    var leg3 = this._buildSolidShape(legGeometry, 1.2, 2.2);
    var leg4 = this._buildSolidShape(legGeometry, 0, 2.2);

    var tableGeometry1 = new THREE.BoxGeometry(1.6, 0.05, 2.6); // width, height, depth
    var tableGeometry2 = new THREE.BoxGeometry(1.8, 0.05, 2.8); // width, height, depth
    var cube1 = this._buildSolidShape(tableGeometry1, 0.6, 1.1);
    var cube2 = this._buildSolidShape(tableGeometry2, 0.6, 1.1);
    cube1.position.y = -0.675;
    cube2.position.y = -0.625;

    var group = new THREE.Group();
    group.add( cube1 );
    group.add( cube2 );
    group.add( leg1 );
    group.add( leg2 );
    group.add( leg3 );
    group.add( leg4 );

    group.position.x += x;
    group.position.z += z;

    this.scene.add(group);
  }

  _addChair(x, z, rotation=0) {
    var points = [];
    points.push( new THREE.Vector2( 0.025, -1.5 ));
    points.push( new THREE.Vector2( 0.05, -1.45 ));
    points.push( new THREE.Vector2( 0.05, -1.425 ));
    points.push( new THREE.Vector2( 0.025, -1.375 ));
    points.push( new THREE.Vector2( 0.075, -1.1 ));

    var legGeometry = new THREE.LatheGeometry( points);
    var leg1 = this._buildSolidShape(legGeometry, 0, 0);
    var leg2 = this._buildSolidShape(legGeometry, 0.3, 0);
    var leg3 = this._buildSolidShape(legGeometry, 0.3, 0.3);
    var leg4 = this._buildSolidShape(legGeometry, 0, 0.3);

    var chairseatGeometry1 = new THREE.BoxGeometry(0.45, 0.05, 0.45); // width, height, depth
    var cube1 = this._buildSolidShape(chairseatGeometry1, 0.15, 0.15);

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

    var back = this._buildSolidShape(backGeometry, 0.15, -0.07);


    back.position.y = -1.05;
    cube1.position.y = -1.075;
    var group = new THREE.Group();
    group.add( cube1 );
    group.add( back );
    //group.add( cube2 );
    group.add( leg1 );
    group.add( leg2 );
    group.add( leg3 );
    group.add( leg4 );

    group.rotation.y += rotation;
    group.position.x += x;
    group.position.z += z;

    this.scene.add(group);
  }
}

class Armoury extends Room {
  constructor(scene, x, y, width, depth, height) {
    super(scene, x, y, width, depth, height);

    this._addBricks(x + 2, .3, this.minY);
    this._addBricks(x - 2, .8, this.minY);

    this._addBricks(x + 1.6, .3, this.maxY);
    this._addBricks(x - 2.7, .1, this.maxY);

    this._addBricks(this.minX, 1.3, y - .2, true);
    this._addBricks(this.minX, .3, y + 3, true);
    this._addBricks(this.minX, .1, y - 3.6, true);

    this._addBricks(this.maxX, .8, y - 1.2, true);
    this._addBricks(this.maxX, .1, y - 2.9, true);

    this._addDoor(x, this.maxY);
    this._addDoor(this.minX, y, true);
  }

  _addBricks(xOffset, yOffset, zOffset, rotate) {
    var bricks = new THREE.Group();

    bricks.add(this._addBrick(0, 0 + yOffset, 0));
    bricks.add(this._addBrick(.6, 0 + yOffset, 0));
    bricks.add(this._addBrick(.9, 0 + yOffset, 0));

    bricks.add(this._addBrick(.15, -.1 + yOffset, 0));
    bricks.add(this._addBrick(.45, -.1 + yOffset, 0));
    bricks.add(this._addBrick(.75, -.1 + yOffset, 0));

    bricks.add(this._addBrick(0, -.2 + yOffset, 0));
    bricks.add(this._addBrick(.3, -.2 + yOffset, 0));
    bricks.add(this._addBrick(.6, -.2 + yOffset, 0));

    if (rotate)
      bricks.rotation.y += Math.PI/2;

    bricks.position.x += xOffset;
    bricks.position.z += zOffset;

    this.scene.add(bricks);
  }
}

class Library extends Room {
  constructor(scene, x, y, width, depth, height) {
    super(scene, x, y, width, depth, height);

    this._addBricks(x + 2, .3, this.minY);
    this._addBricks(x - 2, .8, this.minY);

    this._addBricks(x + 1.6, .3, this.maxY);
    this._addBricks(x - 2.7, .1, this.maxY);

    this._addBricks(this.minX, 1.3, y - .2, true);
    this._addBricks(this.minX, .3, y + 3, true);
    this._addBricks(this.minX, .1, y - 3.6, true);

    this._addBricks(this.maxX, .8, y - 1.2, true);
    this._addBricks(this.maxX, .1, y - 2.9, true);

    this._addDoor(x, this.minY);
  }

  _addBricks(xOffset, yOffset, zOffset, rotate) {
    var bricks = new THREE.Group();

    bricks.add(this._addBrick(0, 0 + yOffset, 0));
    bricks.add(this._addBrick(.6, 0 + yOffset, 0));
    bricks.add(this._addBrick(.9, 0 + yOffset, 0));

    bricks.add(this._addBrick(.15, -.1 + yOffset, 0));
    bricks.add(this._addBrick(.45, -.1 + yOffset, 0));
    bricks.add(this._addBrick(.75, -.1 + yOffset, 0));

    bricks.add(this._addBrick(0, -.2 + yOffset, 0));
    bricks.add(this._addBrick(.3, -.2 + yOffset, 0));
    bricks.add(this._addBrick(.6, -.2 + yOffset, 0));

    if (rotate)
      bricks.rotation.y += Math.PI/2;

    bricks.position.x += xOffset;
    bricks.position.z += zOffset;

    this.scene.add(bricks);
  }
}