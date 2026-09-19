import { BarChart3, BookOpen, CalendarCheck2, CalendarDays, CheckCircle2, CircleHelp, Clock3, Droplet, FileText, Filter, History, Home, Layers, ListChecks, NotebookPen, Palette, Pencil, PieChart, Search, StickyNote, Tag, Target, Timer, TrendingUp, Wallet } from 'lucide-react';

export const homeNav = { path: '/', label: 'Home', icon: Home, color: '#6366f1' };

export const tools = [
  {
    id: 'schedule', path: '/schedule', label: 'Schedule', icon: CalendarDays, tone: 'blue', color: '#2563eb', color2: '#06b6d4',
    title: 'Never miss a ', accent: 'class again.',
    summary: 'Keep every lecture, lab and study session in one clear timeline.',
    lead: 'Keep every lecture, lab and study session in one clear timeline. Search by subject or instructor, sort the way you think, and see what is coming up at a glance.',
    bullets: ['Add classes with time, instructor and room', 'Search, sort and filter in one tap', 'Today and upcoming sessions highlighted'],
    cta: 'Plan my schedule',
    highlights: [
      { icon: Clock3, title: 'Time & place', text: 'Add start and end times, instructors and rooms for every session.' },
      { icon: Search, title: 'Instant search', text: 'Find any class by subject, instructor, room or description as you type.' },
      { icon: Filter, title: 'Flexible sorting', text: 'Sort by date, subject, instructor or start time — ascending or descending.' },
      { icon: CalendarCheck2, title: 'Today at a glance', text: 'Today and upcoming classes get their own badges so nothing slips.' },
      { icon: Pencil, title: 'Edit anytime', text: 'Plans change. Update or delete a class in two clicks.' },
      { icon: Palette, title: 'Colour coded', text: 'Every subject gets its own colour so your week is easy to scan.' }
    ],
    steps: [['Add your classes', 'Enter the subject, date, time and where it happens.'], ['Search & sort', 'Filter your list the way you think — by day, subject or teacher.'], ['Stay on track', 'Check today’s sessions and what is coming up next.']]
  },
  {
    id: 'budget', path: '/budget', label: 'Budget', icon: PieChart, tone: 'green', color: '#059669', color2: '#84cc16',
    title: 'Know where every ', accent: 'dollar goes.',
    summary: 'Log income and expenses in seconds and see if you are within budget.',
    lead: 'Log income and expenses in seconds and watch your month take shape. A live overview tells you instantly whether you are within budget — before the month ends.',
    bullets: ['Income and expense tracking by category', 'Monthly overview chart and budget limit', 'Spending breakdown that shows your habits'],
    cta: 'Track my spending',
    highlights: [
      { icon: Wallet, title: 'Income & expenses', text: 'Record every allowance, scholarship, lunch or textbook in seconds.' },
      { icon: PieChart, title: 'Monthly overview', text: 'A clear donut chart of what came in and what went out this month.' },
      { icon: Target, title: 'Budget limit', text: 'Set a monthly limit and get a clear within-budget or over-budget status.' },
      { icon: BarChart3, title: 'Category breakdown', text: 'See which categories take the biggest bite out of your money.' },
      { icon: Tag, title: 'Priority tags', text: 'Mark each transaction Low, Medium or High priority.' },
      { icon: History, title: 'Searchable history', text: 'Filter by income or expense and search any past transaction.' }
    ],
    steps: [['Add a transaction', 'Choose income or expense, pick a category and enter the amount.'], ['Set your limit', 'Decide how much you want to spend this month.'], ['Check your status', 'Watch the overview and adjust before you overspend.']]
  },
  {
    id: 'exam', path: '/exam', label: 'Exam Q&A', icon: CircleHelp, tone: 'violet', color: '#7c3aed', color2: '#ec4899',
    title: 'Practise smarter, ', accent: 'score higher.',
    summary: 'Build custom quizzes, revise key topics and track your progress.',
    lead: 'Build a custom quiz from HTML, CSS, JavaScript and React questions, set a timer, and review every answer. Your progress charts show what to revise next.',
    bullets: ['Choose topics, difficulty and quiz length', 'Optional countdown timer for exam pressure', 'Study materials and a progress tracker'],
    cta: 'Take a quiz',
    highlights: [
      { icon: FileText, title: 'Custom quizzes', text: 'Pick categories, difficulty and up to 20 questions per quiz.' },
      { icon: Timer, title: 'Countdown timer', text: 'Switch on a timer and the quiz submits itself when time is up.' },
      { icon: Layers, title: 'Four subjects', text: 'HTML, CSS, JavaScript and React with easy, medium and high questions.' },
      { icon: BookOpen, title: 'Study materials', text: 'Quick revision notes for every topic with links to the official docs.' },
      { icon: CheckCircle2, title: 'Instant review', text: 'See every right and wrong answer, with the correct one highlighted.' },
      { icon: TrendingUp, title: 'Progress tracking', text: 'Score trends and accuracy by topic show what to practise next.' }
    ],
    steps: [['Set up your quiz', 'Choose topics, difficulty, length and an optional timer.'], ['Answer the questions', 'Move through one question at a time and jump back anytime.'], ['Review & improve', 'Read the review, revise the topic and try again.']]
  },
  {
    id: 'planner', path: '/planner', label: 'Planner', icon: NotebookPen, tone: 'orange', color: '#ea580c', color2: '#f43f5e',
    title: 'Turn big goals into ', accent: 'small wins.',
    summary: 'Break your workload into colour-coded tasks and tick them off.',
    lead: 'Break your workload into colour-coded tasks with a date, time and duration. Tick them off as you go and let the progress cards keep you motivated.',
    bullets: ['Colour themes to group subjects or priorities', 'Pending and completed at a glance', 'Notes for chapters, links and reminders'],
    cta: 'Open my planner',
    highlights: [
      { icon: ListChecks, title: 'Task manager', text: 'One tidy list for everything you need to do, sorted by date and time.' },
      { icon: Droplet, title: 'Colour themes', text: 'Pick a colour for every task to group subjects or priorities.' },
      { icon: Clock3, title: 'Time & duration', text: 'Plan when a task starts and how long it should take.' },
      { icon: Filter, title: 'Search & filter', text: 'Find tasks by title or notes and filter pending or completed.' },
      { icon: StickyNote, title: 'Notes', text: 'Add chapters, links and reminders to remember the details.' },
      { icon: CheckCircle2, title: 'Progress cards', text: 'Total, completed and pending counts keep you motivated.' }
    ],
    steps: [['Plan a task', 'Give it a title, date, time, duration and a colour.'], ['Work through the list', 'Tick tasks off as you finish them.'], ['See your progress', 'Watch completed tasks add up on your progress cards.']]
  }
];

export const navItems = [homeNav, ...tools];
