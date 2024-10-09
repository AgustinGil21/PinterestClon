import { EmailAddress } from '../auth/auth-interface.js';

export interface CreateEmail {
  to: string;
  subject: string;
  html: string;
}
