// based on https://philipwalton.com/articles/responsive-components-a-solution-to-the-container-queries-problem/
// but with a twist: we hook into pre-existing responsive Tailwind classes to automate/streamline things.

const setUpContainerQueries = () => {
  // get Tailwind screens
  const SCREENS = preval`
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync('/app/full-tailwind-config.json'));
    module.exports = config.theme.screens;
  `;

  const ancestors = document.querySelectorAll('[data-container-query-ancestor]');
  if (!ancestors.length || !window.ResizeObserver || !window.Map) return;

  // we want just the min-width breakpoints, and we want the pixel-values as numbers
  const breakpoints = new Map(
    Object.entries(SCREENS).flatMap(([key, value]) => {
      if (typeof value === 'string') return [[key, parseInt(value)]];
      if (value.min) return [[key, parseInt(value.min)]];
      return [];
    })
  );

  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      breakpoints.forEach((minWidth, breakpointName) => {
        if (entry.contentRect.width >= minWidth) {
          entry.target.classList.add(`_${breakpointName}`);
        } else {
          entry.target.classList.remove(`_${breakpointName}`);
        }
      });
    });
  });

  const breakpointNames = Array.from(breakpoints.keys());
  const selector = breakpointNames.map(e => `[class^="${e}"],[class*=" ${e}"]`).join(',');

  ancestors.forEach(ancestor => {
    // first replace classes like `sm:` with `_sm:` on any descendants
    ancestor.querySelectorAll(selector).forEach(el => {
      /* escape hatch (for elements that should stay responsive to screen-width) */
      if (el.classList.contains('no-container-query')) return;

      const responsiveClasses = [];

      el.classList.forEach(className => {
        if (breakpointNames.some(e => className.startsWith(`${e}:`))) {
          responsiveClasses.push(className);
        }
      });

      responsiveClasses.forEach(className => {
        el.classList.replace(className, `_${className}`);
      });
    });
  
    // then set the container to dynamically get classes like `_sm` based on its width
    // (our PostCSS creates rules for selectors like `._sm _sm:...` that simply replicate
    // the functionality of Tailwind classes like `sm:...`)
    resizeObserver.observe(ancestor);

    // In all browsers, does the resizeObserver callback fire for an element
    // upon observing it? If not, then we'll have to manually call it here, also.
  });
};

if (self === top) setUpContainerQueries();

export default setUpContainerQueries;