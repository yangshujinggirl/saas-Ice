import React, { PureComponent } from 'react';

export default class Title extends PureComponent {
    render() {
        let {title} = this.props;

        return (
            <legend className="pch-legend">
                <span className="pch-legend-legline"></span>
                {title}
            </legend>
            );
    }
}
