import PropTypes from 'prop-types';

function PageLayout({title, children}) {
  return (
    <>
      {title ? <h3>{title}</h3> : null}
      {children}
    </>
  );
}

PageLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object
};

export default PageLayout;