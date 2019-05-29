/* eslint react/prop-types: 0 */
/* eslint react/no-multi-comp: 0 */

import React from 'react';

export function autoScrollTop(Comp) {
  return class _ extends React.Component {
    constructor(props) {
      super(props);
      this.container = React.createRef();
    }

    componentDidMount() {
      setTimeout(() => {

        var scrollMilestone = document.getElementById("scroll-milestone");

        if (scrollMilestone) {
          document.getElementById('scroll-milestone').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
          });
        }

        var placeholderElement2 = document.getElementById("placeholder-element2");

        if (placeholderElement2) {
          document.getElementById('placeholder-element2').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
          });
        }
      }, 200)

    }

    render() {
      return (
        <div ref={this.container}>
          <Comp ref={this.container} {...this.props} />
        </div>
      );
    }
  };
}
