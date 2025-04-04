import { string, z } from 'zod';

//Genders Schema
export const genderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const ArrayGenderSchema = z.object({
  genders: z.array(genderSchema),
});

//Country Schema
export const CountrySchema = z.object({
  id: z.string(),
  prefix: z.string(),
  name: z.string(),
});

export const ArrayCountriesSchema = z.object({
  countries: z.array(CountrySchema),
});

//Languages Schema
export const LanguageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  abbreviation: z.string().length(2),
});

export const ArrayLanguagesSchema = z.object({
  languages: z.array(LanguageSchema),
});

//Data user Schema
export const UserDataSchema = z.object({
  account_type: z.enum(['Personal', 'Business']).optional(),
  avatar_background: z.string().optional(),
  avatar_letter: z.string().length(1).optional(),
  avatar_letter_color: z.string().optional(),
  email_address: z.string().email().optional(),
  username: z.string().min(1).optional(),
  name: z.string().min(1).max(50).optional(),
  surname: z.string().min(1).max(50).optional(),
  avatar: z.string().optional(),
  lang: z.string(),
});

export const UserSettingsEditProfileSchema = z.object({
  avatar_background: z.string().optional(),
  avatar_letter: z.string().length(1).optional(),
  avatar_letter_color: z.string().optional(),
  name: z.string().min(1).max(50).optional(),
  surname: z.string().min(1).max(50).optional(),
  about_you: z.string().min(1).max(500).optional(),
  website: z.string().url().optional(),
  username: z.string().min(1).optional(),
});

//Data Avatar Schema
export const FileSchema = z.object({
  name: z.string().nonempty('El nombre del archivo no puede estar vacío'),
  lastModified: z.number().positive(),
  size: z.number().max(5 * 1024 * 1024, 'El archivo no debe ser mayor de 5MB'),
  type: z
    .string()
    .regex(/^image\/(png|jpg|jpeg|gif)$/, 'Tipo de archivo no soportado'),
  webkitRelativePath: z.string().optional(),
});

//User Account Managnment schema

export const UserAccountManagmentSchema = z.object({
  email_address: z
    .string()
    .email({ message: 'Debe ser una dirección de correo electrónico válida' }),
  birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Debe ser una fecha válida',
  }),
  gender: z.enum(['Male', 'Female', 'Nonbinary'], {
    errorMap: () => ({ message: "Debe ser 'Male', 'Female' o 'Nonbinary'" }),
  }),
  country: z.string().min(1, { message: 'El país es obligatorio' }),
  language: z.string().min(1, { message: 'El idioma es obligatorio' }),
  account_type: z.enum(['Personal', 'Business'], {
    errorMap: () => ({ message: "Debe ser 'Personal' o 'Business'" }),
  }),
});

export const UserVisibilityAccountSchema = z.object({
  account_type: z.enum(['Personal', 'Business']),
  private_account: z.boolean(),
});

//Category pins schema

export const CategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  id: z.string().uuid('ID inválido'),
  poster: z.string(),
});

export const CategoriesSchema = z.object({
  categories: z.array(CategorySchema),
});

//Previous pin schema

const PreviousPinSchema = z.object({
  id: z.string(),
  body: z.string(),
  title: z.string().optional(),
  created_at: z.string(),
});

export const ArrayPreviousPinSchema = z.array(PreviousPinSchema);

// Get pin id

export const PinEditIdSchema = z.object({
  title: z.string().optional(),
  adult_content: z.boolean().optional(),
  alt_text: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url('Invalid URL format').optional(),
  body: z.string(),
  topics: z.array(z.string()).optional(),
  id: z.string(),
});

export const PinBoardSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const PinSchema = z.object({
  body: z.string().url(),
  title: z.string().optional(),
  url: z.union([z.string().url(), z.literal(''), z.null()]).optional(),
  adult_content: z.boolean(),
  pin_id: z.string().uuid(),
  alt_text: z.string(),
  name: z.string().nullable().optional(),
  surname: z.string().nullable().optional(),
  username: z.string(),
  avatar: z.string().nullable().optional(),
  avatar_background: z.string(),
  avatar_letter_color: z.string(),
  avatar_letter: z.string(),
  user_id: z.string().optional(),
  similarity_score: z.number().optional(),
  its_yours: z.boolean().optional(),
  saved_in_profile: z.boolean().optional(),
  board: PinBoardSchema.optional().nullable(),
});

export const getPinsSchema = z.object({
  pins: z.array(PinSchema),
  results: z.number().optional(),
});

const suggestionSchema1 = z.object({
  pin_title: z.string().optional(),
  pin_alt_text: z.string(),
});

const suggestionSchema2 = z.object({
  user_name: z.string().optional(),
  user_surname: z.string().optional(),
  user_username: z.string().optional(),
  user_avatar: z.string().optional(),
  user_verified: z.boolean().optional(),
  user_avatar_background: z.string().optional(),
  user_avatar_letter: z.string().optional(),
  user_avatar_letter_color: z.string().optional(),
});

const suggestionSchema = z.union([suggestionSchema1, suggestionSchema2]);

export const ArraySuggestionSchema = z.array(suggestionSchema);

const categoriesPinsSchema = z.object({
  name: z.string().optional(),
  id: z.string().optional(),
  poster: z.string().optional(),
});

export const ArrayCategoriesPinsSchema = z.array(categoriesPinsSchema);

export const OwnerProfileSchema = z.object({
  username: z.string(),
  name: z.string().optional(),
  surname: z.string().optional(),
  verified: z.boolean(),
  avatar: z.string().optional(),
  avatar_background: z.string(),
  avatar_letter_color: z.string(),
  avatar_letter: z.string(),
  about: z.string().optional(),
  website: z.string().optional(),
  private_account: z.boolean().optional(),
  followers_count: z.string().optional(),
  following_count: z.string().optional(),
});

export const SearchUserProfileSchema = z.object({
  id: z.string().optional(),
  username: z.string(),
  name: z.string().optional(),
  surname: z.string().optional(),
  verified: z.boolean(),
  avatar: z.string().optional(),
  avatar_background: z.string(),
  avatar_letter_color: z.string(),
  avatar_letter: z.string(),
  about: z.string().optional(),
  website: z.string().optional(),
  private_account: z.boolean().optional(),
  followers_count: z.string().optional(),
  following_count: z.string().optional(),
  follows_you: z.boolean().optional(),
  its_you: z.boolean().optional(),
  following: z.boolean().optional(),
});

export const FollowersSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string().optional(),
  surname: z.string().optional(),
  verified: z.boolean(),
  avatar: z.string().optional(),
  avatar_background: z.string(),
  avatar_letter_color: z.string().optional(),
  avatar_letter: z.string(),
  its_you: z.boolean().optional(),
  follows_you: z.boolean().optional(),
  following: z.boolean().optional(),
});

export const FollowersListSchema = z.object({
  followers: z.array(FollowersSchema),
  followersCount: z.number(),
});

export const FollowingsSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string().optional(),
  surname: z.string().optional(),
  verified: z.boolean(),
  avatar: z.string().optional(),
  avatar_background: z.string(),
  avatar_letter_color: z.string().optional(),
  avatar_letter: z.string(),
  its_you: z.boolean().optional(),
  follows_you: z.boolean().optional(),
  following: z.boolean().optional(),
});

export const FollowingsListSchema = z.object({
  following: z.array(FollowingsSchema),
  followingCount: z.number(),
});

export const PinViewSchema = z.object({
  id: z.string(),
  user_id: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  topics: z.array(z.string()).optional(),
  body: z.string(),
  alt_text: z.string(),
  likes: z.string(),
  already_liked: z.boolean().optional(),
  comments: z.string().optional(),
  username: z.string(),
  avatar: z.string().optional(),
  avatar_background: z.string().optional(),
  avatar_letter_color: z.string().optional(),
  avatar_letter: z.string().length(1).optional(),
  verified: z.boolean(),
  its_you: z.boolean().optional(),
  follows_you: z.boolean().optional(),
  following: z.boolean().optional(),
  followers: z.string().optional(),
  saved_in_profile: z.boolean().optional(),
  board: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional()
    .nullable(),
});

export const PinCreatedDataSchema = z.array(
  z.object({
    id: z.string(),
    alt_text: z.string(),
    title: z.string().optional(),
    body: z.string(),
    url: z.string().optional(),
    adult_content: z.boolean(),
    its_yours: z.boolean().optional(),
    created_at: z.string(),
    saved_in_profile: z.boolean(),
    board: PinBoardSchema.optional().nullable(),
  })
);

export const LastBoardSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
});

export const BoardsListSchema = z.object({
  boards: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
      cover: z.string().optional(),
      collage: z.string().optional(),
    })
  ),
});

export const UserBoardsSchema = z.object({
  boards: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
      cover: z.string().optional(),
      collage: z.array(z.string().url()).optional(),
      created_at: z.string(),
      pins_count: z.string(),
      its_yours: z.boolean(),
    })
  ),
});

export const GetBoardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  its_yours: z.boolean().optional(),
  following: z.boolean().optional(),
  pins_count: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string().optional().nullable(),
    surname: z.string().optional().nullable(),
    username: z.string(),
    avatar: z.string().optional().nullable(),
    avatar_letter: z.string().length(1),
    avatar_letter_color: z.string(),
    avatar_background: z.string(),
  }),
  pins: z.array(
    z.object({
      body: z.string().url(),
      title: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
      adult_content: z.boolean(),
      pin_id: z.string(),
      alt_text: z.string(),
      name: z.string().optional().nullable(),
      surname: z.string().optional().nullable(),
      username: z.string(),
      avatar: z.string().optional().nullable(),
      avatar_background: z.string(),
      avatar_letter_color: z.string(),
      avatar_letter: z.string().length(1),
    })
  ),
});

export const CreateBoardSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  pinId: z.string().optional(),
});

export const EditBoardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional().nullable(),
  cover: z.string().url().optional().nullable(),
  collage: z.string().url().optional().nullable(),
});

export const EditBoardFormSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
});

export const AddPinToBoardSchema = z.object({
  pinId: z.string().uuid(),
  boardId: z.string().uuid(),
});

export const RemovePinFromBoardSchema = z.object({
  pinId: z.string().uuid(),
  boardId: z.string().uuid(),
});

export const GetPossibleCoversSchema = z.object({
  pins: z.array(
    z.object({
      id: z.string().uuid(),
      body: z.string().url(),
    })
  ),
  results: z.number(),
});

const BoardPreviewSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  pins_count: z.string(),
  cover: z.string().url().optional(),
  collage: z.array(z.string().optional()),
  its_yours: z.boolean(),
});

export const SearchBoardsSchema = z.object({
  boards: z.array(BoardPreviewSchema),
  results: z.number().optional(),
});

export const HomeBoardsSchema = z.object({
  boards: z.array(BoardPreviewSchema),
  results: z.string().optional(),
});

export const CreateBoardDataSchema = z.object({
  name: z.string().max(150, 'El nombre no puede tener más de 150 caracteres'),
  description: z.string().optional(),
  pinId: z.string().uuid('El pinId debe ser un UUID válido').optional(),
});

const CommentSchema = z.object({
  already_liked: z.boolean().optional(),
  avatar: z.string().optional(),
  avatar_background: z.string().optional(),
  avatar_letter: z.string().optional(),
  avatar_letter_color: z.string().optional(),
  content: z.string(),
  created_at: z.string(),
  id: z.string(),
  its_yours: z.boolean().optional(),
  likes_count: z.string(),
  user_id: z.string().optional(),
  username: z.string(),
});

export const CommentsResponseSchema = z.object({
  comments: z.array(CommentSchema),
});

export const PinSimilarSchema = z.object({
  username: z.string(),
  body: z.string(),
  pin_id: z.string(),
  alt_text: z.string(),
  adult_content: z.boolean().optional(),
  avatar_background: z.string().optional(),
  avatar_letter_color: z.string().optional(),
  avatar_letter: z.string().optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  avatar: z.string().optional(),
  url: z.string().optional(),
  user_id: z.string(),
  similarity_score: z.number(),
  its_yours: z.boolean().optional(),
  saved_in_profile: z.boolean(),
  board: PinBoardSchema.optional().nullable(),
});

export const SearchUsersSchema = z.object({
  users: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional().nullable(),
      surname: z.string().optional().nullable(),
      username: z.string(),
      avatar: z.string().optional().nullable(),
      verified: z.boolean(),
      avatar_background: z.string().optional().nullable(),
      avatar_letter_color: z.string().optional().nullable(),
      avatar_letter: z.string().optional().nullable(),
      followers_count: z.string(),
      following: z.boolean(),
      its_you: z.boolean().optional().nullable(),
    })
  ),
  results: z.number(),
});

export const EditBoardPrevDataSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  cover: z.string().optional().nullable(),
  collage: z.string().optional().nullable(),
});
