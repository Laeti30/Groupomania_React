module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('post', {
    // Clé primaire id généré automatiquement par sequelize
    // id: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   allowNull: false,
    // },
    author: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  })

  return Post
}
