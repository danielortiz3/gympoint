import * as Yup from 'yup';
import Book from '../models/Book';
import File from '../models/File';

class BookController {
  async index(req, res) {
    const books = await Book.findAll({
      attributes: ['id', 'title', 'category', 'year', 'isbn', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path'],
        },
      ],
      order: [['id']],
    });
    return res.json(books);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(8)
        .required(),
      isbn: Yup.string()
        .min(16)
        .required(),
      category: Yup.string()
        .min(5)
        .required(),
      year: Yup.number()
        .min(4)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Provided data failed on validation, please verify mandatory fields.',
      });
    }

    /**
     * Book exists
     * Asuming on title is unique and only one can exists
     * into database
     */
    const { title } = req.body;
    const bookExists = await Book.findOne({
      where: { title },
    });

    if (bookExists) {
      return res
        .status(400)
        .json({ error: `The book with ${title} aldready exists` });
    }

    const book = await Book.create(req.body);

    return res.json(book);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      category: Yup.string().min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Provided data failed on validation, please verify mandatory fields.',
      });
    }

    /**
     * Check if category will change
     */
    const book = await Book.findByPk(req.params.id);
    const { category } = req.body;

    const categoryExist = await Book.findOne({ where: { category } });

    if (categoryExist) {
      return res
        .status(401)
        .json({ error: 'Enter a different category than the one registered.' });
    }

    // eslint-disable-next-line no-unused-vars
    const newCategory = await book.update(req.body);

    return res.json({ book });
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(400).json({ error: 'Book not found.' });
      }

      await Book.destroy({ where: { id } });
      return res.status(200).json({ success: 'Deleted with success' });
    } catch (err) {
      return res.status(400).json({ error: 'Deleted failed.' });
    }
  }
}

export default new BookController();
