import React, { useCallback, useState } from "react";
import styles from "./select.less";
import cls from "classnames";
// import Fuse from "fuse.js";

export type ISelectItems = {
  key: string;
  value: string;
  isSelected?: boolean;
  label?: string;
};

export type ISelectProps = {
  /** 美杜莎文案 */
  content: Record<string, any>;
  /** 主标题 */
  title?: React.ReactNode;
  /** 数据集 */
  data: ISelectItems[];
  /** 容器样式 */
  style?: React.CSSProperties;
  /** 覆盖样式 */
  className?: string;
  /** 是否显示浮层 */
  visible: Boolean;
  /** 获取选中的值 */
  getSelectedValue: (item: ISelectItems[]) => void;
};

export const Select = (props: ISelectProps) => {
  const { className, getSelectedValue, style, visible, data, content } = props;
  const [selectItems, setSelectItems] = useState(data);
  const detail = content?.Travel?.productDetail;

  const onHandleSelectedClick = useCallback((key: string) => {
    const result = getSelectedItems(selectItems, key);
    const items = result.filter(item => item.isSelected === true);
    if (items?.length > 5) {
      showToast('You can only add up to 5 destinations');
      return;
    }
    setSelectItems(result);
    getSelectedValue(result.filter(item => item.isSelected === true));
  }, []);

  const onHandleChangeClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO(refactor): utils function to judge
    if (event.target.value === "") {
      setSelectItems(data);
      return;
    }
    const fuse = new Fuse(data, {
      keys: ["key", "value"]
    });
    const rst = fuse.search(event.target.value).map(item => {
      return item.item;
    });
    setSelectItems(rst);
  }, []);

  return (
    <div
      className={cls(styles.wrapper, className, {
        [styles.hideSelect]: !visible
      })}
      style={style}>
      <div className={styles.search}>
        <div className={styles.title}>{detail.selectDestination}</div>
        {/* <IconComponent
          id="icon-icon_edit_search_s"
          className={styles.searchIcon}
        /> */}
        <input
          className={styles.input}
          onChange={e => {
            onHandleChangeClick(e);
          }}
          placeholder="Search a destination"
        />
      </div>
      <div className={styles.searchList}>
        {selectItems && (
          <ul>
            {selectItems.map((item, key) => {
              return (
                <li
                  key={item.key}
                  onClick={() => {
                    // TODO(refactor): useDebounce
                    onHandleSelectedClick(item.key);
                  }}
                  className={cls(styles.selectItem, {
                    [styles.orange]: item.isSelected === true
                  })}
                >
                  {item.value}
                  {item.isSelected && (
                    <span className={styles.arrow}>
                      <IconComponent id="icon-Added1" className={styles.icon} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export function getSelectedItems(selectItems: ISelectItems[], key: string) {
  return selectItems.map(item => {
    if (item.key === key) {
      item.isSelected = item.isSelected === true ? false : true;
    }
    return item;
  });
}
