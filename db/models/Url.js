const UrlModel = (sequelize, DataTypes) => {
  const Url = sequelize.define('Url', {
    urlCode: {
      type: DataTypes.STRING,
    },
    longUrl: {
      type: DataTypes.STRING,
    },
    shortUrl: {
      type: DataTypes.STRING,
    },
  });
  return Url;
};

module.exports = UrlModel;
