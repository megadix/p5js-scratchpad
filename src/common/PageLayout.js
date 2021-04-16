import PropTypes from 'prop-types';
import {Helmet} from "react-helmet-async";
import config from "../config/config";

function PageLayout({title, suppressInPageTitle, description, children}) {
  const metaTitle = `${config.websiteTitle} | ${title}`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle}/>
        {description ? <meta property="og:description" content={description}/> : null}
      </Helmet>
      {!!!suppressInPageTitle ? <h3>{title}</h3> : null}
      {children}
    </>
  );
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  suppressInPageTitle: PropTypes.bool,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default PageLayout;