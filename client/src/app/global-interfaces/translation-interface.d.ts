// interface ITranslationBody {}

export type TReportType = 'pin' | 'user' | 'comment' | 'board';

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
  'for-you': string;
  'no-comments': string;
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
  'account-type': {
    Personal: string;
    Business: string;
  };
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
    'delete-tooltip': string;
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
    'change-password-modal': {
      title: string;
      save: string;
      cancel: string;
      'current-password': string;
      'new-password': string;
    };
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
      Female: string;
      Male: string;
      Nonbinary: string;
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

interface ICountries {
  Afghanistan: string;
  Albania: string;
  Algeria: string;
  'American Samoa': string;
  Andorra: string;
  Angola: string;
  Anguilla: string;
  Antarctica: string;
  Antigua: string;
  Argentina: string;
  Armenia: string;
  Australia: string;
  Austria: string;
  Azerbaijan: string;
  Bahamas: string;
  Bahrain: string;
  Bangladesh: string;
  Barbados: string;
  Belarus: string;
  Belgium: string;
  Belize: string;
  Benin: string;
  Bermuda: string;
  Bhutan: string;
  Bolivia: string;
  'Bosnia and Herzegovina': string;
  Botswana: string;
  Brazil: string;
  Brunei: string;
  Bulgaria: string;
  'Burkina Faso': string;
  Burundi: string;
  Cambodia: string;
  Cameroon: string;
  Canada: string;
  'Cape Verde': string;
  'Cayman Islands': string;
  Chad: string;
  Chile: string;
  China: string;
  Colombia: string;
  Comoros: string;
  Congo: string;
  'Costa Rica': string;
  Croatia: string;
  Cuba: string;
  Cyprus: string;
  'Czech Republic': string;
  Denmark: string;
  Djibouti: string;
  Dominica: string;
  'Dominican Republic': string;
  Ecuador: string;
  Egypt: string;
  'El Salvador': string;
  'Equatorial Guinea': string;
  Eritrea: string;
  Estonia: string;
  Eswatini: string;
  Ethiopia: string;
  Fiji: string;
  Finland: string;
  France: string;
  Gabon: string;
  Gambia: string;
  Georgia: string;
  Germany: string;
  Ghana: string;
  Greece: string;
  Grenada: string;
  Guatemala: string;
  Guinea: string;
  'Guinea-Bissau': string;
  Guyana: string;
  Haiti: string;
  Honduras: string;
  Hungary: string;
  Iceland: string;
  India: string;
  Indonesia: string;
  Iran: string;
  Iraq: string;
  Ireland: string;
  Israel: string;
  Italy: string;
  Jamaica: string;
  Japan: string;
  Jordan: string;
  Kazakhstan: string;
  Kenya: string;
  Kiribati: string;
  'Korea, North': string;
  'Korea, South': string;
  Kosovo: string;
  Kuwait: string;
  Kyrgyzstan: string;
  Laos: string;
  Latvia: string;
  Lebanon: string;
  Lesotho: string;
  Liberia: string;
  Libya: string;
  Liechtenstein: string;
  Lithuania: string;
  Luxembourg: string;
  Madagascar: string;
  Malawi: string;
  Malaysia: string;
  Maldives: string;
  Mali: string;
  Malta: string;
  'Marshall Islands': string;
  Mauritania: string;
  Mauritius: string;
  Mexico: string;
  Micronesia: string;
  Moldova: string;
  Monaco: string;
  Mongolia: string;
  Montenegro: string;
  Morocco: string;
  Mozambique: string;
  Myanmar: string;
  Namibia: string;
  Nauru: string;
  Nepal: string;
  Netherlands: string;
  'New Zealand': string;
  Nicaragua: string;
  Niger: string;
  Nigeria: string;
  'North Macedonia': string;
  Norway: string;
  Oman: string;
  Pakistan: string;
  Palau: string;
  Panama: string;
  'Papua New Guinea': string;
  Paraguay: string;
  Peru: string;
  Philippines: string;
  Poland: string;
  Portugal: string;
  Qatar: string;
  Romania: string;
  Russia: string;
  Rwanda: string;
  'Saint Kitts and Nevis': string;
  'Saint Lucia': string;
  'Saint Vincent and the Grenadines': string;
  Samoa: string;
  'San Marino': string;
  'Sao Tome and Principe': string;
  'Saudi Arabia': string;
  Senegal: string;
  Serbia: string;
  Seychelles: string;
  'Sierra Leone': string;
  Singapore: string;
  Slovakia: string;
  Slovenia: string;
  'Solomon Islands': string;
  Somalia: string;
  'South Africa': string;
  Spain: string;
  'Sri Lanka': string;
  Sudan: string;
  Suriname: string;
  Sweden: string;
  Switzerland: string;
  Syria: string;
  Taiwan: string;
  Tajikistan: string;
  Tanzania: string;
  Thailand: string;
  Togo: string;
  Tonga: string;
  'Trinidad and Tobago': string;
  Tunisia: string;
  Turkey: string;
  Turkmenistan: string;
  Tuvalu: string;
  Uganda: string;
  Ukraine: string;
  'United Arab Emirates': string;
  'United Kingdom': string;
  'United States': string;
  Uruguay: string;
  Uzbekistan: string;
  Vanuatu: string;
  'Vatican City': string;
  Venezuela: string;
  Vietnam: string;
  Yemen: string;
  Zambia: string;
  Zimbabwe: string;
}

interface ILanguages {
  Spanish: string;
  English: string;
  Portuguese: string;
}

interface IExploreCategories {
  Sports: string;
  Health: string;
  Technology: string;
  Entertainment: string;
  Food: string;
  Desserts: string;
  Haircuts: string;
  Vehicles: string;
  Beauty: string;
  Fashion: string;
  Travel: string;
  Tattoos: string;
  Art: string;
  Design: string;
  Quotes: string;
  'Home Decoration': string;
  Animals: string;
  Nature: string;
  Funny: string;
  Love: string;
  Wallpapers: string;
  Anime: string;
  Drinks: string;
}

interface ISearch {
  empty: {
    pin: {
      pt1: string;
      pt2: string;
    };
    board: {
      pt1: string;
      pt2: string;
    };
    user: {
      pt1: string;
      pt2: string;
    };
  };
}

interface IFollowersAndFollowingList {
  its_you: string;
}

interface IReport {
  buttons: {
    confirm: string;
    cancel: string;
  };
  message: {
    pt1: string;
    pt2: string;
    type: {
      pin: string;
      board: string;
      user: string;
      comment: string;
    };
  };
}

interface IBoard {
  create: {
    title: string;
    name: {
      label: string;
      placeholder: string;
    };
    description: {
      label: string;
      placeholder: string;
    };
    buttons: {
      cancel: string;
      create: string;
    };
  };
  edit: {
    title: string;
    name: {
      label: string;
      placeholder: string;
    };
    description: {
      label: string;
      placeholder: string;
    };
    buttons: {
      cancel: string;
      save: string;
    };
  };
}

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
  countries: ICountries;
  languages: ILanguages;
  'explore-categories': IExploreCategories;
  search: ISearch;
  'followers-&-following-list': IFollowersAndFollowingList;
  report: IReport;
  board: IBoard;
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
