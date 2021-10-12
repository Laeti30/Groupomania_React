module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    // Clé primaire id généré automatiquement par sequelize
    // userId: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   allowNull: false,
    // },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { is: /[a-z\-]{2,}/i },
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { is: /[a-z\-]{2,}/i },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
  })

  return User
}
