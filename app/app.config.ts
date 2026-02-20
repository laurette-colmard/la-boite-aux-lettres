const author = 'Laurette Colmard'
const siteName = 'La Boîte aux lettres'

export default defineAppConfig({
  author,
  siteName,
  title: `${siteName} - ${author}`,
  description: "Characters with character,",
  description2: `by type designer ${author}.`,
})