module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment', {
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  return Comment
}
