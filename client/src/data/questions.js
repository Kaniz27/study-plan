export const quizCategories = ['Html', 'Css', 'Javascript', 'React'];
export const quizDifficulties = ['All', 'Easy', 'Medium', 'High'];
export const MAX_QUESTIONS = 20;

const make = (category, rows) => rows.map(([difficulty, q, options, answer], index) => ({ id: `${category}-${index}`, category, difficulty, q, options, answer }));

export const questionBank = [
  ...make('Html', [
    ['Easy', 'What does HTML stand for?', ['Hyper Text Markup Language', 'High Text Machine Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language'], 0],
    ['Easy', 'Which tag creates the largest heading?', ['<h6>', '<heading>', '<h1>', '<head>'], 2],
    ['Easy', 'Which element creates an unordered (bulleted) list?', ['<ol>', '<ul>', '<li>', '<list>'], 1],
    ['Easy', 'Which attribute provides alternative text for an image?', ['title', 'src', 'alt', 'href'], 2],
    ['Easy', 'Which tag inserts a single line break?', ['<br>', '<lb>', '<break>', '<hr>'], 0],
    ['Medium', 'Which semantic element wraps the main navigation links of a page?', ['<div>', '<nav>', '<section>', '<menu>'], 1],
    ['Medium', 'Which input type shows a date picker?', ['type="calendar"', 'type="datetime-text"', 'type="date"', 'type="day"'], 2],
    ['Medium', 'What does the "for" attribute of a <label> point to?', ['The class of the input', 'The id of a form control', 'The name of the form', 'The href of a link'], 1],
    ['Medium', 'Which tag defines a header cell inside a table?', ['<th>', '<thead>', '<td>', '<tr>'], 0],
    ['Medium', 'Which attribute makes a form field mandatory?', ['mandatory', 'required', 'validate', 'must'], 1],
    ['High', 'What is the purpose of <!DOCTYPE html>?', ['It links a stylesheet', 'It tells the browser to render the page in standards mode as HTML5', 'It defines the page title', 'It imports JavaScript'], 1],
    ['High', 'Which <script> attribute downloads in parallel and runs after the document is parsed, keeping script order?', ['async', 'defer', 'lazy', 'preload'], 1],
    ['High', 'How should a link that opens in a new tab be written to avoid exposing window.opener?', ['target="_blank" only', 'target="_blank" rel="noopener noreferrer"', 'target="new"', 'rel="external"'], 1],
    ['High', 'Which element gives a <figure> its caption?', ['<caption>', '<figcaption>', '<legend>', '<title>'], 1],
    ['High', 'What does <meta name="viewport" content="width=device-width, initial-scale=1"> do?', ['Sets the page language', 'Controls page scaling on mobile devices', 'Adds search keywords', 'Blocks zooming'], 1]
  ]),
  ...make('Css', [
    ['Easy', 'Which property changes the text color?', ['font-color', 'color', 'text-color', 'fg'], 1],
    ['Easy', 'Which symbol selects an element by class?', ['#', '.', '*', '&'], 1],
    ['Easy', 'Which property sets the background color?', ['bgcolor', 'background-color', 'color-bg', 'background-fill'], 1],
    ['Easy', 'What does the margin property control?', ['Space inside an element', 'Space outside an element', 'Border thickness', 'Text size'], 1],
    ['Easy', 'Which declaration hides an element and removes it from the layout?', ['visibility: hidden', 'display: none', 'opacity: 0', 'position: absolute'], 1],
    ['Medium', 'Which declaration creates a flex container?', ['display: flex', 'display: flexbox', 'display: flex-box', 'flex: container'], 0],
    ['Medium', 'In the box model, what is the order from the inside out?', ['content, border, padding, margin', 'content, padding, border, margin', 'padding, content, margin, border', 'margin, border, padding, content'], 1],
    ['Medium', 'Which property controls the stacking order of positioned elements?', ['order', 'stack', 'z-index', 'layer'], 2],
    ['Medium', 'What does position: sticky do?', ['Fixes the element to the viewport permanently', 'Acts relative until a scroll threshold, then sticks like fixed', 'Removes the element from normal flow', 'Centers the element'], 1],
    ['Medium', 'Which unit is relative to the root element\'s font size?', ['em', 'rem', 'px', '%'], 1],
    ['High', 'Which selector has the highest specificity?', ['A class selector', 'An ID selector', 'An element selector', 'The universal selector'], 1],
    ['High', 'Which declaration defines three equal-width columns in CSS Grid?', ['grid-template-columns: repeat(3, 1fr)', 'grid-columns: 3', 'columns: grid(3)', 'grid-template: 3 columns'], 0],
    ['High', 'What does box-sizing: border-box do?', ['Excludes padding and border from the width', 'Includes padding and border in the element\'s width and height', 'Adds a border automatically', 'Removes the margin'], 1],
    ['High', 'Which selector targets every second child element?', [':nth-child(2n)', ':second', ':child(2)', ':every(2)'], 0],
    ['High', 'What does @media (max-width: 600px) do?', ['Applies styles only when the viewport is 600px wide or narrower', 'Applies styles only above 600px', 'Sets the maximum width of every element', 'Loads a print stylesheet'], 0]
  ]),
  ...make('Javascript', [
    ['Easy', 'Which keyword declares a block-scoped variable that can be reassigned?', ['var', 'let', 'const', 'def'], 1],
    ['Easy', 'What does typeof "hello" return?', ['"text"', '"string"', '"char"', '"word"'], 1],
    ['Easy', 'Which method adds an item to the end of an array?', ['push()', 'pop()', 'shift()', 'unshift()'], 0],
    ['Easy', 'How do you write a single-line comment in JavaScript?', ['<!-- comment -->', '// comment', '# comment', '** comment'], 1],
    ['Easy', 'Which operator checks both value and type equality?', ['==', '=', '===', '!='], 2],
    ['Medium', 'Which method transforms an array by applying a function to each element and returning a new array?', ['filter', 'map', 'reduce', 'forEach'], 1],
    ['Medium', 'What does console.log(0.1 + 0.2 === 0.3) print?', ['true', 'false', 'undefined', 'NaN'], 1],
    ['Medium', 'What does Array.prototype.filter return?', ['A single value', 'A new array with the elements that pass the test', 'The original array, mutated', 'undefined'], 1],
    ['Medium', 'Which statement about const is true?', ['Objects declared with const cannot be mutated', 'The binding cannot be reassigned', 'It is function scoped', 'It is hoisted with the value undefined'], 1],
    ['Medium', 'What does JSON.parse(\'{"a":1}\') return?', ['A string', 'An object { a: 1 }', 'An array', 'undefined'], 1],
    ['High', 'What is a closure?', ['A function bundled with references to its surrounding scope', 'A way to close browser tabs', 'A function with no return value', 'A loop that ends early'], 0],
    ['High', 'What does await do inside an async function?', ['Blocks the whole thread', 'Pauses that function until the promise settles', 'Turns a promise into a callback', 'Creates a new thread'], 1],
    ['High', 'What is the value of [] + [] ?', ['[]', '0', 'An empty string', 'undefined'], 2],
    ['High', 'Which best describes the event loop?', ['It runs JavaScript on many threads', 'It moves queued callbacks and microtasks onto the call stack when it is empty', 'It only handles DOM events', 'It garbage-collects unused memory'], 1],
    ['High', 'What does "this" refer to inside an arrow function?', ['The function itself', 'Always the global object', 'The "this" of the enclosing scope', 'Always undefined'], 2]
  ]),
  ...make('React', [
    ['Easy', 'What is JSX?', ['A syntax extension that lets you write HTML-like markup in JavaScript', 'A CSS preprocessor', 'A database query language', 'A build tool'], 0],
    ['Easy', 'Which hook adds state to a function component?', ['useEffect', 'useState', 'useRef', 'useMemo'], 1],
    ['Easy', 'How does a parent component pass data to a child?', ['Props', 'Cookies', 'Refs', 'Reducers only'], 0],
    ['Easy', 'What should each item in a rendered list have for stable identity?', ['A key prop', 'A ref', 'A className', 'A CSS id'], 0],
    ['Easy', 'What must a React component name start with?', ['A lowercase letter', 'An uppercase letter', 'An underscore', 'A number'], 1],
    ['Medium', 'When does useEffect(() => { ... }, []) run?', ['On every render', 'Once, after the first render', 'Only when props change', 'Before rendering'], 1],
    ['Medium', 'How should you update state that depends on the previous state?', ['Mutate it directly', 'Use the functional form: setX(prev => ...)', 'Reassign the variable', 'Call render()'], 1],
    ['Medium', 'Which hook keeps a mutable value between renders without triggering a re-render?', ['useState', 'useRef', 'useContext', 'useReducer'], 1],
    ['Medium', 'What is useMemo for?', ['Fetching data', 'Caching an expensive computed value between renders', 'Creating context', 'Handling side effects'], 1],
    ['Medium', 'What does "lifting state up" mean?', ['Moving state to a common parent so siblings can share it', 'Saving state in localStorage', 'Moving state to the server', 'Deleting unused state'], 0],
    ['High', 'Why should you not mutate state directly?', ['It is slower to type', 'React may not detect the change and skip the re-render', 'It throws a syntax error', 'It deletes props'], 1],
    ['High', 'When does the cleanup function returned from useEffect run?', ['Before the next effect run and on unmount', 'Only on the first render', 'When state resets', 'When rendering is cancelled'], 0],
    ['High', 'What does React.memo do?', ['Skips re-rendering a component when its props are unchanged', 'Stores data in memory permanently', 'Creates a memo field', 'Optimizes CSS'], 0],
    ['High', 'What is the virtual DOM?', ['A lightweight in-memory representation React compares to update the real DOM efficiently', 'A second browser window', 'A CSS engine', 'A server-side database'], 0],
    ['High', 'Why can effects run twice on mount in development with StrictMode?', ['It is a React bug', 'To help surface missing cleanup and impure logic', 'To double performance', 'Only because of hot reload'], 1]
  ])
];
