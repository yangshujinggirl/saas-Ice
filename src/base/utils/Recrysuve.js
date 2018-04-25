export default function recrysuve(json, nodeId, key, objName, spe) {
  let node = null,
    zc = null,
    speArray = [],
    parentNode = null,
    resultarr = [];
  let getNode = (json, nodeId, key, objName, spe) => {
    for (let item of json) {
      if (node) break;
      let temp = item['' + objName + ''];
      item = item.value;
      item['' + objName + ''] = temp;
      if (!item || !item['' + key + '']) continue;
      if (item['' + key + ''] === nodeId) {
        if (item['' + spe + '']) {
          speArray = item['' + spe + '']
        }
        node = item
        break;
      } else {
        if (item['' + objName + ''] && item['' + objName + ''].length > 0) {
          parentNode = item
          getNode(item['' + objName + ''], nodeId, key, objName, spe)
        } else {
          continue
        }
      }
    }
    if (!node) parentNode = null;
    return {
      speArray: speArray,
      parentNode: parentNode,
      node: node
    }
  }
  let traverseTree = (json, nodeId, key, objName, spe) => {
    if (!json) {
      return;
    };

    node = null
    parentNode = 1
    zc = getNode(json, nodeId, key, objName, spe);
    if (zc.parentNode === null) return zc;
    if (zc.parentNode) {
      resultarr.unshift(zc)
      traverseTree(json, zc.parentNode['' + objName + ''], key, objName, spe)
    }
  }
  traverseTree(json, nodeId, key, objName, spe)
  return resultarr
}
