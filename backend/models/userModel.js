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
      defaultValue:
        'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZnVubnklMjBwcm9maWxlJTIwcGljdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  })

  return User
}
