'use strict';

const { Model, DataTypes } = require('sequelize');


module.exports = ( sequelize ) => {
    class Course extends Model {}
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "Title"'
                },
                notEmpty: {
                    msg: 'Please provide a value for "Title"'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Please provide a value for "Description"'
                },
                notEmpty: {
                msg: 'Please provide a value for "Description"'
                }
            }
        },
        estimatedTime: DataTypes.STRING,
        materialsNeeded: DataTypes.STRING
    }, { sequelize } );


  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'student', 
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }
    });
  };
  return Course;
};