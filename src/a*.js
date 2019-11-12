
class AStar {
  constructor(options) {
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.height = options.height;
    this.width = options.width;
    this.$el = options.$el;
    this.hit = options.hit || false;
    this.diag = options.diag;
  }

  // async makePath() {
  //   let positions = [this.endPos];
  //   // debugger
  //   while (!positions.includes(this.startPos)) {
  //     positions.unshift(this.whoIsMyParentCoord(positions[0]));
  //   }
  //   for (let i = 0; i < positions.length; i++) {
  //     const pos = positions[i];
  //     await this.sleep(25).then(() => {
  //       $(`li[pos='${pos[0]},${pos[1]}']`)
  //         .addClass("path")
  //         .append(
  //           '<p class="message">' +
  //             $(`li[pos='${pos[0]},${pos[1]}']`).data().dist +
  //             "</p>"
  //         );
  //     });
  //   }
  // }
  whoIsMyParent(pos) {
    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
    return $(`li[pos='${parent[0]},${parent[1]}']`);
  }
  whoIsMyParentCoord(pos) {
    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
  }
  distFromEnd(pos) {
    let x = pos[0] < this.endPos[0] ? this.endPos[0] - pos[0] : pos[0] - this.endPos[0]
    let y = pos[1] < this.endPos[1] ? this.endPos[1] - pos[1] : pos[1] - this.endPos[1]
    return x + y
  }

  searchCheck(pos, target) {
    return pos[0] === target[0] && pos[1] === target[1];
  }
  ///recv
  async search(pos, target) {
    let queue = [pos];

    while (!this.hit) {
      let currPos = queue.shift();
      if (this.searchCheck(currPos, target)) {
        this.hit = true;
      } else {
        let positions = this.neighbors(currPos);
        // await this.sleep(15).then(() => {
        // });
            $(`li[pos='${currPos[0]},${currPos[1]}']`)
              .data("children", positions)
              .append(
                '<p class="message">' +
                  (this.distFromEnd(currPos) - $(`li[pos='${currPos[0]},${currPos[1]}']`).data().dist
                  ) +
                  "</p>"
                // - this.distFromEnd(currPos))
              );

        queue = queue.concat(positions);
      }
    }
    // this.makePath();
  }
  validMoves(pos) {
    return (
      pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width
    );
  }

  neighbors(pos) {
    let moves;
    this.diag === true
      ? (moves = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1]
        ]) //diag but iffy, need to fix edge cases that allow wall hopping
      : (moves = [[0, 1], [0, -1], [1, 0], [-1, 0]]); //non diag;

    let neighbors = [];

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const neighbor = [pos[0] + move[0], pos[1] + move[1]];
      if (
        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("wall") &&
        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("visited") &&
        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("frog") &&
        this.validMoves(neighbor)
      ) {
        neighbors.push(neighbor);
        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)
          .data("class", "visited")
          .addClass("visited")
          .data("parent", pos)
          .data("dist", this.whoIsMyParent(neighbor).data().dist + 1);
      }
    }
    return neighbors;
  }
}

export default AStar;