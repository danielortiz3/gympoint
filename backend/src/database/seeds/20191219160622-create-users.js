module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Daniel Guilherme Werner Ortiz',
          email: 'danielortiz3@gmail.com',
          age: '38',
          weight: '75.5',
          height: '1.89',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Diego Fernandes',
          email: 'diego@rocketseat.com',
          age: '33',
          weight: '75.5',
          height: '1.79',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Obiwan Kenobi',
          email: 'obiwan_kenobi@gmail.com',
          age: '45',
          weight: '85.5',
          height: '1.89',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Luke Skywalker',
          email: 'luke_is_lost@gmail.com',
          age: '48',
          weight: '90.5',
          height: '1.89',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
