import utils from '@/utils/utils'

export default {
  data () {
    return {
      statusColumn: false,
      scoreColumn: false
    }
  },
  methods: {
    getACRate (ACCount, TotalCount) {
      return utils.getACRate(ACCount, TotalCount)
    },
    addStatusColumn (tableColumns, dataProblems) {
      // 已添加过直接返回
      if (this.statusColumn) return
      // 只在有做题记录时才添加column
      let needAdd = dataProblems.some((item, index) => {
        if (item.my_status !== null && item.my_status !== undefined) {
          return true
        }
      })
      if (!needAdd) {
        return
      }
      tableColumns.splice(0, 0, {
        width: 60,
        title: ' ',
        render: (h, params) => {
          let status = params.row.my_status
          if (status === null || status === undefined) {
            return undefined
          }
          return h('Icon', {
            props: {
              type: status === 0 ? 'checkmark-round' : 'minus-round',
              size: '16'
            },
            style: {
              color: status === 0 ? '#19be6b' : '#ed3f14'
            }
          })
        }
      })
      this.statusColumn = true
    },
    addScoreColumn (tableColumns, dataProblems) {
      if (this.scoreColumn) return
      let needAdd = dataProblems.some((item, index) => {
        if (item.my_score !== null && item.my_score !== undefined) {
          return true
        }
      })
      if (!needAdd) {
        return
      }
      tableColumns.splice(4, 0, {
        title: 'Score',
        'min-width': 100,
        'max-width': 200,
        render: (h, params) => {
          let score = params.row.my_score
          let totalScore = params.row.total_score
          if (score === null || score === undefined) {
            return undefined
          }
          let scoreColor = '#19be6b'
          if (score < 100 && score > 0) {
            scoreColor = '#ffc233'
          } else if (score === 0) {
            scoreColor = '#ed3f14'
          }
          let progressBar = h('div', {
            style: {
              'background-color': scoreColor,
              'border-radius': '10px',
              position: 'absolute',
              'z-index': 2,
              width: (score * 100 / totalScore).toString() + '%',
              'min-height': '100%'
            }
          })
          let progressBackground = h('div', {
            style: {
              'background-color': '#ff5050',
              'border-radius': '10px',
              position: 'absolute',
              width: '100%',
              'min-height': '100%'
            }
          })
          let scoreDisplay = h('div', {
            style: {
              textAlign: 'center',
              color: 'white',
              'font-weight': 'bold',
              position: 'absolute',
              'z-index': 3,
              width: '100%'
            }
          }, score.toString() + ' / ' + totalScore.toString())
          return h('div', {
            style: {
              height: '20px',
              position: 'relative',
              width: '100%'
            }
          }, [progressBar, progressBackground, scoreDisplay])
        }
      })
      this.scoreColumn = true
    }
  }
}
