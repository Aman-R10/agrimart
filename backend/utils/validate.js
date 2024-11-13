// utils/validate.js
exports.requiredFields = (data, fields) => {
    return fields.every(field => data[field]);
  };
  