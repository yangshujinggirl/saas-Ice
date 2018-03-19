var Util = require('../util/index');
var Shape = require('../core/shape');
var Inside = require('./util/inside');

var Marker = function Marker(cfg) {
  Marker.superclass.constructor.call(this, cfg);
};

Marker.Symbols = {
  // 圆
  circle: function circle(x, y, r, ctx) {
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
  },

  // 正方形
  square: function square(x, y, r, ctx) {
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x - r, y + r);
    ctx.closePath();
  },

  // 菱形
  diamond: function diamond(x, y, r, ctx) {
    ctx.moveTo(x - r, y);
    ctx.lineTo(x, y - r);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x, y + r);
    ctx.closePath();
  },

  // 三角形
  triangle: function triangle(x, y, r, ctx) {
    var diffY = r * Math.sin(1 / 3 * Math.PI);
    ctx.moveTo(x - r, y + diffY);
    ctx.lineTo(x, y - diffY);
    ctx.lineTo(x + r, y + diffY);
    ctx.closePath();
  },

  // 倒三角形
  'triangle-down': function triangleDown(x, y, r, ctx) {
    var diffY = r * Math.sin(1 / 3 * Math.PI);
    ctx.moveTo(x - r, y - diffY);
    ctx.lineTo(x + r, y - diffY);
    ctx.lineTo(x, y + diffY);
    ctx.closePath();
  }
};

Marker.ATTRS = {
  path: null,
  lineWidth: 1
};

Util.extend(Marker, Shape);

Util.augment(Marker, {
  type: 'marker',
  canFill: true,
  canStroke: true,
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 1
    };
  },
  calculateBox: function calculateBox() {
    var attrs = this.__attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var r = attrs.radius;
    var lineWidth = this.getHitLineWidth();
    var halfWidth = lineWidth / 2 + r;
    return {
      minX: cx - halfWidth,
      minY: cy - halfWidth,
      maxX: cx + halfWidth,
      maxY: cy + halfWidth
    };
  },
  isPointInPath: function isPointInPath(x, y) {
    var attrs = this.__attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var r = attrs.radius;
    var lineWidth = this.getHitLineWidth();
    return Inside.circle(cx, cy, r + lineWidth / 2, x, y);
  },
  createPath: function createPath(context) {
    var attrs = this.__attrs;
    var x = attrs.x;
    var y = attrs.y;
    var r = attrs.radius;
    var symbol = attrs.symbol || 'circle';
    var method = void 0;
    if (Util.isFunction(symbol)) {
      method = symbol;
    } else {
      method = Marker.Symbols[symbol];
    }
    context.beginPath();
    method(x, y, r, context, this);
  }
});

module.exports = Marker;