// interface ITranslationBody {}

interface Header {
  buttons: {
    home: string;
    explore: string;
    create: string;
    register: string;
    login: string;
    logout: string;
    avatar: string;
    'arrow-down': string;
  };
  modal: {
    'currently-in': string;
    options: string;
    settings: string;
    'clone-info': string;
    logout: string;
    version: string;
  };
  'search-input': {
    placeholder: string;
    modal: {
      recent: string;
      'ideas-for-you': string;
      popular: string;
    };
  };
}

interface BoardsList {
  profile: string;
  'all-boards': string;
  results: string;
  'create-board': string;
  save: string;
  empty: string;
  ['empty-typing']: string;
}

interface DataDevs {
  text: string;
  tooltip: string;
}

interface Pin {
  'save-btn': string;
  'more-options': {
    download: string;
    report: string;
    tooltip: string;
  };
  like: string;
}

interface Share {
  text: string;
  copy: string;
  copied: string;
}

interface Comment {
  like: string;
  'more-options': {
    report: string;
    delete: string;
  };
  'show-more': string;
  'show-less': string;
  reply: string;
  'input-placeholder': string;
}

interface User {
  buttons: {
    follow: string;
    following: string;
    share: string;
    edit: string;
    created: string;
    saved: string;
    message: string;
    'its-you': string;
  };
  'profile-options': {
    text: string;
    block: string;
    report: string;
  };
  private: string;
}

interface Explore {
  title: string;
  footer: {
    title: string;
    subtitle: string;
    button: string;
  };
}

interface AsideSettings {
  'edit-profile': string;
  'account-management': string;
  privacy: string;
  security: string;
}

interface FooterSettings {
  reset: string;
  save: string;
}

interface EditProfile {
  title: string;
  description: string;
  avatar: {
    label: string;
    change: string;
  };
  name: {
    label: string;
  };
  surname: {
    label: string;
  };
  about: {
    label: string;
    placeholder: string;
  };
  website: {
    label: string;
    description: string;
  };
  username: {
    label: string;
  };
}

interface AccountManagement {
  title: string;
  description: string;
  'your-account': {
    title: string;
    label: {
      'email-address': string;
      private: string;
    };
  };
  password: {
    title: string;
    description: string;
    'change-password': string;
  };
  'business-account': {
    title: string;
    description: string;
    'convert-account': string;
  };
  'personal-info': {
    title: string;
    label: string;
    gender: {
      label: string;
      female: string;
      male: string;
      'non-binary': string;
    };
    country: string;
    lang: string;
  };
  'eliminate-account': {
    title: string;
    subtitle: string;
    description: string;
    'delete-account': {
      button: string;
      modal: {
        title: string;
        description: string;
        confirm: string;
        cancel: string;
      };
    };
  };
}

interface Privacy {
  title: string;
  description: string;
  private: {
    title: string;
    description: string;
  };
}

interface Security {
  title: string;
  description: string;
  'two-factor-authentication': {
    title: string;
    description: string;
    'require-code': string;
  };
}

interface CreatePin {
  'title-create': string;
  'title-edit': string;
  aside: {
    posts: string;
    create: string;
  };
  'prev-pins': {
    options: {
      edit: string;
      delete: string;
    };
  };
  'delete-modal': {
    title: string;
    description: string;
    cancel: string;
    delete: string;
  };
  form: {
    publish: string;
    saving: string;
    creating: string;
    image: {
      reset: string;
      explanation: string;
      recommendation: string;
    };
    'alt-text': {
      label: string;
      placeholder: string;
    };
    title: {
      label: string;
      placeholder: string;
    };
    description: {
      label: string;
      placeholder: string;
    };
    link: {
      label: string;
      placeholder: string;
    };
    categories: {
      label: string;
      placeholder: string;
      message: string;
      results: string;
    };
    'more-options': {
      title: string;
      label: string;
      description: string;
    };
  };
}

interface Filters {
  'main-button': string;
  boards: string;
  pins: string;
  users: string;
  apply: string;
  reset: string;
}

interface Categories {
  [key: string]: string;
}

interface Auth {
  login: {
    button: string;
    title: string;
    email_address: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
      forgot: string;
    };
    about: string;
    'go-to-register': string;
  };
  register: {
    'page-session': {
      title: string;
      subtitle: string;
      email_address: {
        label: string;
        placeholder: string;
      };
      password: {
        label: string;
        placeholder: string;
      };
      birthdate: string;
      or: string;
      about: string;
      'go-to-login': string;
      button: string;
    };
    'page-gender': {
      title: string;
      subtitle: string;
      gender: {
        female: string;
        male: string;
        'non-binary': string;
      };
      button: string;
    };
    'page-lang': {
      title: string;
      subtitle: string;
      button: string;
    };
    'page-avatar': {
      title: string;
      label: string;
      button: string;
    };
  };
}

type Loading = string;

export interface ITranslation {
  header: Header;
  user: User;
  explore: Explore;
  'aside-settings': AsideSettings;
  'footer-settings': FooterSettings;
  'edit-profile': EditProfile;
  'account-management': AccountManagement;
  privacy: Privacy;
  security: Security;
  loading: Loading;
  'create-pin': CreatePin;
  filters: Filters;
  categories: Categories;
  auth: Auth;
  pin: Pin;
  ['data-devs']: DataDevs;
  comment: Comment;
  share: Share;
  ['boards-list']: BoardsList;
  errors: Record<string, unknown>;
}

export type TTranslationKey =
  | 'header'
  | 'user'
  | 'explore'
  | 'aside-settings'
  | 'footer-settings'
  | 'edit-profile'
  | 'account-management'
  | 'privacy'
  | 'security'
  | 'loading'
  | 'create-pin'
  | 'filters'
  | 'categories'
  | 'auth'
  | 'errors';

export type TTObject =
  | Header
  | User
  | Explore
  | AsideSettings
  | FooterSettings
  | EditProfile
  | AccountManagement
  | Privacy
  | Security
  | Loading
  | CreatePin
  | Filters
  | Categories
  | Auth
  | Record<string, unknown>;
