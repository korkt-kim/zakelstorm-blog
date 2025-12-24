import path from 'path'

import { DIRECTORIES } from 'contents/consts'
import fse from 'fs-extra'

const CONTENTS_DIR = path.join(process.cwd(), DIRECTORIES.CONTENTS)

const generateImages = async () => {
  fse.copy(
    path.join(CONTENTS_DIR, 'images'),
    path.join(process.cwd(), 'public', 'images')
  )
}

generateImages()
