import { tools } from '../../data/siteContent';
import SiteLayout from './SiteLayout';
import HomePage from './HomePage';
import FeaturePage from './FeaturePage';

export default function PublicSite({ path }) {
  const tool = tools.find((item) => item.path === path);
  return <SiteLayout path={tool ? path : '/'}>{tool ? <FeaturePage key={tool.id} tool={tool} /> : <HomePage />}</SiteLayout>;
}
