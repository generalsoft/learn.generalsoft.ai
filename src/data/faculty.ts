/**
 * Faculty directory for learn.generalsoft.ai.
 *
 * Each entry is a public instructor/faculty profile. Add new members by
 * appending an object to the array below — the /faculty listing and
 * /faculty/:slug detail pages render automatically from this data.
 */
import type { Faculty } from '../types';

export const faculty: Faculty[] = [
  {
    id: 'abid-nasim',
    slug: 'abid-nasim',
    name: 'Abid Nasim',
    title: 'Adjunct Faculty',
    education: 'MBA - Lahore University of Management Sciences (LUMS), Pakistan',
    photo: '/public/an-office.jpg',
    researchInterests: [
      'Natural Language Processing in Artificial Intelligence solutions — particularly building an eco-system for the Urdu language that fills the current gaps in the Urdu eco-system.',
      'OCR, voice synthesis, voice recognition, IoT, AR, VR, 3D Printing and Cloud — converging these technologies to design new products.',
      'Ancient manuscripts of scriptures and lexical graphical analysis of scriptures.',
    ],
    bio: [
      'Mr. Nasim has worked with mainframes and super computers and enjoys contracting work in IT since it allows him the opportunity of constant learning.',
      'Recently, he has been working on blogging and creating public domain frameworks. He also likes to share his experiences and help students and clients learn about the solutions he builds and/or software they use.',
    ],
    affiliations: ['LUMS Alumnus', 'Contracting for LUMS on Security and High Performance Computing'],
    featured: true,
  },
];

export const getFacultyBySlug = (slug: string): Faculty | undefined =>
  faculty.find((member) => member.slug === slug);
