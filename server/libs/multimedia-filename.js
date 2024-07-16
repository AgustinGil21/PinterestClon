import dateNow from './date-now.js';
import UUID from './uuid.js';

export default function multimediaFileName() {
  const name = `pinterestClon-${UUID}-${dateNow}-multimedia`;

  return name;
}
