const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const rem = px => `${px / 16}rem`;

const hexToRGBA = (hex, alpha) => {
  hex = hex.replace('#', '');
  const pairs = (hex.length === 3) ? [...hex].map(char => char.repeat(2)) : [
    hex.slice(0, 2),
    hex.slice(2, 4),
    hex.slice(4)
  ];
  const [r, g, b] = pairs.map(pair => Number('0x' + pair));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// SITE-WIDE SPACING CONSTANTS; CHANGING HERE *SHOULD* CHANGE EVERYTHING THAT NEEDS TO BE CHANGED;
// IF NEEDED, CAN ALSO USE NEGATIVE VERSIONS OF THESE
// (e.g., add an entry to `spacing` like: '-container': `-${containerSpacing}`)
const containerSpacing = defaultTheme.spacing[4];
const verticalSpaceMobile = defaultTheme.spacing[10];
const verticalSpace = defaultTheme.spacing[20];
const sidebarWidth = rem(328);

const spacing = {
  container: containerSpacing,
  'vertical-space-mobile': verticalSpaceMobile,
  'vertical-space': verticalSpace,
  'full-width': '100vw',
  'full-height': '100vh',
  'admin': '79px',

  // for fine-grained control of padding, margin, width, and height (use like `mx-5-px` or `h-3-px`);
  // note that these are actually in rem, so, e.g., `mx-1-px` is not the same as TW's build-in `mx-px`
  ...Object.fromEntries([1, 2, 3, 5, 6, 7, 9, 10].map(px => [`${px}-px`, rem(px)])),
  '1/2-px': rem(.5)
};

const maxWidth = {
  // max-w-1/2, max-w-1/3, max-w-2/3, max-w-1/4, etc. (each num in array is denominator)
  ...Object.fromEntries(
    [2, 3, 4, 5, 6, 7, 9, 11].flatMap(n => Array.from(
      { length: n - 1 },
      (_, i) => [`${++i}/${n}`, `${100 * i / n}%`]
    ))
  )
};

const width = {
  sidebar: sidebarWidth,
  main: `calc(100% - ${sidebarWidth})`,
  '1000vh': '1000vh',
  '1000vw': '1000vw',
  'quarter': '25%',
  'half': '50%',
  'three-quarter': '75%',
  'one-fifth': '20%',
  'two-fifths': '40%',
  'three-fifths': '60%',
  'four-fifths': '80%'
};

const height = {
  '1000vh': '1000vh',
  '1000vw': '1000vw'
};

const minHeight = {
  8: '2rem',
  16: '4rem',
  32: '8rem'
};

const lineHeight = {
  0: '0',
  15: '3.5rem'
};

// TW only includes even values 0–8 (except 6); supplement with odds and 6
const borderWidth = Object.fromEntries([1, 3, 5, 6, 7].map(px => [px, `${px}px`]));

// flex-1/2, flex-1/3, flex-2/3, flex-1/4, etc. (each num in array is denominator)
const flex = Object.fromEntries(
  [2, 3, 4, 5, 6, 7, 9, 11].flatMap(n => Array.from(
    { length: n - 1 },
    (_, i) => [`${++i}/${n}`, `0 0 ${100 * i / n}%`]
  ))
);

flex[24] = `0 0 6rem`;

const transitionProperty = {
  colors: `${defaultTheme.transitionProperty.colors}, text-decoration-color, box-shadow`,
  inset: 'left, right, top, bottom'
};

const transitionDuration = {
  5000: '5000ms'
};

const backgroundImage = {
  ...require('./tailwind-helpers/backgroundImage')
};

const zIndex = {
  '-10': '-10',
  '0': '0',
  '1': '1',
  '10': '10',
  9999: '9999'
};

const boxShadow = {
  underline: '0 1px, inset 0 -1px',
  'underline-transparent': '0 1px transparent, inset 0 -1px transparent'
};

const listStyleType = {
  square: 'square'
};

const inset = {
  'square-in-circle': `calc(50% * (1 - 1/${Math.SQRT2}))`
};

const opacity = {
  '15': '.15'
};

/* nix Tailwind's default '2xl' breakpoint */
const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

const container = theme => ({
  center: true,
  padding: theme('spacing.container')
});

const fontFamily = {
  sans: ['Montserrat', 'sans-serif']
};

const colors = {
  red: {
    DEFAULT: '#E10B0B'
  },
  yellow: {
    DEFAULT: '#FFCC3F'
  },
  blue: {
    DEFAULT: '#002E51'
  },
  cream: {
    DEFAULT: '#F6F3EE'
  },
  white: {
    DEFAULT: '#FFF'
  },
  black: {
    DEFAULT: '#101820'
  },
  gray: {
    light: '#E3DFD9',
    DEFAULT: '#5E5B56'
  },
  transparent: 'transparent',
  inherit: 'inherit'
};

colors.red.fade = hexToRGBA(colors.red.DEFAULT, 0.2);
colors.yellow.fade = hexToRGBA(colors.yellow.DEFAULT, 0.2);
colors.blue.fade = hexToRGBA(colors.blue.DEFAULT, 0.2);
colors.black.fade = hexToRGBA(colors.black.DEFAULT, 0.2);

colors.grey = colors.gray;

const typography = {
  DEFAULT: {
    css: {
      '@apply text-black': '',

      a: {
        '@apply decoration-inherit hover:decoration-transparent': '',

        '&.button-link': {
          '@apply inline-block font-bold text-sm px-6 py-2.5 bg-blue text-white no-underline hover:bg-black': ''
        },

        '&.fancy': {
          '@apply no-underline text-lg sm:text-2xl relative pr-6 after:bg-black after:content-empty after:mask-arrow-fancy after:transition-colors after:absolute after:right-0 after:top-3-px after:w-3.5 after:h-3.5 sm:after:top-2 sm:after:w-4 sm:after:h-4': ''
        }
      },

      strong: {
        '@apply text-inherit': ''
      },

      'ul > li::before': {
        '@apply bg-black rounded-none': ''
      },
      
      'ul.inline-dot-list > li': {
        '@apply inline p-0 before:hidden': '',

        '&:not(:last-child)::after': {
          '@apply content-empty bg-black w-1.5 h-1.5 inline-block align-middle mx-3 mb-1-px': ''
        }
      },

      'ul.link-list': {
        li: {
          '@apply pt-5 pl-0 m-0 before:hidden': '',

          a: {
            '@apply font-bold text-lg no-underline shadow-underline hover:shadow-underline-transparent': '',
          }
        },

        // for 2-column link-list (starting at `sm` breakpoint), use `ul.link-list.columns`
        '&.columns': {
          '@apply sm:column-count-2 sm:gap-x-20': '',

          li: {
            '@apply break-inside-avoid': ''
          }
        }
      },

      'ul.button-link-list > li': {
        '@apply inline-block p-0 mr-3 mb-4 mt-0 before:hidden': '',

        a: {
          '@apply inline-block text-sm px-6 py-2.5 bg-black text-white no-underline': ''
        }
      },

      figure: null,
      'figure figcaption': null,
      'figure > *': null,
      img: null,

      '.wysiwyg-float-left, .align-left': {
        '@apply sm:float-left sm:max-w-1/2 sm:mr-10 sm:my-6': ''
      },

      '.wysiwyg-float-right, .align-right': {
        '@apply sm:float-right sm:max-w-1/2 sm:ml-10 sm:my-6': ''
      },

      /*
        Allow wrappers between `.prose` and actual content without affecting spacing around the WYSIWYG.
        Requires that innermost wrapper has the `.wysiwyg` class.
        (Mirrors the built-in `.prose > :first-child` / `.prose > :last-child` rules.)
      */
      '.wysiwyg > :first-child': { '@apply mt-0': '' },
      '.wysiwyg > :last-child': { '@apply mb-0': '' }
    }
  },

  white: {
    css: {
      '@apply text-white': '',
      
      'ul.link-list li a': { 
        '@apply text-yellow': '' 
      },

      a: {
        '@apply text-yellow': ''
      },

      /*
        Add stuff here as necessary to make things actually white (override `.prose` color-rules).
        For reference: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
      */
      'ol > li::before, blockquote, h1, h2, h3, h4, blockquote, figure figcaption, code, a code, pre': {
        '@apply text-white': ''
      }
    }
  },

  lg: {
    css: {
      figure: null,
      'figure > *': null,
      'figure figcaption': null,
      img: null
    }
  }
};

// export all of the config options above to tailwind.
// properties added in the "extend" block will override / 
// add to existing tailwind defaults. Those outside 'extend' 
// will replace the defaults.
module.exports = { 
  theme: {
    extend: {
      spacing,
      maxWidth,
      width,
      height,
      minHeight,
      lineHeight,
      borderWidth,
      flex,
      transitionProperty,
      transitionDuration,
      backgroundImage,
      zIndex,
      boxShadow,
      listStyleType,
      inset,
      opacity,
      typography
    },
    screens,
    container,
    fontFamily,
    colors
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    require('tailwindcss-pseudo-elements'),
    plugin(({ addUtilities, theme, addVariant, e }) => {
      addUtilities({

        /*
          By default, nested `.container`s don't get the extra x-padding;
          May need to make tweaks/exceptions for selectors like `.container .something .container`, etc
          (for suppressing/restoring padding and also possibly for suppressing the max-width).
        */
        '.container .container': {
          '@apply px-0 max-w-none': ''
        },

        // generally should be nested within a `.container` (for the x-padding)
        '.small-container': {
          '@apply max-w-4xl mx-auto': ''
        },

        // use responsive variant to 'undo' a `.container` at a certain breakpoint (like `container lg:no-container`)
        '.no-container': {
          '@apply mx-0 px-0 max-w-none !important': ''
        },

        // for vertical rhythm; should always go on OUTERMOST container of a slab that needs it (for margin-collapse)
        '.vertical-space': {
          '@apply my-vertical-space-mobile sm:my-vertical-space': ''
        },

        '.top-space': {
          '@apply mt-vertical-space-mobile sm:mt-vertical-space': ''
        },

        '.bottom-space': {
          '@apply mb-vertical-space-mobile sm:mb-vertical-space': ''
        },

        '.column-count-2': { columnCount: '2' },
        '.column-count-3': { columnCount: '3' },

        '.decoration-transparent': { 'text-decoration-color': 'transparent' },
        '.decoration-inherit': { 'text-decoration-color': 'inherit' },

        '.mask-arrow-fancy': { mask: `url('data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M6.012 12.024l6.012-6.012L6.012 0 4.95 1.062l4.194 4.212H0V6.75h9.144L4.95 10.962z" /></svg>')}') no-repeat 50% 50%` },
        '.mask-angle-bracket-right': { mask: `url('data:image/svg+xml,${encodeURIComponent('<svg width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Angle Bracket Right</title><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-961.000000, -259.000000)" fill="#101820" fill-rule="nonzero"><g transform="translate(0.000000, 137.000000)"><g transform="translate(597.000000, 117.000000)"><g transform="translate(289.000000, 0.000000)"><path d="M75.4176209,20.9991579 C75.3107634,20.9991579 75.2039058,20.9578931 75.1220931,20.8762056 C74.9593023,20.7119886 74.9593023,20.4450307 75.1220931,20.2808137 L82.3399844,12.9996842 L75.1220931,5.71855468 C74.9593023,5.55433767 74.9593023,5.28737976 75.1220931,5.12316276 C75.2848838,4.95894575 75.5495231,4.95894575 75.7123139,5.12316276 L83.225733,12.7024093 C83.3885238,12.8666263 83.3885238,13.1335842 83.225733,13.2978012 L75.7123139,20.8770478 C75.6305011,20.9595774 75.5236436,21 75.4167861,21 L75.4176209,20.9991579 Z" id="Path-Copy-3"></path></g></g></g></g></g></svg>')}') no-repeat 50% 50%` },
        '.mask-angle-bracket-down': { mask: `url('data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M6.012 12.024l6.012-6.012L6.012 0 4.95 1.062l4.194 4.212H0V6.75h9.144L4.95 10.962z" /></svg>')}') no-repeat 50% 50%` },

        // TW uses 'content-' for `align-content` utilities, so just be careful to avoid name-conflicts: https://tailwindcss.com/docs/align-content
        '.content-empty': { content: '""' },
        '.content-comma': { content: '","' },
        '.content-pipe': { content: '"|"' },
        '.content-dot': { content: '"•"' },
        '.content-slash': { content: '"/"' },
        '.content-plus': { content: '"+"' },
        '.content-dash': { content: '"–"' },
        '.content-triangle-down': { content: '"▼"' },
        '.content-open-quote': { content: '"“"' },
        '.content-close-quote': { content: '"”"' },
        '.content-blue-circled-x': {
          content: `url('data:image/svg+xml,${
            encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'
              + theme('colors.blue.DEFAULT')
              + '" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z"/></svg>'
            )
          }')`
        },
        '.content-arrow-button-yellow': {
          content: `url('data:image/svg+xml,${
            encodeURIComponent(
              '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M15.47875,27.08375 L20.87875,32.4725 L17.92625,35.416875 L8.964375,26.473125 C8.14625,25.65875 8.14625,24.338125 8.964375,23.526875 L17.924375,14.583125 L20.87625,17.52875 L15.47875,22.91625 L50,22.91625 C48.938125,10.086875 38.18375,0 25.053125,0 C11.21625,0 0,11.19375 0,25 C0,38.80625 11.21625,50 25.053125,50 C38.18375,50 48.938125,39.9125 50,27.08375 L15.47875,27.08375 Z" id="Path" fill="'
              + theme('colors.yellow.DEFAULT')
              + '" fill-rule="nonzero" transform="translate(25.000000, 25.000000) rotate(-180.000000) translate(-25.000000, -25.000000) "></path></g></svg>'
            )
          }')`
        },
        '.content-arrow-button-red': {
          content: `url('data:image/svg+xml,${
            encodeURIComponent(
              '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M15.47875,27.08375 L20.87875,32.4725 L17.92625,35.416875 L8.964375,26.473125 C8.14625,25.65875 8.14625,24.338125 8.964375,23.526875 L17.924375,14.583125 L20.87625,17.52875 L15.47875,22.91625 L50,22.91625 C48.938125,10.086875 38.18375,0 25.053125,0 C11.21625,0 0,11.19375 0,25 C0,38.80625 11.21625,50 25.053125,50 C38.18375,50 48.938125,39.9125 50,27.08375 L15.47875,27.08375 Z" id="Path" fill="'
              + theme('colors.red.DEFAULT')
              + '" fill-rule="nonzero" transform="translate(25.000000, 25.000000) rotate(-180.000000) translate(-25.000000, -25.000000) "></path></g></svg>'
            )
          }')`
        },

        '.clip-path-circle': { clipPath: 'circle()' },

        '.break-inside-avoid': { breakInside: 'avoid' },
        '.break-inside-avoid *': { breakInside: 'avoid' },

        '.marker-black::marker': {
          '@apply text-black': ''
        },

        '.details-marker-none': {
          '@apply list-none': '',
          '&::-webkit-details-marker': {
            '@apply hidden': ''
          }
        },

        '.big-square': { height: '1000vh', width: '1000vh' }
      });


      /*
        These complex variants don't gel in combination with other variants (like :hover) out of the box,
        so we add combined-variants explicitly as needed (e.g., `descendant-a_hover:` and `open_before:`)
      */

      /* `descendants:` for targeting all descendants of the element in question (e.g., `descendants:h-full`) */
      addVariant('descendants', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `.descendants${e(separator + className)} *`
        ));
      });

      /* `descendant-img:` for targeting all descendant-images of the element in question (e.g., `descendant-img:object-cover`) */
      addVariant('descendant-img', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `.descendant-img${e(separator + className)} img`
        ));
      });

      /* `descendant-a:` for targeting all descendant-links of the element in question (e.g., `descendant-a:underline`) */
      addVariant('descendant-a', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `.descendant-a${e(separator + className)} a`
        ));
      });

      /* `descendant-a_hover:` for targeting hover-states of all descendant-links of the element in question (e.g., `descendant-a_hover:text-blue-800`) */
      addVariant('descendant-a_hover', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `.descendant-a_hover${e(separator + className)} a:hover`
        ));
      });

      /* `children:` for targeting all direct children of the element in question */
      addVariant('children', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `.children${e(separator + className)} > *`
        ));
      });

      /* `siblings:` for targeting all subsequent siblings of the element in question */
      addVariant('siblings', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `.siblings${e(separator + className)} ~ *`
        ));
      });

      /* `open:` for targeting an open `details` or its descendants */
      addVariant('open', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `[open].open${e(separator + className)}, details[open] .open${e(separator + className)}`
        ));
      });

      /* `open_before:` for targeting the `::before` of an open `details` or its descendants */
      addVariant('open_before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `[open].open_before${e(separator + className)}::before, details[open] .open_before${e(separator + className)}::before`
        ));
      });

      /* `open_after:` for targeting the `::after` of an open `details` or its descendants */
      addVariant('open_after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => (
          `[open].open_after${e(separator + className)}::after, details[open] .open_after${e(separator + className)}::after`
        ));
      });
    })
  ],
  purge: [
    '/app/components/**/*.twig',
    '/app/components/**/*.js',
    '/app/components/**/*.css',
    '/app/css/**/*.css',
    '/app/tailwind.config.js' /* not sure if this is necessary but I think it can't hurt */
  ],
  mode: 'jit'
};