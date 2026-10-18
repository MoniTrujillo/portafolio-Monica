interface PageSeo {
  title: () => string
  description: () => string
}

export function usePageSeo({ title, description }: PageSeo) {
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
  })
}
