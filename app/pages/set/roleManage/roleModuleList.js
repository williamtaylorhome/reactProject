import React, { Component } from 'react';
import TableList from '@tableList';
import RoleCheckbox from './roleCheckbox';

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isFirst: true,
      checkedIds: [],
    };
    this.simpleData = {};
    this.checkedArr = {};
    this.fatherArr = {};
    this.forAllData = {};
  }

  componentWillMount() {
    this.simplifySourceData(this.props.dataSource, this.simpleData);
    if (this.props.checkedId) {
      this.setState({
        checkedIds: this.props.checkedId,
      });
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.checkedId !== nextProps.checkedId) {
      this.setState({
        checkedIds: nextProps.checkedId,
      });
    }

    if (this.props.dataSource !== nextProps.dataSource) {
      this.simplifySourceData(nextProps.dataSource, this.simpleData);
    }
  }

  // #region Shrink business code function

  // Simplify the source data and retain the superior-subordinate relationship of IDs
  simplifySourceData = (obj, resultData) => {
    /* if (this.getJSONLength(obj) > 0) {
      for (const key in obj) {
        this.forAllData[obj[key].id] = obj[key]
        if (obj.hasOwnProperty(key)) {
          resultData[obj[key].id] = {}
          if (obj[key].children) {
            this.simplifySourceData(obj[key].children, resultData[obj[key].id])
          }
        }
      }
    }*/
// Use object.keys instead of for in statements
    const objArr = Object.keys(obj);
    if (objArr.length > 0) {
      objArr.map((key) => {
        this.forAllData[obj[key].id] = obj[key];
        resultData[obj[key].id] = {};
        if (obj[key].children) {
          this.simplifySourceData(obj[key].children, resultData[obj[key].id]);
        }
      });
    }
  };

  // Click whether to enable checkbox
  onChecked = (item, ischecked) => {
    let { checkedIds } = this.state;
    if (ischecked && !this.onInArray(item.id, checkedIds)) {
      // selected
      checkedIds.push(item.id);
      checkedIds = this.setChildsChecked(item.id);
      checkedIds = this.setNewFatherChecked(item.id);
    } else if (!ischecked && this.onInArray(item.id, checkedIds)) {
      // Uncheck
      checkedIds = this.removeFromArray(item.id, checkedIds);
      checkedIds = this.setChildsUnChecked(
        this.getChildById(item.id, this.simpleData),
        checkedIds,
      ); // Delete subset
      checkedIds = this.getFatherById(item.parentId);
    }
    this.setState(
      {
        checkedIds: checkedIds,
      },
      () => {
        this.props.onCheckModify(checkedIds);
      },
    );
  };

  // Determine whether there are other selected subsets under the parent based on the current ID. If not, cancel the checkid of the parent.
  getFatherById(parentId) {
    let { checkedIds } = this.state;
    if (this.forAllData[parentId]) {
      const fatherArr = this.forAllData[parentId].children;
      // When father arr is 1, it indicates that the currently canceled module has no sibling elements, and the parent is canceled directly.
      if (fatherArr.length === 1) {
        checkedIds = this.removeFromArray(parentId, checkedIds);
        const prevParentId = this.forAllData[parentId].parentId;
        if (prevParentId) {
          this.getFatherById(prevParentId);
        }
      }
      // When father arr is greater than 1, it is necessary to determine whether the sibling modules of the current module are cancelled. If there are many, no other operations will be performed. If there are none, the parent will be deleted.
      if (fatherArr.length > 1) {
        let i = 0;
        fatherArr.map((child) => {
          // this.onInArray(child.id, checkedIds) ? (i += 1) : null
          if (this.onInArray(child.id, checkedIds)) {
            return (i += 1);
          }
          return null;
        });
        if (i === 0) {
          checkedIds = this.removeFromArray(parentId, checkedIds);
          this.getFatherById(this.forAllData[parentId].parentId);
        }
      }
    }
    return checkedIds;
  }

  // Get the children of a node. Get the children of a node.
  getChildById = (id, source) => {
    /* for (const key in source) {
      if (source.hasOwnProperty(key) && eval(key) === id) {
        console.log(key)
        this.checkedArr = source[key]
      }
      if (this.getJSONLength(source[key]) > 0) {
        this.getChildById(id, source[key])
      }
    }*/
// Use object.keys instead of for in statement
    Object.keys(source).map((key) => {
      if (key.toString() === id.toString()) {
        this.checkedArr = source[key];
      }
      if (Object.keys(source[key]).length > 0) {
        this.getChildById(id, source[key]);
      }
    });
    return this.checkedArr;
  };

  // Check all subsets
  setChildsChecked = (id) => {
    const { checkedIds } = this.state;
    const data = this.forAllData[id];
    if (data.children && data.children.length > 0) {
      const dataChildren = data.children;
      dataChildren.map((child) => {
        if (!this.onInArray(child.id, checkedIds)) {
          checkedIds.push(child.id);
          if (child.children && child.children.length > 0) {
            this.setChildsChecked(child.id);
          }
        }
      });
    }
    return checkedIds;
  };

  // Check all parent tree structures
  setNewFatherChecked(id) {
    const { checkedIds } = this.state;
    if (this.forAllData[id]) {
      const { parentId } = this.forAllData[id];
      if (parentId && !this.onInArray(parentId, checkedIds)) {
        checkedIds.push(parentId);
        this.setNewFatherChecked(parentId);
      }
    }
    return checkedIds;
  }

  // Set all subsets of a selected element to unselected
  setChildsUnChecked = (obj, results) => {
    /* for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (this.onInArray(eval(key), results)) {
          results = this.removeFromArray(eval(key), results)
        }
        if (this.getJSONLength(obj[key])) {
          results = this.setChildsUnChecked(obj[key], results)
        }
      }
    }
    return results*/
// Use object.keys instead of for in statement
    let resultsArr = results;
    Object.keys(obj).map((key) => {
      if (this.onInArray(parseInt(key, 10), resultsArr)) {
        // resultsArr = resultsArr.filter(item => item !== parseInt(key, 10))
        resultsArr = this.removeFromArray(parseInt(key, 10), resultsArr);
      }
      if (Object.keys(obj[key])) {
        resultsArr = this.setChildsUnChecked(obj[key], resultsArr);
      }
    });
    return resultsArr;
  };

  // Delete an element from an array
  removeFromArray(item, arr) {
    const array = arr;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === item) {
        array.splice(i, 1);
        return array;
      }
    }
  }

  // Determine whether an element is in an array
  onInArray(item, arr) {
    const array = arr || [];
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === item) {
        return true;
      }
    }
    return false;
  }

  // Get json object length
  /* getJSONLength(obj) {
    const count = 0
    //for (const key in obj) {
    //  if (obj.hasOwnProperty(key)) {
    //    count += 1
    //  }
    //}
    //return count
    return Object.keys(obj).length
  }*/

  columns() {
    const _self = this;
    const { buttonList } = this.props;
    const checkedIds = this.props.checkedId;
    // if (sessionStorage.getItem('roleName') === '0') {
    return [
      {
        title: 'Function',
        dataIndex: 'resName',
        key: 'resName',
        width: '30%',
      },
      {
        title: 'Selected module',
        dataIndex: 'checkedArr',
        key: 'checkedArr',
        width: '40%',
      },
      {
        title: 'operate',
        dataIndex: 'id',
        width: '30%',
        render: function (text, record, index) {
          return (
            // sessionStorage.getItem('roleName') === '0' ?

            <span>
              <span>
                <RoleCheckbox
                  checkItem={record}
                  onChecked={_self.onChecked}
                  defaultChecked={_self.onInArray(record.id, checkedIds)}
                  nowRoleName={_self.props.nowRoleName}
                />
              </span>
              <span className="ant-divider" />
              <a onClick={() => buttonList(record.id, record.parentid)}>Button permissions</a>
            </span>
            // : null
          );
        },
      },
    ];
    // }
// return (
//   [{
//     title: 'Function',
//     dataIndex: 'resName',
//     key: 'resName',
//     width: '30%',
//   }, {
//     title: 'Selected module',
//     dataIndex: 'checkedArr',
//     key: 'checkedArr',
//     width: '40%',
//   }]
// )
  }

  // #endregion

  render() {
    const { dataSource } = this.props;
    return (
      <div className="flexcolumn roleModuleList">
        <TableList
          rowKey="id"
          columns={this.columns()}
          dataSource={dataSource}
          scroll={{ y: true }}
          indentSize={30}
        />
      </div>
    );
  }
}
