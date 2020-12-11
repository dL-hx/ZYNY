import React, { Component } from 'react';
import classNames from 'classnames';
import TagTabsContext from './TagTabsContext';
import styles from './index.less';

class TabPane extends Component {

  getValue(activeKey, defaultValue) {
    const { props } = this;
    return activeKey && typeof activeKey === 'string' ? props[activeKey] : defaultValue;
  }

  handleClick = (value) => {
    const { onTagChange } = this.props;
    onTagChange(value);
  };

  render() {
    const { props } = this;

    const { value, id } = props;

    const isActiveToClassName = (active, defaultValue) =>
      classNames(styles['HotListNav-item'], {
        [styles['is-active']]: active === defaultValue
      });


    const { Consumer } = TagTabsContext;

    return <Consumer>
      {context => {
        const { activeKey, activeKeyValue } = context;
        const defaultValue = this.getValue(activeKey, id);
        const cls = isActiveToClassName(activeKeyValue, defaultValue);

        return (
          <a
            {...this.props}
            className={cls}
            router="[object Object]"
            params="[object Object]"
            routes="[object Object],[object Object],[object Object],[object Object]"
            // href="/hot?list=science"
            onClick={() => this.handleClick(defaultValue)}
          >
            {value}
          </a>
        );
      }}
    </Consumer>;
  }
}
export default TabPane
