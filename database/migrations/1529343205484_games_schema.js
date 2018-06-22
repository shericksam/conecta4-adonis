'use strict'

const Schema = use('Schema')

class GamesSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.integer("player1")
      table.integer("player2")
      table.integer("ganador")
      table.date("duracion")
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GamesSchema
