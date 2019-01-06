const { dbPool } = require('./config-db.js');

class Model {
  constructor(tableName, connection = dbPool) {
    this.tableName = tableName;
    this.connection = connection;
  }

  parseQueryObj(queryObj) {
    return Object.entries(queryObj).reduce((query, [ fieldName, value ], i) => {
      query.fields.push(fieldName);
      query.values.push(value);
      query.placeholders.push(`$${i + 1}`);
      return query;
    }, { fields: [], values: [], placeholders: [] });
  }

  mutateQueryFields(queryObj) {
    queryObj.fields = queryObj.fields.map((field, i) => {
      return `${field} = $${i + 1}`;
    });
    return queryObj;
  }

  getAll(){
    this.connection.query(`SELECT * FROM ${this.tableName}`);
  }

  getAllRowsWhere(queryObj) {
    const query = this.mutateQueryFields(this.parseQueryObj(queryObj));
    return this.connection.query(
      `SELECT * FROM ${this.tableName} WHERE ${query.fields.join(', ')}`,
      query.values
    );
  }
  insertRow(queryObj) {
    const query = this.parseQueryObj(queryObj);
    return this.connection.query(
      `INSERT INTO ${this.tableName}(${query.fields.join(', ')}) 
      VALUES (${query.placeholders.join(', ')})`,
      query.values
    ); 
  }
}

class Listing extends Model {
  constructor(connection = dbPool) {
    super('listings', connection);
  }

  getOneListingById(id) {
    return super.getAllRowsWhere({ id });
  }

}

class Photo extends Model {
  constructor(connection = dbPool) {
    super('photos', connection);
  }

  getOnePhotoById(id) {
    return super.getAllRowsWhere({ id });
  }

  getGalleryByListingId(id) {
    return super.getAllRowsWhere({ listing_id: id });
  }
}

module.exports.Listing = Listing;
module.exports.Photo = Photo;
