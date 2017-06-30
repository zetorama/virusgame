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
        <dd>{{ colsN }}×{{ rowsN }}</dd>
      </dl>
    </header>
    <article class="matrix">
      <div v-for="(m, row) in matrix" class="row" :key="row">
        <div v-for="col in colsN"
          :key="col"
          :class="['cell', clsCell(row, col-1)]"
           @click="onChoose(row, col-1)"
        >
          <span v-if="isCellCoords(row, col-1)" class="symbol digit">
            {{ matrix[row][col-1] }}
          </span>
          <span v-else-if="isCleared(row, col-1)" class="symbol cleared">
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
      activeCoords: [],
      matrix: this.fill([], this.sequence)
    }
  },
  computed: {
    curSequence() {
      return this.matrix.reduce(
        (all, row) => all.concat(row.filter(col => this.isCell(col))),
        [],
      )
    },
  },
  watch: {
    curSequence(curSequence) {
      if (curSequence.length < 1) {
        this.onGameWon()
      }
    },
  },
  methods: {
    onChoose(row, col) {
      if (!this.isCellCoords(row, col)) {
        return
      }
      if (!this.activeCoords.length) {
        this.activeCoords = [row, col]
        return
      }

      if (!this.isActiveCoords(row, col)) {
        this.match(this.activeCoords, [row, col])
      }
      this.activeCoords = []
    },

    onNext() {
      this.activeCoords = []
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

    clsCell(row, col) {
      const isDigit = this.isCellCoords(row, col)
      const isClean = !isDigit && this.isCleared(row, col)
      const isEmpty = !isDigit && !isClean
      const isActive = !isEmpty && this.isActiveCoords(row, col)
      return {
        'is-digit': isDigit,
        'is-clean': isClean,
        'is-empty': isEmpty,
        'is-active': isActive,
      }
    },

    match([row1, col1], [row2, col2]) {
      this.destroy([row1, col1], [row2, col2])
      return this
    },

    destroy(...coords) {
      this.matrix = this.matrix.map((row, idx) => {
        const seq = row.slice()

        for (const [row, col] of coords) {
          if (row === idx && this.isCell(seq[col])) {
            seq[col] = null
          }
        }

        return seq
      })

      return this
    },

    reproduce() {
      this.matrix = this.fill(this.clone())
      if (!this.hasSpace()) {
        this.onGameOver()
      }
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

    isCell(cell) {
      return !!cell || cell === 0
    },

    isCellCoords(row, col) {
      return this.matrix[row] && this.isCell(this.matrix[row][col]) || false
    },

    isActiveCoords(row, col) {
      return row === this.activeCoords[0] && col === this.activeCoords[1]
    },

    isCleared(row, col) {
      const rowsN = this.matrix.length
      return row + 1 < rowsN || row + 1 === rowsN && col < this.matrix[row].length
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  font-size: 1.3rem;
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
