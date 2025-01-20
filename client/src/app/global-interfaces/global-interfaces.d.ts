export type TLang = 'en' | 'es' | 'pt';

export type TInteraction =
  | 'pins'
  | 'messages'
  | 'followers'
  | 'following'
  | 'likes'
  | 'comments'
  | 'notifications';

type Type = 'message' | 'pin' | 'board' | 'comment' | 'profile' | 'user';

type Action =
  | 'create'
  | 'update'
  | 'delete'
  | 'follow'
  | 'like'
  | 'save'
  | 'remove';

export type TLang = 'es' | 'en' | 'pt';

export type TToastNotification = `${'?' | '!'}${Type}:${Action}[${Lang}]` | '';
