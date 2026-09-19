export const materials = [
  {
    category: 'Html', title: 'HTML', tagline: 'The structure of every web page.', tint: '#ea580c', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    topics: [
      { name: 'Semantic structure', points: ['Use header, nav, main, section, article and footer instead of anonymous divs.', 'Keep one h1 per page and never skip heading levels.', 'Landmarks help screen readers and search engines understand your page.'] },
      { name: 'Forms', points: ['Connect every input to a label with matching for and id.', 'Use the right input type: email, date, number, tel.', 'required, minlength and pattern give you free browser validation.'] },
      { name: 'Links & media', points: ['Always write meaningful alt text; use alt="" for decorative images.', 'Pair target="_blank" with rel="noopener noreferrer".', 'Use srcset and <picture> to serve responsive images.'] },
      { name: 'Page setup', points: ['Start with <!DOCTYPE html> and set the lang attribute on <html>.', 'The viewport meta tag makes layouts behave on phones.', 'Load scripts with defer so they never block parsing.'] }
    ]
  },
  {
    category: 'Css', title: 'CSS', tagline: 'Style, layout and responsive design.', tint: '#2563eb', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    topics: [
      { name: 'Box model & units', points: ['Content, padding, border, margin — from the inside out.', 'box-sizing: border-box makes widths include padding and border.', 'Prefer rem for type and spacing, % and fr for layout.'] },
      { name: 'Flexbox', points: ['display: flex arranges children along one axis.', 'justify-content aligns on the main axis, align-items on the cross axis.', 'gap adds spacing between items without margins.'] },
      { name: 'Grid', points: ['grid-template-columns: repeat(3, 1fr) builds equal columns.', 'auto-fit with minmax() creates responsive card grids.', 'Use grid for two-dimensional layouts, flex for one-dimensional rows.'] },
      { name: 'Responsive design', points: ['Design mobile-first and add min-width media queries.', 'clamp(min, preferred, max) gives fluid type sizes.', 'Specificity: inline > id > class > element — avoid !important.'] }
    ]
  },
  {
    category: 'Javascript', title: 'JavaScript', tagline: 'Logic, data and interactivity.', tint: '#ca8a04', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    topics: [
      { name: 'Variables & types', points: ['Prefer const, use let when you must reassign, avoid var.', 'Use === instead of == to avoid surprising coercion.', 'typeof, Number.isNaN and Array.isArray help check values safely.'] },
      { name: 'Functions & scope', points: ['Arrow functions keep the surrounding "this".', 'A closure is a function that remembers the scope it was created in.', 'Default parameters and rest/spread keep functions flexible.'] },
      { name: 'Arrays & objects', points: ['map transforms, filter selects, reduce combines.', 'Destructuring pulls values out of arrays and objects concisely.', 'Spread ({ ...obj }, [...arr]) copies without mutating.'] },
      { name: 'Async JavaScript', points: ['A promise is settled once: fulfilled or rejected.', 'async/await reads like synchronous code — wrap it in try/catch.', 'fetch resolves on HTTP errors too; check response.ok.'] }
    ]
  },
  {
    category: 'React', title: 'React', tagline: 'Build interfaces from components.', tint: '#0891b2', link: 'https://react.dev/learn',
    topics: [
      { name: 'Components & props', points: ['Components are functions that return JSX and start with a capital letter.', 'Props flow down from parent to child and are read-only.', 'Split UI into small components that do one job.'] },
      { name: 'State & events', points: ['useState stores values that change over time.', 'Never mutate state — create a new array or object.', 'Use the functional update form when the next value depends on the last.'] },
      { name: 'Effects', points: ['useEffect synchronises your component with something outside React.', 'The dependency array decides when the effect re-runs.', 'Return a cleanup function to stop timers and subscriptions.'] },
      { name: 'Patterns & performance', points: ['Give list items a stable key, never the array index for dynamic lists.', 'Lift state up to the closest common parent to share it.', 'useMemo, useCallback and React.memo help only when profiling shows a need.'] }
    ]
  }
];
