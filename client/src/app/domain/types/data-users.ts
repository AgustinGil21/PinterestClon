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

export interface FollowersInterface {
  id: string;
  username: string;
  name?: string;
  surname?: string;
  verified: boolean;
  avatar?: string;
  avatar_background: string;
  avatar_letter_color?: string;
  avatar_letter?: string;
  its_you?: boolean;
  follows_you?: boolean;
  following?: boolean;
}

export interface FollowersListInterface {
  followers: FollowersInterface[];
  followersCount: number;
}

export interface FollowingsInterface {
  id: string;
  username: string;
  name?: string;
  surname?: string;
  verified: boolean;
  avatar?: string;
  avatar_background: string;
  avatar_letter_color?: string;
  avatar_letter?: string;
  its_you?: boolean;
  follows_you?: boolean;
  following?: boolean;
}

export interface FollowingsListInterface {
  following: FollowersInterface[];
  followingCount: number;
}
