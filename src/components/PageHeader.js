function PageHeader(props) {
  return (
    <div className="width-full page-title-main">
      <div className={`page-title ${props.isTextured ? 'textured-text' : ''} ${props.isItalic ? 'font-style-italic' : ''}`}>
        <h2>{props.title}</h2>
      </div>
    </div>
  );
}

export default PageHeader;
