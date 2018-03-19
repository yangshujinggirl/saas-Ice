var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var atan2 = Math.atan2;
var DEFAULT_LENGTH = 10;
var DEFAULT_ANGLE = PI / 3;

function _addArrow(ctx, attrs, x1, y1, x2, y2) {
  var leftX = void 0;
  var leftY = void 0;
  var rightX = void 0;
  var rightY = void 0;
  var offsetX = void 0;
  var offsetY = void 0;
  var angle = void 0;

  if (!attrs.fill) {
    // 闭合的不绘制箭头
    var arrowLength = attrs.arrowLength || DEFAULT_LENGTH;
    var arrowAngle = attrs.arrowAngle ? attrs.arrowAngle * PI / 180 : DEFAULT_ANGLE; // 转换为弧度

    // Calculate angle
    angle = atan2(y2 - y1, x2 - x1);
    // Adjust angle correctly
    angle -= PI;
    // Calculate offset to place arrow at edge of path
    offsetX = attrs.lineWidth * cos(angle);
    offsetY = attrs.lineWidth * sin(angle);

    // Calculate coordinates for left half of arrow
    leftX = x2 + arrowLength * cos(angle + arrowAngle / 2);
    leftY = y2 + arrowLength * sin(angle + arrowAngle / 2);
    // Calculate coordinates for right half of arrow
    rightX = x2 + arrowLength * cos(angle - arrowAngle / 2);
    rightY = y2 + arrowLength * sin(angle - arrowAngle / 2);

    // Draw left half of arrow
    ctx.moveTo(leftX - offsetX, leftY - offsetY);
    ctx.lineTo(x2 - offsetX, y2 - offsetY);
    // Draw right half of arrow
    ctx.lineTo(rightX - offsetX, rightY - offsetY);

    // Visually connect arrow to path
    ctx.moveTo(x2 - offsetX, y2 - offsetY);
    ctx.lineTo(x2 + offsetX, y2 + offsetY);
    // Move back to end of path
    ctx.moveTo(x2, y2);
  }
}

module.exports = {
  addStartArrow: function addStartArrow(ctx, attrs, x1, y1, x2, y2) {
    if (attrs.startArrow) {
      _addArrow(ctx, attrs, x1, y1, x2, y2);
    }
  },
  addEndArrow: function addEndArrow(ctx, attrs, x1, y1, x2, y2) {
    if (attrs.endArrow) {
      _addArrow(ctx, attrs, x1, y1, x2, y2);
    }
  }
};