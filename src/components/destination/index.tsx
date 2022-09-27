import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
import { connect, } from "umi";
import { RootState } from "@/types/global";
import styles from "./index.less";
import classnames from "classnames/bind";
import useProductModel from "@/models/quotation";
import './select.less';
import { ISelectItems } from './Select/Select";
import { Popover, Tooltip } from "antd";
import Select, { Option } from 'rc-select';
import showToast from 'show-toast';
import { dispatch } from "@/utils/request";
import { Tools } from "@/utils";
import IconComponent from "@/components/IconComponent";
const children = [];


/** 
 * TODO:
 * 1、作为通用的组件, 逻辑不应该耦合在组件里面.
 * 2、组件做纯 UI 组件.
 */
for (let i = 10; i < 36; i += 1) {
  children.push(
    <Option key={i.toString(36) + i} test={i}>
      {i.toString(36) + i}
    </Option>,
  );
}

const cx = classnames.bind(styles);

interface Props {
  content: Record<string, any>; // 美杜莎数据
  type?: string;
  DEFAULT_DATA?: ISelectItems[];
  enumerationHighlightList: ISelectItems[];
  VPTrialFactorDescStyle?: string;
  VPTrialFactorDescContent?: string;
}

const Destination: FC<Props> = ({ content, type = "int", DEFAULT_DATA, enumerationHighlightList, VPTrialFactorDescStyle, VPTrialFactorDescContent }) => {
  const productModel = useProductModel();
  const [destination, setDestination] = useState<ISelectItems[]>(DEFAULT_DATA as ISelectItems[])
  const [destinationTemplate, setDestinationTemplate] = useState<ISelectItems[]>(DEFAULT_DATA as ISelectItems[])
  destination?.sort((a, b) => {
    return (a.value).localeCompare(b.value)
  })
  const [currentDestination, setCurrentDestination] = useState('');
  const common = content?.Travel?.productDetail;
  const [selectVisible, setSelectVisible] = useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState();

  useEffect(() => {
    const children: any = [];
    if (destinationTemplate?.length < destination?.length) {
      destinationTemplate && destinationTemplate?.map((item, index) => {
        children.push(
          <Option key={item.key} value={item.value}>
            {item.value}
          </Option>
        );
      });
    } else {
      destination && destination?.map((item, index) => {
        children.push(
          <Option key={item.key} value={item.value}>
            {item.value}
          </Option>
        );
      });
    }
    setOptions(children);
  }, [destination, destinationTemplate]);


  useMemo(() => {
  }, []);


  const onHandleChangeClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setDestinationTemplate(destination);
      return;
    }
    const list = destination.filter((dest) => dest.value.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0);
    setDestinationTemplate(list);

  }, []);

  const onRemoveHandleClick = (item: ISelectItems, index: number) => {
    const newDestination = productModel.destination.filter((destination, index) => { return destination.value !== item.value });
    productModel.addDestinationVal(newDestination);
    dispatch({ type: "product/saveDestination", payload: newDestination });
    if (newDestination?.length) {
    } else {
      showToast(common.selectDestinationTip)
    }
  };

  const handleSelect = (item: ISelectItems) => {
    const options: ISelectItems[] = Tools.deepClone(productModel.destination) || [];
    const flag = options.find(option => option.key === item.key)

    if (options && options?.length >= 5 && !flag) {
      showToast(common.addlimit);
      return;
    }
    if (!flag) {
      options.push(item)
    } else {
      options.forEach((element, index: number) => {
        if (element.key === item.key) {
          options.splice(index, 1)
        }
      });
    }
    if (options?.length <= 0) {
      showToast(common.selectDestinationTip)
    }
    let seleteds: ISelectItems[] = [];
    options.map((item, key) => {
      if (item.key) {
        seleteds.push({
          key: item.key,
          value: item.value,
          isSelected: true
        })
      }
    })
    productModel.addDestinationVal(seleteds);
    dispatch({ type: "product/saveDestination", payload: seleteds });
  }

  const singleItemIcon = (
    <span className={styles.arrow}>
      <IconComponent id="icon-Added1" className={styles.icon} />
    </span>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.destination}>
        <span>{common.destination}</span>
        {
          VPTrialFactorDescStyle === "DIALOG" &&
          <Tooltip
            color={"#fff"}
            trigger={['hover', 'focus', 'click', 'contextMenu']}
            getPopupContainer={(node: any) =>
              node.parentElement || document.body
            }
            placement="top"
            title={<div className={styles.tooltip}>{VPTrialFactorDescContent}</div>}
          >
            <div>
              <IconComponent id="icon-tips1" className={styles.icon} />
            </div>
          </Tooltip>
        }
      </div>
      <div className={styles.countryWrapper}>
        {type === 'int' ? <>
          {
            productModel.destination && productModel.destination?.length > 0 &&
            productModel.destination.map((item: ISelectItems, index: number) => {
              return (
                <div
                  className={styles.country}
                  key={index}
                  onClick={() => {
                    onRemoveHandleClick(item, index);
                  }}>
                  {item.value}
                  {type === "int" && (
                    <IconComponent
                      id="icon-Popup_Colse"
                      className={styles.icon}
                    />
                  )}
                </div>
              )
            })}
          {type === "int" && (
            <Popover
              placement="bottomLeft"
              overlayInnerStyle={{
                padding: "0px",
                margin: "0px"
              }}
              overlayClassName={styles.pop}
              trigger="click"
              visible={selectVisible}
              onVisibleChange={(newVisible: boolean) => {
                setIsOpen(newVisible);
                setSelectVisible(newVisible);
              }}
              // search-wrapper
              content={
                <Select
                  getRawInputElement={() => <span></span>}
                  placeholder={common.selectDestinationPlaceholder}
                  mode="multiple"
                  listHeight={327}
                  style={{ width: '400px' }}
                  disabled={disabled}
                  maxTagCount={5}
                  showSearch
                  maxTagTextLength={10}
                  menuItemSelectedIcon={singleItemIcon}
                  value={productModel.destination || []}
                  onChange={(val: string[], option) => {
                    if (val && val?.length > 5) {
                      showToast(common.addlimit);
                      return;
                    }
                    let options: ISelectItems[] = [];
                    val.forEach(item => {
                      destination.forEach(element => {
                        if (element.value == item) {
                          options.push(element)
                        }
                      });
                    });

                    if (options && options?.length > 0) {
                      let seleteds: ISelectItems[] = [];
                      options?.map((item, key) => {
                        if (item.key) {
                          seleteds.push({
                            key: item.key,
                            value: item.value,
                            isSelected: true
                          })
                        }
                      })
                      productModel.addDestinationVal(seleteds);
                      dispatch({ type: "product/saveDestination", payload: seleteds });
                      onHandleQuotationCalculated(undefined, undefined, seleteds);
                    }
                  }}
                  open={isOpen}
                  tokenSeparators={[' ', ',']}
                  // tagRender={tagRender}
                  allowClear
                  optionFilterProp="children"
                  optionLabelProp="children"
                  onFocus={() => console.log('focus')}
                  onBlur={() => console.log('blur')}
                  dropdownRender={menu => {
                    return <div className={styles.searchWrapper}>
                      <div className={styles.search}>
                        <div className={styles.title}>{common.selectDestination}</div>
                        <IconComponent
                          id="icon-icon_edit_search_s"
                          className={styles.searchIcon}
                        />
                        <input
                          className={styles.input}
                          onChange={e => {
                            onHandleChangeClick(e);
                          }}
                          placeholder={common.selectDestinationPlaceholder}
                        />
                      </div>
                      <div className={styles.hotCountry}>
                        <div className={styles.hotCountryTitle}>{common.popular}</div>
                        <div className={styles.hotCountries}>
                          {
                            enumerationHighlightList.map(item =>
                              <div
                                key={item.key}
                                className={cx('countryItem', { 'selected': productModel.destination.find(country => country.key === item.key) })}
                                onClick={() => handleSelect(item)}
                              >
                                {item.value}
                              </div>)
                          }
                        </div>
                      </div>
                      <div>
                        {menu}
                      </div>
                    </div>
                  }
                  }>
                  {options}
                </Select>
              }>
              <div className={cx({
                [styles.add]: !selectVisible,
                [styles.country2]: selectVisible
              })}>
                <IconComponent
                  id="icon-a-icon_addpersoncovered"
                  className={cx(styles.icon)}
                />
                {common.add}
              </div>
            </Popover>
          )}
        </> : <div className={styles.country}>
          {
            currentDestination
          }</div>}
      </div>
    </div>
  );
};

export default connect((state: RootState) => ({
  content: state.global?.medusaContent
}))(React.memo(Destination));
