// Order of the one-page sections; ids double as URL anchors (#bio, #music, …)
export const SECTIONS = ['bio', 'music', 'media', 'rider', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

export function sectionIndex(id: SectionId) {
  return String(SECTIONS.indexOf(id) + 1).padStart(2, '0')
}
