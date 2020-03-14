module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'books',
      [
        {
          title: 'Programing for dummies',
          isbn: 'ISBN9780525618478',
          category: 'Tecnology',
          year: '1999',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Star Wars - The Force Awakens',
          isbn: 'ISBN9782266267540',
          category: 'Fiction',
          year: '2015',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Star Wars - The Last Jedi',
          isbn: 'ISBN9780525633204',
          category: 'Fiction',
          year: '2018',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Star Wars - Episode I: The Phantom Menace',
          isbn: 'ISBN9780525633205',
          category: 'Fiction',
          year: '1999',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Star Wars - Episode II: Attack of the Clones',
          isbn: 'ISBN9780525633206',
          category: 'Fiction',
          year: '2002',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Star Wars - The Clone Wars',
          isbn: 'ISBN9780525633207',
          category: 'Fiction',
          year: '2008',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: QueryInterface => {
    return QueryInterface.bulkDelete('books', null, {});
  },
};
