import { generateFileName } from "./generateFileName";


export const buildFileUrl = (req, filename, folder) => {
    try {
        if(!filename) return null;
        const domain = `${req.protocol}://${req.get('host')}`;
        
        return `${domain}/uploads/${folder}/${filename}`
    } catch (error) {
        throw new Error(`Error al construir la url del archivo`, error)
    }
}