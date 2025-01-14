import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const generateFileName = (originalFileName) => {
    try {
        const extension = path.extname(originalFileName);
        const idName = uuidv4().split('-')[0];

        return `${idName}${extension}`;
    } catch (error) {
        throw new Error(`Error al generar el nombre del archivo`, error)
    }
}

