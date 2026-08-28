/**
 * Auto-discovers course materials that are dropped into
 * `src/courses/materials/<course-slug>/` at build time.
 *
 * To publish materials for a course:
 *   1. Open (or create) the folder `src/courses/materials/<course-slug>/`
 *      using the course's slug (e.g. `ai-soup-to-nuts`).
 *   2. Drop files into it (PDFs, slide decks, documents, spreadsheets,
 *      images, videos, archives, etc.).
 *   3. Commit and push. The site rebuilds and lists them automatically —
 *      no code or manifest changes are required.
 *
 * Files are shown in alphabetical order, so prefixing filenames with a
 * number (e.g. "01-", "02-") controls their display order.
 *
 * Self-contained HTML pages (labs, glossaries, etc.) and PDFs are rendered
 * inline on the course page (via iframe / the browser's native PDF viewer)
 * in addition to a download link.
 */

export type MaterialKind = 'html' | 'pdf' | 'image' | 'video' | 'other';

export interface CourseMaterial {
  /** The course slug this material belongs to. */
  slug: string;
  /** The original file name as dropped into the folder. */
  name: string;
  /** The resolved asset URL used to serve/view/download the file. */
  url: string;
  /** Lowercased file extension without the dot (empty if none). */
  ext: string;
  /** How the material should be presented in the course page. */
  kind: MaterialKind;
}

/** Classifies a file extension into a presentation kind. */
export function classifyMaterial(ext: string): MaterialKind {
  switch (ext) {
    case 'html':
    case 'htm':
      return 'html';
    case 'pdf':
      return 'pdf';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'webp':
      return 'image';
    case 'mp4':
    case 'mov':
    case 'webm':
    case 'mkv':
      return 'video';
    default:
      return 'other';
  }
}

const MATERIAL_PATH_PREFIX = './materials/';

/**
 * Vite resolves this glob at build time into a map of
 * `file path -> emitted asset URL` for every file under each course folder.
 */
const materialModules = import.meta.glob(
  './materials/*/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

export function getCourseMaterials(slug: string): CourseMaterial[] {
  const prefix = `${MATERIAL_PATH_PREFIX}${slug}/`;
  const materials: CourseMaterial[] = [];

  for (const [path, url] of Object.entries(materialModules)) {
    if (!path.startsWith(prefix)) continue;

    const name = path.slice(prefix.length);
    // Skip hidden/placeholder files such as .gitkeep or .DS_Store.
    if (!name || name.startsWith('.')) continue;

    const ext = name.includes('.')
      ? name.slice(name.lastIndexOf('.') + 1).toLowerCase()
      : '';

    materials.push({ slug, name, url, ext, kind: classifyMaterial(ext) });
  }

  return materials.sort((a, b) => a.name.localeCompare(b.name));
}
