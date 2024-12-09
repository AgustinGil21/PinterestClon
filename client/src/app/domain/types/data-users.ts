export interface OwnerProfileInterface {
  username: string;
  name?: string;
  surname?: string;
  verified: boolean;
  avatar?: string;
  avatar_background: string;
  avatar_letter_color: string;
  avatar_letter: string;
  about?: string;
  website?: string;
  private_account?: boolean;
  followers_count?: string;
  following_count?: string;
}

export interface SearchUserProfileInterface {
  id: string;
  username: string;
  name?: string;
  surname?: string;
  verified: boolean;
  avatar?: string;
  avatar_background: string;
  avatar_letter_color: string;
  avatar_letter: string;
  about?: string;
  website?: string;
  private_account?: boolean;
  followers_count?: string;
  following_count?: string;
  follows_you?: boolean;
  following?: boolean;
  its_you?: boolean;
}
