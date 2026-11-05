import type { SocialLink } from '../../domain/entities/site';

/** Origin of the live site; used for links outside the SPA scope. */
const SITE_ORIGIN = 'https://www.elevadoresaltius.com';

/**
 * Social links exactly as the original site lists them.
 * The home footer uses the original "ElevadoresAltiu" Twitter handle,
 * while the contact page links to "elevadoresaltiu" (kept as on each page).
 */

const brandColor = {
  facebook: '#3b5998',
  twitter: '#1da1f2',
  youtube: '#cd201f',
  vimeo: '#1ab7ea',
  flickr: '#0063dc',
  instagram: '#262626',
  linkedin: '#0077b5',
  pinterest: '#bd081c',
  slideshare: '#0077b5',
  weixin: '#31a918',
} as const;

/** Footer social icons shown on the home page. */
export const homeFooterSocialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ElevadoresAltius/',
    icon: 'fab fa-facebook',
    color: brandColor.facebook,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/ElevadoresAltiu',
    icon: 'fab fa-twitter',
    color: brandColor.twitter,
  },
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/channel/UCwwaJj_EcrzU825D99N-K4Q',
    icon: 'fab fa-youtube',
    color: brandColor.youtube,
  },
];

/** Full social row shown on the contact page. */
export const contactSocialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ElevadoresAltius/',
    icon: 'fab fa-facebook',
    color: brandColor.facebook,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/elevadoresaltiu',
    icon: 'fab fa-twitter',
    color: brandColor.twitter,
  },
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/channel/UCwwaJj_EcrzU825D99N-K4Q',
    icon: 'fab fa-youtube',
    color: brandColor.youtube,
  },
  {
    label: 'Vimeo',
    href: 'https://vimeo.com/elevadores',
    icon: 'fab fa-vimeo',
    color: brandColor.vimeo,
  },
  {
    label: 'Flickr',
    href: 'https://www.flickr.com/photos/elevadoresaltius/',
    icon: 'fab fa-flickr',
    color: brandColor.flickr,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/elevadores_altius/?hl=es',
    icon: 'fab fa-instagram',
    color: brandColor.instagram,
  },
  {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/company/5260518/admin/',
    icon: 'fab fa-linkedin',
    color: brandColor.linkedin,
  },
  {
    label: 'Pinterest',
    href: 'https://www.pinterest.com.mx/ElevadorAltius/',
    icon: 'fab fa-pinterest',
    color: brandColor.pinterest,
  },
  {
    label: 'Slideshare',
    href: 'https://es.slideshare.net/BernardoHM/elevadores-altius',
    icon: 'fab fa-slideshare',
    color: brandColor.slideshare,
  },
  {
    label: 'Weixin',
    href: 'https://www.wechat.com/es/',
    icon: 'fab fa-weixin',
    color: brandColor.weixin,
  },
];

/** Privacy notice link shown in the footer area. */
export const privacyNotice = {
  label: 'Aviso de Privacidad',
  href: `${SITE_ORIGIN}/aviso-de-privacidad-de-elevadores-altius/`,
};
