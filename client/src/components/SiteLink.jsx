import { navigate } from '../router';

export function SiteLink({ to, children, ...props }) {
  const open = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={open} {...props}>{children}</a>;
}
