'use strict'

const Schema = use('Schema')

class StatisticsSchema extends Schema {
  up () {
    this.create('statistics', (table) => {
      table.increments()
      table.integer("fk_user")
      table.integer("victorias")
      table.integer("derrotas")
      table.timestamps()
    })
  }

  down () {
    this.drop('statistics')
  }
}

module.exports = StatisticsSchema
