const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT
    //allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})

function generateSlug(title){
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}

Page.beforeValidate((pageInstance, options) => {
  pageInstance.slug = generateSlug(pageInstance.title)
})



const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = { db, User, Page };
