import { IToastNotification } from '../global-interfaces/global-interfaces';

interface INotificationMessages {
  [status: string]: {
    [type: string]: {
      [action: string]: {
        [lang: string]: string;
      };
    };
  };
}

export const getToastNotification = (content?: IToastNotification) => {
  if (!content || !content?.status) return 'Toast notification!';

  const { status, action, lang, type } = content;

  const notificationObject: INotificationMessages = {
    success: {
      board: {
        create: {
          es: 'Tablero creado correctamente.',
          en: 'Board created successfully.',
          pt: 'Quadro criado com sucesso.',
        },
        delete: {
          es: 'Tablero eliminado correctamente.',
          en: 'Board deleted successfully.',
          pt: 'Quadro excluído com sucesso.',
        },
        update: {
          es: 'Tablero actualizado correctamente.',
          en: 'Board updated successfully.',
          pt: 'Quadro atualizado com sucesso.',
        },
      },
      comment: {
        delete: {
          es: 'Comentario eliminado correctamente.',
          en: 'Comment deleted successfully.',
          pt: 'Comentário excluído com sucesso.',
        },
        report: {
          es: 'Comentario reportado correctamente.',
          en: 'Comment reported successfully.',
          pt: 'Comentário reportado com sucesso.',
        },
      },
      user: {
        report: {
          es: 'Usuario reportado correctamente.',
          en: 'User reported successfully.',
          pt: 'Usuário reportado com sucesso.',
        },
      },
      pin: {
        save: {
          es: 'Pin agregado correctamente.',
          en: 'Pin added successfully.',
          pt: 'Pin adicionado com sucesso.',
        },
        remove: {
          es: 'Pin removido correctamente.',
          en: 'Pin removed successfully.',
          pt: 'Pin removido com sucesso.',
        },
        create: {
          es: 'Pin creado correctamente.',
          en: 'Pin created successfully.',
          pt: 'Pin criado com sucesso.',
        },
        delete: {
          es: 'Pin eliminado correctamente.',
          en: 'Pin deleted successfully.',
          pt: 'Pin excluído com sucesso.',
        },
        update: {
          es: 'Pin actualizado correctamente.',
          en: 'Pin updated successfully.',
          pt: 'Pin atualizado com sucesso.',
        },
        report: {
          es: 'Pin reportado correctamente.',
          en: 'Pin reported successfully.',
          pt: 'Pin reportado com sucesso.',
        },
      },
      link: {
        copy: {
          es: 'Enlace copiado en portapapeles.',
          en: 'Link copied to clipboard.',
          pt: 'Link copiado para a área de transferência.',
        },
      },
    },

    error: {
      board: {
        create: {
          es: 'Error al crear el tablero.',
          en: 'Error creating the board.',
          pt: 'Erro ao criar o quadro.',
        },
        delete: {
          es: 'Error al eliminar el tablero.',
          en: 'Error deleting the board.',
          pt: 'Erro ao excluir o quadro.',
        },
        update: {
          es: 'Error al actualizar el tablero.',
          en: 'Error updating the board.',
          pt: 'Erro ao atualizar o quadro.',
        },
      },
      comment: {
        delete: {
          es: 'Error al eliminar el comentario.',
          en: 'Error deleting the comment.',
          pt: 'Erro ao excluir o comentário.',
        },
      },
      user: {
        report: {
          es: 'Error al reportar al usuario.',
          en: 'Error reporting the user.',
          pt: 'Erro ao reportar o usuário.',
        },
      },
      pin: {
        save: {
          es: 'Error al agregar el pin.',
          en: 'Error adding the pin.',
          pt: 'Erro ao adicionar o pin.',
        },
        remove: {
          es: 'Error al remover el pin.',
          en: 'Error removing the pin.',
          pt: 'Erro ao remover o pin.',
        },
        create: {
          es: 'Error al crear el pin.',
          en: 'Error creating the pin.',
          pt: 'Erro ao criar o pin.',
        },
        delete: {
          es: 'Error al eliminar el pin.',
          en: 'Error deleting the pin.',
          pt: 'Erro ao excluir o pin.',
        },
        update: {
          es: 'Error al actualizar el pin.',
          en: 'Error updating the pin.',
          pt: 'Erro ao atualizar o pin.',
        },
        report: {
          es: 'Error al reportar el pin.',
          en: 'Error reporting the pin.',
          pt: 'Erro ao reportar o pin.',
        },
      },
      link: {
        copy: {
          es: 'Error al copiar el enlace.',
          en: 'Error copying the link.',
          pt: 'Erro ao copiar o link.',
        },
      },
    },
  };

  let notification: string =
    notificationObject[status]?.[type]?.[action]?.[lang] ||
    'Notification error';

  return notification;
};
