import { dateNow } from './date.js';
import UUID from './uuid.js';
export default function multimediaFileName() {
    const fileName = `pinterestClon-${UUID}-${dateNow}-multimedia`;
    return fileName;
}
