export const environment = {
  /**
   * Version de la aplicacion
   */
  version: '00.00.01',
  /**
   * Idioma por defecto
   */
  defaultLanguaje: 'es',
  /**
   * Titulo de la aplicacion
   */
  title: 'LibriVox',
  /**
   * Idiomas
   */
  languajes: {
    'es-ES': 'es',
    'en-EN': 'en',
  },
  /**
   * Claves de almacenamiento local
   */
  storage: {
    tokenKey: 'auth_token',
    userKey: 'current_user',
    storageKey: 'librivox_user',
  },
  /**
   *
   */
  headers: {
    CHANNEL_KEY: 'X-CHANNEL-KEY',
    APPLICATION_ID: 'X-APPLICATION-ID',
    CACHE_CONTROL: 'Cache-Control',
    PRAGMA: 'Pragma',
    APP_VERSION: 'X-APP-VERSION',
  },
  /**
   * Usuario por defecto
   */
  defaultUser: {
    id: 'harley',
    name: 'Harley',
    preferredLanguage: 'es',
    readingPosition: {},
    favorites: [],
    createdAt: new Date(),
  },
  /**
   * Rutas de endpoints
   */
  services: {
    openlibrary: {
      url: 'https://openlibrary.org',
      coversUrl: 'https://covers.openlibrary.org',
      audioUrl: 'https://librivox.org/api/feed/audiobooks/?id=52&format=json',
    },
    audioUrl: {
      url: 'https://archive.org/download',
    },
  },
  subjects: [
    {
      link: '/subjects/architecture.json',
      descripcion: 'Architecture',
    },
    {
      link: '/subjects/art__art_instruction.json',
      descripcion: 'Art Instruction',
    },
    {
      link: '/subjects/history_of_art__art__design_styles.json',
      descripcion: 'Art History',
    },
    {
      link: '/subjects/dance.json',
      descripcion: 'Dance',
    },
    {
      link: '/subjects/design.json',
      descripcion: 'Design',
    },
    {
      link: '/subjects/fashion.json',
      descripcion: 'Fashion',
    },
    {
      link: '/subjects/film.json',
      descripcion: 'Film',
    },
    {
      link: '/subjects/graphic_design.json',
      descripcion: 'Graphic Design',
    },
    {
      link: '/subjects/music.json',
      descripcion: 'Music',
    },
    {
      link: '/subjects/music_theory.json',
      descripcion: 'Music Theory',
    },
    {
      link: '/subjects/painting__paintings.json',
      descripcion: 'Painting',
    },
    {
      link: '/subjects/photography.json',
      descripcion: 'Photography',
    },
    {
      link: '/subjects/bears.json',
      descripcion: 'Bears',
    },
    {
      link: '/subjects/cats.json',
      descripcion: 'Cats',
    },
    {
      link: '/subjects/kittens.json',
      descripcion: 'Kittens',
    },
    {
      link: '/subjects/dogs.json',
      descripcion: 'Dogs',
    },
    {
      link: '/subjects/puppies.json',
      descripcion: 'Puppies',
    },
    {
      link: '/subjects/fiction.json',
      descripcion: 'Fiction',
    },
    {
      link: '/subjects/fantasy.json',
      descripcion: 'Fantasy',
    },
    {
      link: '/subjects/historical_fiction.json',
      descripcion: 'Historical Fiction',
    },
    {
      link: '/subjects/horror.json',
      descripcion: 'Horror',
    },
    {
      link: '/subjects/humor.json',
      descripcion: 'Humor',
    },
    {
      link: '/subjects/literature.json',
      descripcion: 'Literature',
    },
    {
      link: '/subjects/magic.json',
      descripcion: 'Magic',
    },
    {
      link: '/subjects/mystery_and_detective_stories.json',
      descripcion: 'Mystery and detective stories',
    },
    {
      link: '/subjects/plays.json',
      descripcion: 'Plays',
    },
    {
      link: '/subjects/poetry.json',
      descripcion: 'Poetry',
    },
    {
      link: '/subjects/romance.json',
      descripcion: 'Romance',
    },
    {
      link: '/subjects/science_fiction.json',
      descripcion: 'Science Fiction',
    },
    {
      link: '/subjects/short_stories.json',
      descripcion: 'Short Stories',
    },
    {
      link: '/subjects/thriller.json',
      descripcion: 'Thriller',
    },
    {
      link: '/subjects/young_adult_fiction.json',
      descripcion: 'Young Adult',
    },
    {
      link: '/subjects/sciencemathematics.json',
      descripcion: 'Science & Mathematics',
    },
    {
      link: '/subjects/biology.json',
      descripcion: 'Biology',
    },
    {
      link: '/subjects/chemistry.json',
      descripcion: 'Chemistry',
    },
    {
      link: '/subjects/mathematics.json',
      descripcion: 'Mathematics',
    },
    {
      link: '/subjects/physics.json',
      descripcion: 'Physics',
    },
    {
      link: '/subjects/programming.json',
      descripcion: 'Programming',
    },
    {
      link: '/subjects/business.json',
      descripcion: 'Business & Finance',
    },
    {
      link: '/subjects/management.json',
      descripcion: 'Management',
    },
    {
      link: '/subjects/entrepreneurship.json',
      descripcion: 'Entrepreneurship',
    },
    {
      link: '/subjects/business__economics.json',
      descripcion: 'Business Economics',
    },
    {
      link: '/subjects/success_in_business.json',
      descripcion: 'Business Success',
    },
    {
      link: '/subjects/finance.json',
      descripcion: 'Finance',
    },
    {
      link: '/subjects/juvenile_fiction.json',
      descripcion: "Children's",
    },
    {
      link: '/subjects/juvenile_literature.json',
      descripcion: 'Kids Books',
    },
    {
      link: '/subjects/stories_in_rhyme.json',
      descripcion: 'Stories in Rhyme',
    },
    {
      link: '/subjects/infancy.json',
      descripcion: 'Baby Books',
    },
    {
      link: '/subjects/bedtime.json',
      descripcion: 'Bedtime Books',
    },
    {
      link: '/subjects/picture_books.json',
      descripcion: 'Picture Books',
    },
    {
      link: '/subjects/history.json',
      descripcion: 'History',
    },
    {
      link: '/subjects/ancient_civilization.json',
      descripcion: 'Ancient Civilization',
    },
    {
      link: '/subjects/archaeology.json',
      descripcion: 'Archaeology',
    },
    {
      link: '/subjects/anthropology.json',
      descripcion: 'Anthropology',
    },
    {
      link: '/search?q=subject%3AHistory&subject_facet=History&subject_facet=World+War%2C+1939-1945',
      descripcion: 'World War II',
    },
    {
      link: '/search?q=subject%3AHistory&subject_facet=History&subject_facet=Social+life+and+customs',
      descripcion: 'Social Life and Customs',
    },
    {
      link: '/subjects/cooking.json',
      descripcion: 'Cooking',
    },
    {
      link: '/subjects/cookbooks.json',
      descripcion: 'Cookbooks',
    },
    {
      link: '/subjects/mental_health.json',
      descripcion: 'Mental Health',
    },
    {
      link: '/subjects/exercise.json',
      descripcion: 'Exercise',
    },
    {
      link: '/subjects/nutrition.json',
      descripcion: 'Nutrition',
    },
    {
      link: '/subjects/self-help.json',
      descripcion: 'Self-help',
    },
    {
      link: '/subjects/biography.json',
      descripcion: 'Biography',
    },
    {
      link: '/subjects/autobiography.json',
      descripcion: 'Autobiographies',
    },
    {
      link: '/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=History',
      descripcion: 'History',
    },
    {
      link: '/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Politics+and+government',
      descripcion: 'Politics and Government',
    },
    {
      link: '/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=World+War%2C+1939-1945',
      descripcion: 'World War II',
    },
    {
      link: '/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Women',
      descripcion: 'Women',
    },
    {
      link: '/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Kings+and+rulers',
      descripcion: 'Kings and Rulers',
    },
    {
      link: '/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Composers',
      descripcion: 'Composers',
    },
    {
      link: '/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Artists',
      descripcion: 'Artists',
    },
    {
      link: '/subjects/anthropology.json',
      descripcion: 'Anthropology',
    },
    {
      link: '/subjects/religion.json',
      descripcion: 'Religion',
    },
    {
      link: '/subjects/political_science.json',
      descripcion: 'Political Science',
    },
    {
      link: '/subjects/psychology.json',
      descripcion: 'Psychology',
    },
    {
      link: '/subjects/place%3Abrazil.json',
      descripcion: 'Brazil',
    },
    {
      link: '/subjects/place%3Aindia.json',
      descripcion: 'India',
    },
    {
      link: '/subjects/place%3Aindonesia.json',
      descripcion: 'Indonesia',
    },
    {
      link: '/subjects/place%3Aunited_states.json',
      descripcion: 'United States',
    },
    {
      link: '/subjects/textbooks.json',
      descripcion: 'Textbooks',
    },
    {
      link: '/search?q=language%3Aeng',
      descripcion: 'English',
    },
    {
      link: '/search?q=language%3Afre',
      descripcion: 'French',
    },
    {
      link: '/search?q=language%3Aspa',
      descripcion: 'Spanish',
    },
    {
      link: '/search?q=language%3Ager',
      descripcion: 'German',
    },
    {
      link: '/search?q=language%3Arus',
      descripcion: 'Russian',
    },
    {
      link: '/search?q=language%3Aita',
      descripcion: 'Italian',
    },
    {
      link: '/search?q=language%3Achi',
      descripcion: 'Chinese',
    },
    {
      link: '/search?q=language%3Ajpn',
      descripcion: 'Japanese',
    },
    {
      link: '/languages',
      descripcion: 'See more...',
    },
  ],
};
