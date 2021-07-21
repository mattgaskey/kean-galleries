/**
 * This script sets up the automatic execution of each pattern `.js` file whenever
 * its corresponding Twig template is newly rendered in Storybook. It works with
 * Webpack's hot-module-replacement API to detect all such pattern-scripts and to
 * manage their execution as needed (so DO NOT `import` the `.js` files in question
 * into any other module).
 *
 * To get this working with a particular pattern:
 * 
 * 1. Give the `.js` file and the `.twig` file the same name (e.g., `header.js` and `header.twig`).
 * 2. Make sure the `.js` file and the `.twig` file live in the same subdirectory of `../components`.
 * 3. Use the `export default` syntax to export a single function from the `.js` file, like this:
 * 
 * const setUpComponent = () => {};
 * setUpComponent();
 * export default setUpComponent;
 * 
 * Note that you do want to execute the function before exporting it, so that the script will
 * run on the live site (outside of Storybook). In Storybook, this will still cause the function
 * to execute on page-load and when changes to the JS file are saved, but this script accounts
 * for that and makes sure that what you see in Storybook is always fresh markup that the JS has
 * operated on only once. Our back-end Babel setup gets rid of the `export` statement during
 * transpilation and also wraps the whole JS file in an IIFE.
 * 
 * To prevent this script from attempting to run on a given JS file,
 * have that file default-export null, like this:
 * 
 * export default null;
 * 
 * (You can still use named exports for such files if desired.)
 * 
 * This script relies on the `twigjs-loader` setup in
 * `/docker/bookbinder/.storybook/webpack.config.js`,
 * which inserts a `<!-- twig-id: ... -->` comment at the beginning
 * of each Twig template in Storybook.
 */

const root = document.querySelector('#root');

const printInstructions = key => {
  const label = `[STORYBOOK TWIG SCRIPT-RUNNER] Instructions for Auto-Running ${key}`;
  console.groupCollapsed(label)
  console.log(
    'If you want ' + key + ' to run automatically whenever a corresponding Twig template\n'
    + 'renders, give it the same name as the .twig file in question (in the same directory)\n'
    + 'and default-export the code to be executed as a function, like this:\n\n'
    + 'const setUpComponent = () => {};\n'
    + 'setUpComponent();\n'
    + 'export default setUpComponent;\n\n'
    + 'To turn off this message for ' + key + ', default-export null instead, like this:\n\n'
    + 'export default null;\n\n'
    + '(you can still use named exports if desired). For more info, see .storybook-src/script-runner.js'
  );
  console.groupEnd(label);
};

// `require.context` is Webpack's way of bulk-importing.
// Note: we cannot use variables for its parameters;
// the String and RegExp arguments must be hard-coded every time.
const jsImports = require.context('/app/components', true, /(?<!stories)\.js$/);

// a cache for keeping up-to-date JS modules
const jsModules = new Map(jsImports.keys().map(key => [key, jsImports(key)]));

if (module.hot) module.hot.accept(jsImports.id, () => {
  // this callback runs whenever pattern-level scripts have changed or been created/deleted

  // get a fresh scripts-import to compare against `jsModules`
  const freshJsImports = require.context('/app/components', true, /(?<!stories)\.js$/);
  const freshJsModules = new Map(freshJsImports.keys().map(key => [key, freshJsImports(key)]));

  // remove any deleted scripts from `jsModules`
  for (const [key] of jsModules) {
    if (!freshJsModules.has(key)) jsModules.delete(key);
  }

  for (const [key, jsModule] of freshJsModules) {
    // for any changed or new scripts (probably 0 or 1 total), update`jsModules` accordingly;
    if (jsModules.get(key) === jsModule) continue;
    jsModules.set(key, jsModule);

    // we only care about modules that default-export a function
    if (jsModule.default === null) continue; // for opting out
    if (typeof jsModule.default !== 'function') {
      printInstructions(key);
      continue;
    }

    const fn = jsModule.default;

    // now we check if matching Twig is already on page, and if so we'll force a re-render
    // to ensure that the JS is always called only once on fresh mark-up 
    const twigImports = require.context('/app/components', true, /\.twig$/);
    module.hot.accept(twigImports.id); // needed to force a re-render if we find a match

    // first see if there's a corresponding Twig module
    const twigKey = twigImports.keys().find(twigKey => twigKey === key.replace(/js$/, 'twig'));
    if (!twigKey) {
      printInstructions(key);
      continue;
    }

    // now get the Twig's ID
    const twigId = twigImports(twigKey).id;
    if (!twigId) {
      printInstructions(key);
      continue;
    }

    // now see if there's a comment in the DOM w/ the Twig ID;
    // if so, invalidate that Twig module (to force the re-render)
    const nodeIterator = document.createNodeIterator(root, NodeFilter.SHOW_COMMENT);
    let currentNode;
    while (currentNode = nodeIterator.nextNode()) {
      if (currentNode.nodeValue.trim().replace(/^TWIG-START: /, '') === twigId) {
        console.log(`[STORYBOOK TWIG SCRIPT-RUNNER] hot-replacing ${twigId} to execute ${fn.name || 'anonymous function'} on fresh markup`);
        require.cache[twigImports.resolve(twigKey)].hot.invalidate();
      }
    }
  }
});

/**
 * In case a pattern-script has left listeners on anything above #root (like document or Window),
 * we intercept all added event-listeners and remove them when selecting a different story.
 * Otherwise these listeners can break behavior in other stories or when returning
 * to the story that added them (the latter is more likely and has already happened).
 * This comes with risk of breaking handlers put in place by Storybook or its add-ons;
 * that hasn't proved a problem yet, but it's worth keeping in mind. I have not
 * found a way to target only the handlers added by pattern-scripts.
 * 
 * Other changes made by pattern-level scripts to anything above #root (e.g., style-changes to
 * `body`, or MutationObservers or ResizeObservers on document or Window) likewise have the
 * potential to cause problems when switching between stories. If such problems ever arise,
 * it may be worthwhile to fix them, too.
 */

const removers = new Set();

EventTarget.prototype.nativeAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(...params) {
  removers.add(() => this.removeEventListener(...params));
  return this.nativeAddEventListener(...params);
};

new MutationObserver(() => {
  // first remove event-listeners
  removers.forEach(removeListener => removeListener());
  removers.clear();
  console.log('[STORYBOOK TWIG SCRIPT-RUNNER] all event-listeners in #storybook-preview-iframe removed');

  // remove all jQuery events if applicable
  if (window.jQuery) $('*').off();

  // also remove any dependencies fetched by pattern-scripts if they are causing problems
  // on story-switching (but be careful: don't delete if fetched by other mechanism!)
  delete window.jQuery?.magnificPopup;
  if (window.YT) window.YT = null; // it's undeletable but this allows for a boolean check on `window.YT` in code

  // and remove any elements as necessary (modals, attached outside #root, for example)
  document.querySelectorAll('body > [class*="mfp"]').forEach(e => e.remove());
  document.querySelector('script[src*="jquery-accessible-tabpanel-aria"]')?.remove();

  // then run component-level scripts as needed
  const twigIds = new Set();

  const nodeIterator = document.createNodeIterator(root, NodeFilter.SHOW_COMMENT);
  let currentNode;
  while (currentNode = nodeIterator.nextNode()) {
    const value = currentNode.nodeValue.trim();
    if (value.startsWith('TWIG-START: ')) {
      twigIds.add(value.replace(/^TWIG-START: /, ''))
    }
  }

  for (const twigId of twigIds) {
    const jsModuleId = twigId.replace(/^components/, '.').replace(/twig$/, 'js');
    const jsModule = jsModules.get(jsModuleId);

    if (!jsModule || (typeof jsModule.default !== 'function')) continue;

    const fn = jsModule.default;

    console.log(`[STORYBOOK TWIG SCRIPT-RUNNER] executing ${fn.name || 'anonymous function'} for ${twigId}`);
    fn();
  }
}).observe(root, { childList: true, subtree: false });

console.warn('[STORYBOOK TWIG SCRIPT-RUNNER] All event-listeners in\
 #storybook-preview-iframe will be removed upon selecting a different story.\
 This prevents listeners added in one story from causing problems in another\
 story (or, more likely, in the same story when returning to it), but it also\
 risks removing listeners added by Storybook or Storybook add-ons, which could\
 potentially cause problems. (No problems found yet, but be advised.)');