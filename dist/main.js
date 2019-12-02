/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BFS.js":
/*!********************!*\
  !*** ./src/BFS.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass BFS{\n  constructor(options){\n    this.startPos = options.startPos;\n    this.endPos = options.endPos;\n    this.height = options.height;\n    this.width = options.width;\n    this.$el = options.$el;\n    this.hit = options.hit || false;\n    // this.diag = options.diag;\n  }\n\n  async makePath(){\n    let positions = [this.endPos]\n    // debugger\n    while(!positions.includes(this.startPos)){\n      positions.unshift(this.whoIsMyParentCoord(positions[0]))\n    }\n    for (let i = 0; i < positions.length; i++) {\n      const pos = positions[i];\n      await this.sleep(25).then(() => {\n        $(`li[pos='${pos[0]},${pos[1]}']`).addClass(\"path\")\n          .append('<p class=\"message\">' + $(`li[pos='${pos[0]},${pos[1]}']`).data().dist + '</p>')\n      })\n    }\n  }\n  whoIsMyParent(pos){\n    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n    return $(`li[pos='${parent[0]},${parent[1]}']`)\n  }\n  whoIsMyParentCoord(pos) {\n    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n  }\n\n  searchCheck(pos, target){\n    return (pos[0] === target[0] && pos[1] === target[1]);\n  }\n\n  async search(pos, target) {\n    debugger\n    let queue = [pos]\n\n    while (!this.hit){\n      let currPos = queue.shift();\n      if (this.searchCheck(currPos, target)) {\n        this.hit = true;\n      }else{\n        let positions = this.neighbors(currPos)\n        await this.sleep(15).then(() => {\n          $(`li[pos='${currPos[0]},${currPos[1]}']`).data(\"children\", positions);\n        });\n     \n        queue = queue.concat(positions);\n      }\n    }\n    this.makePath()\n  }\n  \n  validMoves(pos){\n    return (pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width)\n  }\n  sleep(time) {\n    return new Promise((resolve) => setTimeout(resolve, time));\n  }\n  neighbors(pos){\n    let moves = [[0, 1], \n      [0, -1], [1, 0], \n      [-1, 0], [1, 1], \n      [-1, -1], [1, -1], \n      [-1, 1]]\n    let neighbors = [];\n    for (let i = 0; i < moves.length; i++) {\n      const move = moves[i]\n      const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n      if (!$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"wall\") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"visited\") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"frog\")&& this.validMoves(neighbor)){\n        neighbors.push(neighbor)\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)\n          .data(\"class\", \"visited\")\n          .addClass(\"visited\")\n          .data(\"parent\", pos).data(\"dist\", (this.whoIsMyParent(neighbor).data().dist + 1))\n      }\n    }\n    return neighbors;\n  }\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BFS);\n\n//# sourceURL=webpack:///./src/BFS.js?");

/***/ }),

/***/ "./src/a*.js":
/*!*******************!*\
  !*** ./src/a*.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile_node */ \"./src/tile_node.js\");\n\n// import PathMaker from \"./pathmaker\";\n\nclass AStar {\n  constructor(options) {\n    this.startPos = options.startPos;\n    this.endPos = options.endPos;\n    this.height = options.height;\n    this.width = options.width;\n    this.$el = options.$el;\n    this.hit = options.hit || false;\n    this.diag = options.diag;\n    this.visitArr = [this.startPos]\n  }\n  async makePath(){\n    let positions = [this.endPos]\n    // debugger\n    while(!positions.includes(this.startPos)){\n      positions.unshift(this.whoIsMyParentCoord(positions[0]))\n    }\n    for (let i = 0; i < positions.length; i++) {\n      const pos = positions[i];\n      await this.sleep(40).then(() => {\n        $(`li[pos='${pos[0]},${pos[1]}']`).addClass(\"path\")\n          // .append('<p class=\"message\">' + $(`li[pos='${pos[0]},${pos[1]}']`).data().dist + '</p>')\n      })\n    }\n  }\n  async vistedSearch(start, target){\n    // debugger\n    let queue = [start]\n    while (!this.hit) {\n      let currPos = queue.shift();\n      if (this.searchCheck(currPos, target)) {\n        this.hit = true;\n      } else {\n        let positions = this.visitedNeighbors(currPos);\n\n        $(`li[pos='${currPos[0]},${currPos[1]}']`).data(\"children\", positions);\n        queue = queue.concat(positions);\n      }\n    }\n    this.makePath()\n  }\n  visitedNeighbors(pos){\n    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]]\n    let neighbors = moves\n      .map(move => [move[0] + pos[0], move[1] + pos[1]])\n      .filter(\n        os =>\n          $(`li[pos='${os[0]},${os[1]}']`).hasClass(\"visited\") &&\n          !$(`li[pos='${os[0]},${os[1]}']`).hasClass(\"prescan\")\n      );\n      neighbors.forEach(neighbor => {\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)\n          .addClass(\"prescan\")\n          .data(\"parent\", pos)\n          .data(\"dist\", (this.whoIsMyParent(neighbor).data().dist + 1))\n      })\n    return neighbors;\n  }\n\n  whoIsMyParent(pos) {\n    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n    return $(`li[pos='${parent[0]},${parent[1]}']`);\n  }\n  whoIsMyParentCoord(pos) {\n    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n  }\n\n  searchCheck(pos, target) {\n    return pos[0] === target[0] && pos[1] === target[1];\n  }\n  compareOperator(curr, targ) {\n    return targ > curr ? 1 : curr > targ ? -1 : 0;\n  }\n  bestDirection(pos) {\n    // debugger\n    if (pos === undefined) {\n      return [-1, -1];\n    }\n    let target0 = this.endPos[0];\n    let target1 = this.endPos[1];\n    return [\n      this.compareOperator(pos[0], target0),\n      this.compareOperator(pos[1], target1) \n    ];\n\n  }\n  bestDirectionSpot(pos) {\n    let bestDirection = this.bestDirection(pos)\n    let spot = [pos[0] + bestDirection[0], pos[1] + bestDirection[1]];\n    // if(!this.validMoves(spot)) {spot = this.secondBestSpot(pos)}\n    return spot\n  }\n  secondBestSpot(pos) {\n    let hash = {}\n    this.softNeighbors(pos).forEach(os => hash[this.closeness(os)] = os)\n    return Object.values(hash)[0]\n  }\n  lineSearch(currPos) {\n    let nextPos = this.bestDirectionSpot(currPos);\n    if (!this.validMoves(nextPos)){\n      nextPos = this.secondBestSpot(currPos)\n    }\n    while(!$(`li[pos='${nextPos[0]},${nextPos[1]}']`).hasClass(\"wall\")){\n      // debugger\n\n        $(`li[pos='${nextPos[0]},${nextPos[1]}']`)\n          .data(\"class\", \"visited\")\n          .addClass(\"visited\")\n        this.visitArr.push(nextPos)\n        if(this.searchCheck(nextPos, this.endPos)){\n          this.hit = true\n          return;\n        }\n        nextPos = this.bestDirectionSpot(nextPos)\n    }\n  }\n\n  spotNeighbors(pos) {\n    let output = [];\n    let moves = [\n      [0, 1],\n      [0, -1],\n      [1, 0],\n      [-1, 0],\n      [1, 1],\n      [-1, -1],\n      [1, -1],\n      [-1, 1]\n    ];\n    moves.forEach(dir => {\n      let newPos = [pos[0] + dir[0], pos[1] + dir[1]];\n      if (\n        !$(`li[pos='${newPos[0]},${newPos[1]}']`).hasClass(\"visited\") &&\n        !$(`li[pos='${newPos[0]},${newPos[1]}']`).hasClass(\"frog\") &&\n        this.validMoves(newPos)\n      ) {\n        output.push(newPos);\n      }\n    });\n    return output;\n  }\n  closeness(pos) {\n    return (\n      Math.abs(this.endPos[0] - pos[0]) + Math.abs(this.endPos[1] - pos[1])\n    );\n  }\n  xDiff(pos) {\n    return Math.abs(Math.abs(this.endPos[1] - pos[1]))\n  }\n  yDiff(pos) {\n    return Math.abs(Math.abs(this.endPos[1] - pos[1]))\n  }\n  closest(){\n    let output = {}\n    this.edgeVisted().forEach(pos =>  {\n      output[this.closeness(pos)] = pos;\n    })\n    let best = parseInt(Object.keys(output)[0])\n    let answer = this.edgeVisted().filter(pos => this.closeness(pos) === best);\n    // debugger\n    return answer\n\n  }\n  async search(currPos, target) {\n\n    while (!this.hit) {\n      this.lineSearch(currPos)\n      this.searchGrow();\n      currPos = this.closestCheck();\n    }\n    for (let i = 0; i < this.visitArr.length; i++) {\n      const pos = this.visitArr[i];\n      // debugger\n      await this.sleep(40).then(() => { \n        $(`li[pos='${pos[0]},${pos[1]}']`)\n          .data(\"class\", \"colored\")\n          .addClass(\"colored\")\n      })\n    }\n\n    console.log(\"hit\");\n    this.hit = false;\n    this.vistedSearch(this.startPos, this.endPos)\n  }\n\n\n  closestCheck(){\n    if(this.hit) {return}\n\n    this.closest().forEach(pos => {\n      this.softNeighbors(pos).forEach(os => {\n        $(`li[pos='${os[0]},${os[1]}']`)\n          .data(\"class\", \"visited\")\n          .addClass(\"visited\");\n        this.visitArr.push(os);\n      })\n    })\n    let ss = {}\n    this.closest().forEach(pos => {\n      this.softNeighbors(pos).forEach(os => { \n        ss[this.closeness(os)] = os ;\n      }) \n    })\n    let best = Object.values(ss)[0];\n       $(`li[pos='${best[0]},${best[1]}']`)\n         .data(\"class\", \"visited\")\n         .addClass(\"visited\");\n        this.visitArr.push(best);\n\n    return best;\n\n  }\n  softNeighbors(pos){\n    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]]\n\n    let neighbors = [];\n    for (let i = 0; i < moves.length; i++) {\n      const move = moves[i];\n      const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n      if (\n        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"visited\") &&\n        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"frog\") &&\n        this.validMoves(neighbor)\n      ) {\n        neighbors.push(neighbor);\n      }\n    }\n\n    return neighbors \n  }\n  searchGrow() {\n    if(this.hit) {return}\n    let nodesToSearch = this.edgeVisted();\n\n    nodesToSearch.forEach(pos => {\n      // debugger\n      this.neighbors(pos)\n    });\n  }\n\n  validMoves(pos) {\n    return (\n      pos[0] >= 0 &&\n      pos[0] < this.height &&\n      pos[1] >= 0 &&\n      pos[1] < this.width &&\n      !$(`li[pos='${pos[0]},${pos[1]}']`).hasClass(\"wall\")\n    );\n  }\n  sleep(time) {\n    return new Promise(resolve => setTimeout(resolve, time));\n  }\n  visited(){\n    return $(\"li.visited\")\n      .toArray()\n      .map(li =>\n        li.attributes[0].nodeValue.split(\",\").map(num => parseInt(num))\n      );\n  }\n  amIedge(pos){\n    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]]\n    return !moves\n      .map(move => [move[0] + pos[0], move[1] + pos[1]])\n      .every(move =>\n        $(`li[pos='${move[0]},${move[1]}']`).hasClass(\"visited\") ||\n        !this.validMoves(move)\n      );\n  }\n  edgeVisted(){\n    let output = this.visited().filter(pos => this.amIedge(pos))\n    return output;\n  }\n  neighbors(pos) {\n    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]]\n\n    let neighbors = [];\n    for (let i = 0; i < moves.length; i++) {\n      const move = moves[i];\n      const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n      if (\n        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"visited\") &&\n        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"frog\") &&\n        this.validMoves(neighbor)\n      ) {\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)\n          .data(\"class\", \"visited\")\n          .addClass(\"visited\");\n        this.visitArr.push(neighbor)\n        neighbors.push(neighbor);\n      }\n    }\n\n    return neighbors\n  }\n  // OLDneighbors(pos) {\n  //   let moves = [\n  //     [0, 1],\n  //     [0, -1],\n  //     [1, 0],\n  //     [-1, 0]\n  //   ]; //non diag;\n\n  //   let neighbors = [];\n\n  //   for (let i = 0; i < moves.length; i++) {\n  //     const move = moves[i];\n  //     const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n  //     if (\n  //       !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"visited\") &&\n  //       !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"frog\") &&\n  //       this.validMoves(neighbor)\n  //     ) {\n  //       neighbors.push(neighbor);\n  //       $(`li[pos='${neighbor[0]},${neighbor[1]}']`)\n  //         .data(\"class\", \"visited\")\n  //         .addClass(\"visited\")\n  //         .data(\"parent\", pos)\n  //         .data(\"dist\", this.whoIsMyParent(neighbor).data().dist + 1);\n  //     }\n  //   }\n  //   return neighbors;\n  // }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AStar);\n\n\n//# sourceURL=webpack:///./src/a*.js?");

/***/ }),

/***/ "./src/dijkstra.js":
/*!*************************!*\
  !*** ./src/dijkstra.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile_node */ \"./src/tile_node.js\");\n\n\nclass Dijkstra{\n  constructor(options){\n    this.startPos = options.startPos;\n    this.endPos = options.endPos;\n    this.height = options.height;\n    this.width = options.width;\n    this.$el = options.$el;\n    this.hit = options.hit || false;\n    this.diag = options.diag;\n    this.visitArr = [this.startPos];\n\n  }\n\n  async makePath(){\n    let positions = [this.endPos]\n    // debugger\n    while(!positions.includes(this.startPos)){\n      positions.unshift(this.whoIsMyParentCoord(positions[0]))\n    }\n    for (let i = 0; i < positions.length; i++) {\n      const pos = positions[i];\n      await this.sleep(25).then(() => {\n        $(`li[pos='${pos[0]},${pos[1]}']`).addClass(\"path\")\n      })\n    }\n  }\n  whoIsMyParent(pos){\n    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n    return $(`li[pos='${parent[0]},${parent[1]}']`)\n  }\n  whoIsMyParentCoord(pos) {\n    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n  }\n\n  searchCheck(pos, target){\n    return (pos[0] === target[0] && pos[1] === target[1]);\n  }\n\n  async search(pos, target) {\n    let queue = [pos]\n\n    while (!this.hit){\n      let currPos = queue.shift();\n      if (this.searchCheck(currPos, target)) {\n        this.hit = true;\n      }else{\n        let positions = this.neighbors(currPos)\n        \n        $(`li[pos='${currPos[0]},${currPos[1]}']`).data(\"children\", positions);\n        queue = queue.concat(positions);\n      }\n    }\n    for (let i = 0; i < this.visitArr.length; i++) {\n      const pos = this.visitArr[i];\n      await this.sleep(40).then(() => {\n        $(`li[pos='${pos[0]},${pos[1]}']`)\n          .data(\"class\", \"colored\")\n          .addClass(\"colored\");\n      });\n    }\n    this.makePath()\n  }\n\n  \n  validMoves(pos){\n    return (pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width)\n  }\n  sleep(time) {\n    return new Promise((resolve) => setTimeout(resolve, time));\n  }\n  neighbors(pos){\n    let moves;\n    (this.diag === true) ?\n      moves = [[0, 1], \n      [0, -1], [1, 0], \n      [-1, 0], [1, 1], \n      [-1, -1], [1, -1], \n      [-1, 1]] //diag but iffy, need to fix edge cases that allow wall hopping \n    :\n      moves = [[0, 1], [0, -1], \n      [1, 0], [-1, 0]];//non diag;\n    \n    let neighbors = []\n    \n    for (let i = 0; i < moves.length; i++) {\n      const move = moves[i]\n      const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n      if (!$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"wall\") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"visited\") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"frog\")&& this.validMoves(neighbor)){\n        neighbors.push(neighbor)\n        this.visitArr.push(neighbor)\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)\n          .data(\"class\", \"visited\")\n          .addClass(\"visited\")\n          .data(\"parent\", pos).data(\"dist\", (this.whoIsMyParent(neighbor).data().dist + 1))\n      }\n    }\n    return neighbors;\n  }\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dijkstra);\n\n//# sourceURL=webpack:///./src/dijkstra.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_app_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main_app_logic */ \"./src/main_app_logic.js\");\n/* harmony import */ var _main_app_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main_app_view */ \"./src/main_app_view.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  // console.log(\"working\")\n  // const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  // canvasEl.width = MainAppLogic.DIM_X;\n  // canvasEl.height = MainAppLogic.DIM_Y;\n\n  const ctx = $('.pathfinder');\n  const mainApp = new _main_app_logic__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  window.mainApp = mainApp;\n  new _main_app_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"](mainApp, ctx);\n  // const game = new Game();\n  // window.game = game;\n  // new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/main_app_logic.js":
/*!*******************************!*\
  !*** ./src/main_app_logic.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MainAppLogic {\n  constructor() {\n    this.tiles = []\n\n  }\n\n\n\n\n\n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainAppLogic);\n\n//# sourceURL=webpack:///./src/main_app_logic.js?");

/***/ }),

/***/ "./src/main_app_view.js":
/*!******************************!*\
  !*** ./src/main_app_view.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dijkstra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dijkstra */ \"./src/dijkstra.js\");\n/* harmony import */ var _BFS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BFS */ \"./src/BFS.js\");\n/* harmony import */ var _a___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./a* */ \"./src/a*.js\");\n\n\n\n// import PathMaker from \"./pathmaker\"\n\n\n\nclass MainAppView {\n  constructor(appLogic, $el) {\n    this.appLogic = appLogic;\n    this.$el = $el;\n    this.helDown = false;\n    this.over = false;\n    this.height = 20;\n    this.width = 40;\n    this.diag = false;\n    this.draw = true\n    //testing \n    //add frogs finish and dijkstra when you can\n    this.makeGrid();\n    this.addFrog([9, 10]);\n    this.addFinish([9, 30]);\n    this.bindEvents();\n\n\n  }\n  bindEvents() {\n    // install a handler on the `li` elements inside the board.\n    //tests click and logs position and info \n    this.$el.on(\"click\", \"li\", event => {\n      // console.log($(event.currentTarget).data().pos)\n      console.log($(event.currentTarget).data())\n      console.log((event.currentTarget))\n\n    })\n    //changes heldown boolean, useful for creating walls\n    this.$el.on(\"mousedown\", \"li\", event => {\n      this.helDown = true\n    })\n    this.$el.on(\"mouseup\", \"li\", event => {\n      this.helDown = false\n    })\n    //draws walls and removes\n    this.$el.on(\"mouseenter\", \"li\", (event => {\n      // debugger\n      this.drawErase(event.currentTarget)\n      this.over = true\n    }));\n    this.$el.on(\"mouseleave\", \"li\", event => {\n      this.over = false;\n    })\n    //places frogs also deletes, ideally I could replace that with drag and drop\n    //but thats hard as of now\n    //NOTES: PLACEMENT WORKS HOWEVER still need to limit amount for now,\n    // \n\n    this.$el.on(\"dblclick\", \"li\", event => {\n      if (event.shiftKey){\n        if ($(event.currentTarget).data().class === \"finish\") {\n          $(event.currentTarget).removeClass(\"finish\").data(\"class\", \"blank\");\n        } else {\n          let pos = $(event.currentTarget).data().pos\n          this.addFinish(pos);\n        }\n      } else{\n        if ($(event.currentTarget).data().class === \"frog\") {\n          $(event.currentTarget).removeClass(\"frog visited\").data(\"class\", \"blank\");\n        } else {\n          let pos = $(event.currentTarget).data().pos\n          this.addFrog(pos);\n        }\n      }\n    })\n    const that = this;\n    // this.dijkstra([9, 10])\n\n    $(\".clear\").click(function(e){\n      // debugger\n      for (let rowIdx = 0; rowIdx < that.height; rowIdx++) {\n        for (let coldIdx = 0; coldIdx < that.width; coldIdx++) {\n          $(`li[pos='${rowIdx},${coldIdx}']`)\n          .removeClass(\"visited wall path frog finish colored scanned prescan\")\n          .addClass(\"blank\")\n          .removeData(\"dist children parent colored class scanned\")\n          .empty()\n          that.addFrog([9, 10]);\n          that.addFinish([9, 30]);\n        }\n      }\n    })\n    $(\".clearPath\").click(function(e) {\n      // debugger\n      for (let rowIdx = 0; rowIdx < that.height; rowIdx++) {\n        for (let coldIdx = 0; coldIdx < that.width; coldIdx++) {\n          if (!$(`li[pos='${rowIdx},${coldIdx}']`).hasClass(\"wall\") ||\n              !$(`li[pos='${rowIdx},${coldIdx}']`).hasClass(\"finish\") ||\n              !$(`li[pos='${rowIdx},${coldIdx}']`).hasClass(\"frog\")){\n                $(`li[pos='${rowIdx},${coldIdx}']`)\n                  .removeClass(\"visited path colored scanned prescan\")\n                  .addClass(\"blank\")\n                  .removeData(\"dist children parent colored class scanned\")\n                  .empty();\n              }\n        }\n      }\n    });\n    // $(\".diag\").click(function (e) {\n    //   if(that.diag === false){\n    //     that.diag = true\n    //     $(\".diag\").empty().append(\"Diagonal On\");\n    //   }else{\n    //     that.diag = false\n    //     $(\".diag\").empty().append(\"Diagonal Off\");\n    //   }\n    //   console.log(that.diag);\n    // })\n\n    $(\".Dijkstra\").click(function(e){\n      that.dijkstra();\n    })\n    $(\".AStar\").click(function(e) {\n      that.aStar();\n    });\n    $(\".BFS\").click(function(e) {\n      that.bfs();\n    });\n    $(\".DrawErase\").click(function(e){\n      if(that.draw){\n        $(\".DrawErase\").empty().append(\"Draw / <b>Erase<b>\")\n        that.draw = false\n      }else{\n        $(\".DrawErase\").empty().append(\"<b>Draw</b> / Erase\")\n        that.draw = true\n      }\n    });\n\n    // $(\".PathMaker\").click(function(e) {\n    //   that.pathMaker();\n    // });\n\n\n    \n    // console.log(event.currentTarget.className)\n  }\n  addPath(pos){\n    $(`li[pos='${pos[0]},${pos[1]}']`)\n      .addClass(\"path\")\n      .data(\"class\", \"path\");\n  }\n\n  addFrog(pos) {\n    $(`li[pos='${pos[0]},${pos[1]}']`)\n      .addClass(\"frog\")\n      .addClass(\"special\")\n      .addClass(\"visited\")\n\n      .data(\"class\", \"frog\")\n      .data(\"dist\", 0);\n  }\n  addFinish(pos) {\n    $(`li[pos='${pos[0]},${pos[1]}']`)\n      .addClass(\"finish\")\n      .addClass(\"special\")\n      .data(\"class\", \"finish\")\n      .data(\"scanDist\", 0);\n\n\n  }\n  //testing\n  dijkstra(){\n\n    let start = $(\".frog\").data().pos\n    let end = $(\".finish\").data().pos\n    let dijkstra = new _dijkstra__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ startPos: start, endPos: end, width: this.width, height: this.height, $el: this.$el, diag: this.diag})\n    return dijkstra.search(start, end);\n\n  }\n  bfs(){\n\n    let start = $(\".frog\").data().pos\n    let end = $(\".finish\").data().pos\n    let bfs = new _BFS__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ startPos: start, endPos: end, width: this.width, height: this.height, $el: this.$el, diag: this.diag})\n\n    return bfs.search(start, end);\n\n  }\n  aStar(){\n    let start = $(\".frog\").data().pos\n    let end = $(\".finish\").data().pos\n    let aStar = new _a___WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ startPos: start, endPos: end, width: this.width, height: this.height, $el: this.$el, diag: this.diag})\n    return aStar.search(start, end);\n  }\n\n  drawErase(eventTarget){\n    if (this.helDown && !$(eventTarget).hasClass(\"special\")) {\n      this.draw ?\n      $(eventTarget).addClass(\"wall\")\n        .data(\"class\", \"wall\")\n      :\n      $(eventTarget).removeClass(\"wall\")\n        .data(\"class\", \"blank\");\n\n    } \n    \n    // else if (this.helDown && ($(eventTarget).hasClass(\"wall\"))) {\n    //   $(eventTarget).removeClass(\"wall\")\n    //     .data(\"class\", \"blank\");\n\n    //   // $(eventTarget).data().node.value = null;\n    // }\n  }\n  makeGrid() {\n    //creates the grid\n    const $ul = $(\"<ul>\")\n    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {\n      for (let coldIdx = 0; coldIdx < this.width; coldIdx++) {\n        let $li = $(\"<li>\");\n        // let node = new TileNode({ pos: [rowIdx, coldIdx] })\n        $li.attr(\"pos\", [rowIdx, coldIdx])\n          .data(\"pos\", [rowIdx, coldIdx])\n          .data(\"class\", \"blank\")\n        $ul.append($li);\n        // console.log($li.data())\n      }\n    }\n    this.$el.append($ul);\n  }\n  addClear() {\n    const $button = $(\"<button>\")\n    this.$el.append($button);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainAppView);\n\n//# sourceURL=webpack:///./src/main_app_view.js?");

/***/ }),

/***/ "./src/tile_node.js":
/*!**************************!*\
  !*** ./src/tile_node.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass TileNode{\n  constructor(options){\n    \n    this.pos = options.pos;\n    this.value = options.value || null;\n    this.parents = options.parents || null;\n    this.children = options.children || [];\n  }\n  \n \n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TileNode); \n\n//# sourceURL=webpack:///./src/tile_node.js?");

/***/ })

/******/ });