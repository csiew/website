function NotFound() {
  return (
    <div className="width-full height-full vstack align-center justify-center padding-xl">
      <span className="font-weight-900 font-scale-xxl text-color-tertiary margin-xl-bottom noselect">
        Oops, nothing here!
      </span>
      <iframe className="card-border-radius width-full width-max-480 height-full height-max-320" src="https://www.youtube.com/embed/-q6pIZD4ljU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  );
}

export default NotFound;
