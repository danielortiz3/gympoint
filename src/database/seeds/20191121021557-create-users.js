const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Daniel Guilherme Werner Ortiz',
          age: '38',
          phone: '11932295522',
          email: 'danielortiz3@gmail.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: QueryInterface => {
    return QueryInterface.bulkDelete('users', null, {});
  },
};
