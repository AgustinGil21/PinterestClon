export type TLang = 'en' | 'es' | 'pt';

export type TInteraction =
  | 'pins'
  | 'messages'
  | 'followers'
  | 'following'
  | 'likes'
  | 'comments'
  | 'notifications';

type TType =
  | 'message'
  | 'pin'
  | 'board'
  | 'comment'
  | 'profile'
  | 'user'
  | 'link';

type TAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'follow'
  | 'like'
  | 'save'
  | 'remove'
  | 'copy'
  | 'report';

export type TStatus = `${'success' | 'error'}`;

export interface IToastNotification {
  lang: TLang;
  status: TStatus;
  action: TAction;
  type: TType;
}

export interface IToastNotificationProps {
  status: TStatus;
  action: TAction;
  type: TType;
}
