import * as Yup from 'yup';
import Bookmark from '../models/Bookmark';
import User from '../models/User';
import Book from '../models/Book';

class BookmarkController {
  async index(req, res) {
    const bookmarks = await Bookmark.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'name', 'created_at'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: Book,
          as: 'book',
          attributes: ['title', 'category'],
        },
      ],
    });
    return res.json(bookmarks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(5)
        .required(),
      book_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Provided data failed on validation, please verify mandatory fields.',
      });
    }

    const { name, book_id } = req.body;

    const bookmark = await Bookmark.create({
      name,
      user_id: req.userId,
      book_id,
    });

    return res.json(bookmark);
  }
}

export default new BookmarkController();
