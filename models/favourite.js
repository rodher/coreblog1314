
// Definicion del modelo Favourites:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Favourite',
      { best: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: { msg: "El campo best no puede estar vacío" },
                max:{args: 5,
                	msg: "El campo debe ser menor o igual que 5"},
				        min:{args: 1,
                	msg: "El campo debe ser mayor o igual que 1"},
                
            }
        }
      });
};
