

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