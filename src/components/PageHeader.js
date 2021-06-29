import React, { PureComponent } from 'react';

class PageHeader extends PureComponent {
  render() {
    return (
      <div className="width-full page-title-main">
        <div className="page-title font-style-italic">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageHeader;
