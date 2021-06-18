import React, { PureComponent } from 'react';

class SectionHeader extends PureComponent {
  render() {
    return (
      <div className="page-title page-title-section">
        {this.props.children}
      </div>
    );
  }
}

export default SectionHeader;
