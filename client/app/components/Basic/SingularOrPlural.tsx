import { TInteraction } from '../../global-interfaces/global-interfaces';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';

interface Props {
  value: number | string;
  type: TInteraction;
  className?: string;
  sentenceCase?: boolean;
}

interface SingularOrPluralProps {
  props: Props;
}

const SingularOrPlural = ({ props }: SingularOrPluralProps) => {
  const { className, value, type, sentenceCase = false } = props;
  const { userLang } = useAppsStore();

  const translations = {
    pins: {
      en: value == 1 ? 'pin' : 'pins',
      es: value == 1 ? 'pin' : 'pines',
      pt: value == 1 ? 'pin' : 'pins',
    },
    messages: {
      en: value == 1 ? 'message' : 'messages',
      es: value == 1 ? 'mensaje' : 'mensajes',
      pt: value == 1 ? 'mensagem' : 'mensagens',
    },
    followers: {
      en: value == 1 ? 'follower' : 'followers',
      es: value == 1 ? 'seguidor' : 'seguidores',
      pt: value == 1 ? 'seguidor' : 'seguidores',
    },
    following: {
      en: 'Following',
      es: 'Siguiendo a',
      pt: 'Seguindo',
    },
    likes: {
      en: value == 1 ? 'like' : 'likes',
      es: value == 1 ? 'me gusta' : 'me gusta',
      pt: value == 1 ? 'curtida' : 'curtidas',
    },
    comments: {
      en: value == 1 ? 'comment' : 'comments',
      es: value == 1 ? 'comentario' : 'comentarios',
      pt: value == 1 ? 'comentário' : 'comentários',
    },
    notifications: {
      en: value == 1 ? 'notification' : 'notifications',
      es: value == 1 ? 'notificación' : 'notificaciones',
      pt: value == 1 ? 'notificação' : 'notificações',
    },
  };

  let content: string = translations[type][userLang];

  if (sentenceCase) {
    content = content.charAt(0).toUpperCase() + content.slice(1).toLowerCase();
  }

  return <span className={className}>{content}</span>;
};

export default SingularOrPlural;
