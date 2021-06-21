import PageHeader from "./PageHeader";

export function MainSidebarView(props) {
  return (
    <div className={`width-full responsive-row margin-auto-horizontal padding-s-left padding-s-right ${props.className ? props.className : ''}`}>
      <div
        className={`width-full height-auto padding-s padding-m-top grid grid-col-1 grid-gap-xl ${props.mainClassName ? props.mainClassName : ''}`}
        style={{
          flexGrow: "2",
          flexShrink: "1"
        }}
      >
        {props.main}
      </div>
      {
        props.sidebar ?
          <div
            className={`width-full height-auto padding-s padding-m-top grid grid-col-1 grid-gap-xl ${props.sidebarClassName ? props.sidebarClassName : ''}`}
            style={{
              flexGrow: "1",
              flexShrink: "2"
            }}
          >
            {props.sidebar}
          </div>
        :
          ''
      }
    </div>
  )
}

export function DynamicPageView(props) {
  return (
    <div className={`width-full margin-auto-horizontal grid grid-col-1 ${props.className ? props.className : ''}`}>
      {
        props.title ?
          <PageHeader>
            <h2>{props.title}</h2>
          </PageHeader>
        :
          ''
      }
      { props.children }
      <MainSidebarView
        mainClassName={props.mainClassName}
        sidebarClassName={props.sidebarClassName}
        main={props.main}
        sidebar={props.sidebar}
      />
    </div>
  );
}
