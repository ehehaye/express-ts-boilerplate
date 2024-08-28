import * as path from 'node:path';
import * as multer from 'multer';
import { type Options } from 'multer';
import { Request, Response, NextFunction } from 'express';
import { v6 as uuid } from 'uuid';
import { BadArgusException } from '@/exceptions/BadArgusException';

const TYPES_IMAGE = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
const ALLOWED_TYPES = [...TYPES_IMAGE, 'text/markdown', 'application/pdf', 'text/plain'];

const filter =
  (types: string[]): Options['fileFilter'] =>
  (req, file, cb) => {
    if (types.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new BadArgusException([
          {
            property: 'file',
            constraints: {
              MIME_TYPE: `Invalid file type: ${file.mimetype}`,
            },
          },
        ]),
      );
    }
  };

const defaultMulterOptions: Options = {
  storage: multer.diskStorage({
    destination: process.env.UPLOAD_DIR,
    filename: (req, file, cb) => cb(null, `${uuid()}${path.extname(file.originalname)}`),
  }),
  limits: {
    fieldNameSize: 255,
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
  fileFilter: filter(ALLOWED_TYPES),
};

const uploadMiddleware = (multerOptions: Pick<Options, 'fileFilter' | 'limits'>) => {
  const upload = multer({ ...defaultMulterOptions, ...multerOptions }).single('file');

  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, err => {
      if (err) {
        const _err =
          err instanceof multer.MulterError
            ? new BadArgusException([
                {
                  property: 'file',
                  constraints: { [err.code]: err.message },
                },
              ])
            : err;

        return next(_err);
      }

      const file = req.file as Express.Multer.File;

      if (!file) {
        return next(
          new BadArgusException([
            {
              property: 'file',
              constraints: { MISSING_FILE: `Missing file for filed 'file'` },
            },
          ]),
        );
      }

      req.body = {
        ...req.body,
        originalname: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        path: path.relative(process.env.UPLOAD_DIR, file.path),
      };

      next();
    });
  };
};

export { uploadMiddleware, filter };
