<template>
  <div class="matrix-cmp">
    <div class="actions">
      <button @click.prevent="onNext">Next round</button>
    </div>
    <div class="matrix">
      <div v-for="(m, row) in matrix" class="row" :key="row">
        <Cell v-for="col in colsN" class="cell" :key="col">
          <span v-if="matrix[row] && isCell(matrix[row][col-1])"
            class="digit"
          >
            {{ matrix[row][col-1] }}
          </span>
          <span class="cleared" v-else-if="isCleared(row, col-1)">
            &bull;
          </span>
          <span class="clean" v-else></span>
        </Cell>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from '@/components/Cell'

export default {
  name: 'matrix',
  components: {
    Cell,
  },
  data () {
    return {
      colsN: 10,
      rowsN: 16,
      activePosition: [],
      matrix: [
        [0,1,2,3,4,5,6,7,8,9],
        [0,0,0,1,0,2,0,3,0,4],
      ],
    }
  },
  computed: {
    strain() {
      return this.matrix.reduce(
        (all, row) => all.concat(row.filter(col => this.isCell(col))),
        [],
      )
    }
  },
  methods: {
    onNext() {
      this.matrix = this.reproduce()
    },

    onGameOver(msg) {
      alert(msg)
    },

    reproduce() {
      const {matrix, strain, colsN, rowsN} = this
      const copy = matrix.map(row => row.slice())
      let currentRow = copy.length - 1
      let currentCol = copy[currentRow].length
      for (const cell of strain) {
        if (currentCol < colsN) {
          // just add to current
          copy[currentRow].push(cell)
          currentCol++
          continue
        }

        // switch to next row
        currentRow++
        if (rowsN && currentRow === rowsN) {
          this.onGameOver('FINITA!')
          break
        }

        copy[currentRow] = [cell]
        currentCol = 1
      }
      console.log(copy, strain)

      return copy
    },

    isCell(cell) {
      return cell || cell === 0
    },

    isCleared(row, col) {
      const rowsN = this.matrix.length
      return row + 1 < rowsN || (
        row + 1 === rowsN && col < this.matrix[row].length
      )
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.actions {
  padding: 20px;
}

.matrix {
  display: inline-block;
  border: 1px solid #999;
}
.row {
  display: flex;
  flex-direction: row;
  border-top: 1px solid #bbb;
}
.row:first-child {
  border: none;
}
.cell {
  border-left: 1px solid #bbb;
}
.cell:first-child {
  border: none;
}
.digit, .cleared, .clean {
  width: 50px;
  height: 50px;
}
.clean {
  display: block;
}
.digit, .cleared {
  display: flex;
  background: #333;
  color: #0f0;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}
</style>
