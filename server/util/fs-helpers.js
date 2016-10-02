/**
 * Created by ankain on 01.10.16.
 */

import fs from 'fs';

export const createDir = (path)=> {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
