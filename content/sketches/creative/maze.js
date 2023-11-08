let instance = new p5(p => {
  const SCREEN_W = 800;
  const SCREEN_H = 600;

  const SIZE_X = 20;
  const SIZE_Y = 20;
  const WALL_SIZE = 2;

  let mazes;

  p.setup = () => {
    p.createCanvas(SCREEN_W, SCREEN_H);
    p.background(100);
    p.noLoop();

    _buildMazes();
  }

  p.draw = () => {
    p.stroke(0);
    p.noFill();
    p.background(100);
    p.text("Click to generate new mazes", 10, 20);

    p.translate(20, 30);

    mazes[0].draw();
    p.push();
    p.translate(p.width / 2, 0);
    mazes[1].draw();
    p.pop();
    p.push();
    p.translate(0, p.height / 2);
    mazes[2].draw();
    p.pop();
    p.push();
    p.translate(p.width / 2, p.height / 2);
    mazes[3].draw();
    p.pop();
  }

  p.mouseClicked = () => {
    _buildMazes();
    p.redraw();
  }

  function _buildMazes() {
    mazes = [];
    mazes.push(_createMaze(SIZE_X, SIZE_Y, p.width / 2.5, p.height / 2.5));
    mazes.push(_createMaze(SIZE_X, SIZE_Y, p.width / 2.5, p.height / 2.5));
    mazes.push(_createMaze(SIZE_X, SIZE_Y, p.width / 2.5, p.height / 2.5));
    mazes.push(_createMaze(SIZE_X, SIZE_Y, p.width / 2.5, p.height / 2.5));
  }

  function _createMaze(sizeX, sizeY, width, height) {
    p.randomSeed(Date.now());
    const maze = new MazeScript(sizeX, sizeY, width, height);

    // Entrance is on the left side
    maze.entranceX = 0;
    maze.entranceY = p.int(p.random(0, sizeY));
    // Exit is on the right side
    maze.exitX = sizeX - 1;
    maze.exitY = p.int(p.random(0, sizeY));

    const availableNodes = new Map();

    /*
     * Create unconnected nodes
     */

    for (let x = 0; x < maze.sizeX; x++) {
      for (let y = 0; y < maze.sizeY; y++) {
        const node = new Node(x, y);
        maze.add(node);
        availableNodes.set(node.key(), node);
      }
    }

    /*
     * Connect nodes using a modified Breadth-First Search Algorithm
     */

    let leaves = [maze.getEntrance()];

    while (availableNodes.size > 0) {
      const newLeaves = leaves
        .map(leave => {
          availableNodes.delete(leave.key());
          return _expandTree(leave);
        })
        .flat();
      leaves = _shuffle(newLeaves);
    }

    return maze;

    /*
     * Connect two cells, if possible
     */
    function _connectNode(node, x, y) {
      if (x < 0 || x >= sizeX ||
        y < 0 || y >= sizeY) {
        return null;
      }

      const key = _buildKey(x, y);
      if (!availableNodes.has(key)) {
        return null;
      }

      const connectedNode = availableNodes.get(key);
      node.connect(connectedNode);
      availableNodes.delete(key);
      return connectedNode;
    }

    /*
     * Expand tree by one arc
     */
    function _expandTree(node) {
      if (availableNodes.size === 0) {
        return;
      }

      const top = _connectNode(node, node.x, node.y - 1);
      const right = _connectNode(node, node.x + 1, node.y);
      const bottom = _connectNode(node, node.x, node.y + 1);
      const left = _connectNode(node, node.x - 1, node.y);

      // return new leaves
      return [top, right, bottom, left].filter(e => e !== null);
    }
  }

  function _buildKey(x, y) {
    return `${x}:${y}`;
  }

  function _shuffle(input) {
    const output = Array.from(input);
    for (let i = 0; i < output.length; i++) {
      const dest = Math.floor(Math.random() * output.length);
      const val = output[dest];
      output[dest] = output[i];
      output[i] = val;
    }
    return output;
  }

  class MazeScript {
    constructor(sizeX, sizeY, width, height) {
      this.sizeX = sizeX;
      this.sizeY = sizeY;
      this.width = width;
      this.height = height;
      this.nodes = new Map();
      this.entranceX = null;
      this.entranceY = null;
      this.exitX = null;
      this.exitY = null;
    }

    add(node) {
      this.nodes.set(node.key(), node);
    }

    getEntrance() {
      return this.getNode(this.entranceX, this.entranceY);
    }

    getExit() {
      return this.getNode(this.exitX, this.exitY);
    }

    getNode(x, y) {
      return this.nodes.get(_buildKey(x, y));
    }

    draw() {
      const minX = 0;
      const maxX = this.width;
      const minY = 0;
      const maxY = this.height;
      const lenX = (maxX - minX) / this.sizeX;
      const lenY = (maxY - minY) / this.sizeY;

      p.fill(255, 255, 255);
      p.stroke(255);

      for (let cell_x = 0; cell_x < this.sizeX; cell_x++) {
        const x = p.map(cell_x, 0, this.sizeX, minX, maxX);
        p.push();
        p.translate(x, 0);

        for (let cell_y = 0; cell_y < this.sizeY; cell_y++) {
          const node = this.getNode(cell_x, cell_y);
          const y = p.map(cell_y, 0, this.sizeY, minY, maxY);

          p.push();
          p.translate(0, y);

          // top wall
          if (!isAdjacent(this, node, cell_x, cell_y - 1)) {
            p.rect(0, 0, lenX, WALL_SIZE);
          }
          // right wall
          if (this.getExit() !== node && !isAdjacent(this, node, cell_x + 1, cell_y)) {
            p.rect(lenX, 0, WALL_SIZE, lenY);
          }
          // bottom wall
          if (!isAdjacent(this, node, cell_x, cell_y + 1)) {
            p.rect(0, lenY, lenX, WALL_SIZE);
          }
          // left wall
          if (this.getEntrance() !== node && !isAdjacent(this, node, cell_x - 1, cell_y)) {
            p.rect(0, 0, WALL_SIZE, lenY);
          }

          p.pop();
        }

        p.pop();
      }

      function isAdjacent(maze, fromNode, x, y) {
        if (x < 0 || x >= maze.sizeX ||
          y < 0 || y >= maze.sizeY) {
          return false;
        }
        const otherNode = maze.getNode(x, y);
        return fromNode.isConnected(otherNode);
      }
    }
  }

  class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.adjacentNodes = new Set();
    }

    key() {
      return _buildKey(this.x, this.y);
    }

    connect(node) {
      this.adjacentNodes.add(node.key());
      node.adjacentNodes.add(this.key());
    }

    isConnected(node) {
      return this.adjacentNodes.has(node.key());
    }

  }
});
