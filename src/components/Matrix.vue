<template>
  <section class="matrix-cmp">
    <header class="header">
      <div class="actions">
        <button @click.prevent="onRestart">Restart</button>
        <button @click.prevent="onNext">Next round</button>
      </div>
      <dl class="info">
        <dt>Sequence length:</dt>
        <dd>{{ this.curSequence.length }}</dd>
        <dt>Rows number:</dt>
        <dd>{{ matrix.length }}</dd>
        <dt>Max Size:</dt>
        <dd v-if="rowsN">{{ colsN }}×{{ rowsN }}</dd>
        <dd v-else>unlim</dd>
      </dl>
    </header>
    <article class="matrix">
      <div v-for="(m, row) in matrix" class="row" :key="row">
        <div v-for="col in colsN"
          :key="col"
          :class="['cell', clsCell([row, col-1])]"
          @click="onChoose([row, col-1])"
        >
          <span v-if="isCell([row, col-1])" class="symbol digit">
            {{ getCell([row, col-1]) }}
          </span>
          <span v-else-if="isCleared([row, col-1])" class="symbol cleared">
            &bull;
          </span>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'matrix',
  components: {
  },
  props: {
    colsN: {
      type: Number,
      default: 10,
    },
    rowsN: {
      type: Number,
      default: 16,
    },
    targetSum: {
      type: Number,
      default: 10,
    },
    sequence: {
      type: Array,
      default: () => [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        0, 0, 0, 1, 0, 2, 0, 3, 0, 4,
      ],
    },
  },
  data () {
    return {
      chained: [],
      matrix: this.fill([], this.sequence)
    }
  },
  computed: {
    curSequence() {
      return this.matrix.reduce(
        (all, row) => all.concat(row.filter(col => this.isAlive(col))),
        [],
      )
    },
  },
  watch: {
    matrix() {
      if (!this.hasSpace()) {
        this.onGameOver()
      }
    },
    curSequence(value) {
      if (value.length < 1) {
        this.onGameWon()
      }
    },
    chained(value) {
      if (value.length > 1) {
        this.onChained()
      }
    },
  },
  methods: {
    onChoose(coord) {
      if (!this.isCell(coord)) {
        return
      }

      if (this.isChained(coord)) {
        this.toggle('off', coord)
      }
      else {
        this.toggle('on', coord)
      }
    },

    onChained() {
      if (this.chained.length < 2) {
        return
      }

      const [left, right] = this.chained
      if (this.isChainablePair(left, right)) {
        const one = this.getCell(left)
        const two = this.getCell(right)
        if (one === two || (one + two) === this.targetSum) {
          // chained indeed
          this.destroy(...this.chained)
          return
        }
      }

      // keep only last then
      this.chained.splice(0, this.chained.length - 1)
    },

    onNext() {
      this.chained = []
      this.reproduce()
    },

    onRestart() {
      // just reset whole data
      // thx to https://github.com/vuejs/vue/issues/702#issuecomment-308991548
      Object.assign(this.$data, this.$options.data.apply(this))
    },

    onGameWon() {
      alert('WIN!')
    },

    onGameOver() {
      alert('FINITA!')
    },

    clsCell(coord) {
      const isDigit = this.isCell(coord)
      const isClean = !isDigit && this.isCleared(coord)
      const isEmpty = !isDigit && !isClean
      const isActive = !isEmpty && this.isChained(coord)
      return {
        'is-digit': isDigit,
        'is-clean': isClean,
        'is-empty': isEmpty,
        'is-active': isActive,
      }
    },

    toggle(onOff, ...coords) {
      if (!this.chained.length) {
        // short version
        onOff !== 'off' && this.chained.push(...coords)
        return this
      }

      const chained = this.chained.slice()
      for (const coord of coords) {
        const index = chained.findIndex(this._chainedMatcher(coord))
        if (~index && onOff !== 'on') {
          chained.splice(index, 1)
        }
        else if (!~index && onOff !== 'off') {
          chained.push(coord)
        }
      }

      this.chained = chained
      return this
    },

    process(...coords) {
      this.destroy(...(coords.length ? coords : this.chained))
      return this
    },

    destroy(...coords) {
      this.toggle('off', ...coords)

      this.matrix = this.matrix.map((row, idx) => {
        const seq = row.slice()

        for (const [row, col] of coords) {
          if (row === idx && this.isAlive(seq[col])) {
            seq[col] = null
          }
        }

        return seq
      })

      return this
    },

    reproduce() {
      this.matrix = this.fill(this.clone())
      return this
    },

    clone(matrix = this.matrix) {
      return Array.isArray(matrix) ? matrix.map(row => row.slice()) : []
    },

    fill(matrix, sequence = this.curSequence, colsN = this.colsN, rowsN = this.rowsN) {
      if (!matrix.length) {
        // we need at least one row to start
        matrix.push([])
      }

      let currentRow = matrix.length - 1
      let currentCol = matrix[currentRow].length
      for (const cell of sequence) {
        if (currentCol < colsN) {
          // just add to current
          matrix[currentRow].push(cell)
          currentCol++
          continue
        }

        // switch to next row
        currentRow++
        if (rowsN && currentRow === rowsN) {
          // no more space allowed
          break
        }

        matrix[currentRow] = [cell]
        currentCol = 1
      }

      return matrix
    },

    hasSpace() {
      if (!this.rowsN) {
        return true
      }
      const rowsN = this.matrix.length
      return rowsN < this.rowsN || (rowsN === this.rowsN && this.matrix[rowsN - 1].length < this.colsN)
    },

    getCell([row, col]) {
      return this.matrix[row] && this.isAlive(this.matrix[row][col]) ? Number(this.matrix[row][col]) : undefined
    },

    isAlive(cell) {
      return !!cell || cell === 0
    },

    isCell([row, col]) {
      return this.isAlive(this.getCell([row, col])) || false
    },

    isChainable(coord) {
      if (!this.chained.length) {
        // first one is always chainable
        return true
      }

      for (const [chRow, chCol] of this.chained) {
        if (this.isChainablePair(coord, [chRow, chCol])) {
          return true
        }
      }

      return false
    },

    isChainablePair([row1, col1], [row2, col2]) {
      if (row1 === row2 && col1 === col2) {
        // we can't chain a cell to itself
        return false
      }

      // we expect every cell is chainable to another if they both share a "clean path",
      // meaning, there are no other cells left between two of them
      // and path may go as long as needed horizontally, vertically or diagonally (at 45° exactly)
      if (row1 === row2) {
        // check every other col between two
        let col = Math.min(col1, col2) + 1
        for (; col < Math.max(col1, col2); col++) {
          if (this.isCell([row1, col])) {
            return false
          }
        }
        return true
      }

      if (col1 === col2) {
        // almost the same thing
        let row = Math.min(row1, row2) + 1
        for (; row < Math.max(row1, row2); row++) {
          if (this.isCell([row, col1])) {
            return false
          }
        }
        return true
      }

      // ok, let's try the hardest case
      if (Math.abs(row1 - row2) === Math.abs(col1 - col2)) {
        // confirmed on being on the same diagonal
        const rowSign = row1 < row2 ? 1 : -1
        const colSign = col1 < col2 ? 1 : -1
        let row = row1 + 1 * rowSign
        let col = col1 + 1 * colSign
        for (; rowSign > 0 && row < row2 || rowSign < 0 && row > row2; row += rowSign, col += colSign) {
          if (this.isCell([row, col])) {
            return false
          }
        }
        return true
      }

      return false
    },

    isChained(coord) {
      return this.chained.some(this._chainedMatcher(coord))
    },

    isCleared([row, col]) {
      const rowsN = this.matrix.length
      return row + 1 < rowsN || row + 1 === rowsN && col < this.matrix[row].length
    },

    _chainedMatcher([row, col]) {
      return ([chRow, chCol]) => chRow === row && chCol === col
    }
  },
}
</script>

<style scoped>
  @import "../utils/keyframes.css";

  .matrix-cmp {
    --border-width: 1px;
    --border-color: #999;
    --border-style: solid;
    --border: var(--border-width) var(--border-style) var(--border-color);
    --color: #0f0;
    --bg-color: #333;
    --hover-color: var(--color);
    --hover-bg-color: #666;
    --active-color: var(--color);
    --active-bg-color: var(--bg-color);

    --blink-color: #6f6;
    --blink-speed: 1s;
  }

  .actions {
    padding: 20px;
  }
  .info dt, .info dd {
    display: inline;
    margin: 0;
    list-style: none;
  }
  .info dd + dt::before {
    content: "| ";
    padding: 0 5px;
  }

  .matrix {
    display: inline-table;
  }
  .row {
    display: table-row;
  }
  .cell {
    display: table-cell;
    position: relative;
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-bottom: var(--border);
    border-right: var(--border);

    font-size: 2rem;
    font-weight: bold;
    cursor: default;
  }
  .row:first-child .cell {
    border-top: var(--border);
  }
  .cell:first-child {
    border-left: var(--border);
  }
  .cell.is-empty {
    border: none;
  }

  .cell.is-digit, .cell.is-clean {
    color: var(--color);
    background-color: var(--bg-color);
  }
  .cell.is-digit:hover {
    color: var(--hover-color);
    background-color: var(--hover-bg-color);
  }

  .cell.is-active {
    color: var(--active-color);
    background-color: var(--active-bg-color);
  }
  .cell.is-active::after {
    content: "";
    display: block;
    position: absolute;
    top: 1.1rem;
    left: calc(50% - .7rem);
    width: 1.4rem;
    height: 1.3em;
    background-color: var(--blink-color);

    animation: blink var(--blink-speed) step-end infinite;
  }

</style>
