var Layer = function (options) {
  options = options || {};

  this.$ = document.createElement('canvas');
  this.ctx = this.$.getContext('2d');

  this.tilesetPath = options.tileset || 'img/terrain.png';
  this.tileSize = options.tileSize || 64;

  this.w = 50;
  this.h = 50;

  this.width = this.tileSize * this.w + this.tileSize;
  this.height = this.tileSize * (this.h / 2);

  this.init();
}

Layer.prototype.init = function () {
  this.tileset = new Image();
  this.tileset.src = this.tilesetPath;
  var that = this;
  this.tileset.onload = function () {
    that.ready();
    that.clear();
    that.renderMap();
  }
}

Layer.prototype.clear = function () {
  this.$.style.width = this.width;
  this.$.style.height = this.height;
  this.$.width = this.width;
  this.$.height = this.height;
}

Layer.prototype.ready = function () {
  console.log('ready');
}

Layer.prototype.drawMap = function () {
  this.ctx.putImageData(this.map, this.x, this.y);
}

Layer.prototype.getTileCoords = function (i) {
  var w = this.tileset.width;
  var h = this.tileset.height; 
  var pr = w / this.tileSize;
  var r = Math.floor(i / pr);
  var o = i - r * pr;
  var x = r * this.tileSize;
  var y = o * this.tileSize;
  return {
    x: y,
    y: x
  }
}

Layer.prototype.renderTile = function (t, x, y) {
  var _ = this.getTileCoords(t);
  var ts = this.tileSize;
  this.ctx.drawImage(this.tileset, _.x, _.y, ts, ts, x, y, ts, ts);
}

Layer.prototype.generateMap = function (x, y, r) {
  r = r || this.tileset.width * this.tileset.height / this.tileSize / this.tileSize;
  var map = [];
  for (var i = 0; i < y; i++) {
    var row = [];
    for (var j = 0; j < x; j++) {
      var z = Math.floor(Math.random() * r) + 1;
      row.push(z);
    }
    map.push(row);
  }
  return map;
}

Layer.prototype.renderMap = function () {
  var map = this.generateMap(this.w, this.h, 100);
  for (var i in map) {
    var o = (i % 2) * (this.tileSize / 2);
    for (var j in map[i]) {
      this.renderTile(map[i][j], this.tileSize * j + o, this.tileSize / 4 * i);
    }
  }
  //this.map = this.ctx.getImageData(0, 0, w * this.tileSize, h * this.tileSize);
  //this.clear();
  //this.drawMap();
}

Layer.prototype.test = function () {
  this.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";  
  this.ctx.fillRect(30, 30, 55, 50);
}

