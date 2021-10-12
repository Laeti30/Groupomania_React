module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('post', {
    // Clé primaire id généré automatiquement par sequelize
    // id: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   allowNull: false,
    // },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
  })

  return Post
}
