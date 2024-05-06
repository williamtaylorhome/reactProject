import React from "react";
import Enzyme from "../../../Enzyme.js";
import UserName from "../../../../app/pages/set/userManage/index";
import TreeList from "../../../../app/pages/set/userManage/treeList";
import UserList from "../../../../app/mocks/apis/sys/userManage/fetchUserList";
import AddPolice from "../../../../app/pages/set/userManage/modal/addPolice";
import userDeptResult from "../../../../app/mocks/apis/sys/userManage/fetchUserDepttList";
import TableList from "../../../../app/components/tableList/tableList";
jest.mock("../../../../app/configs/ajax");
jest.mock("../../../../app/apis/manage");

let form;
Enzyme.mount(<UserName wrappedComponentRef={node => (form = node)} />);
let UserManage = Enzyme.mount(
  <UserName.WrappedComponent form={form.props.form} />
);
const param = {
  deptCode: "370200000000"
};
UserManage.setState({
  searchKey: param,
  userListResult: UserList.data,
  userDeptResult: userDeptResult.data,
  btnRights: {
    view: false,
    freeze: false,
    delete: false,
    edit: false,
    add: false
  } // Array of button permissions
});

UserManage.setState({
  btnRights: {
    view: true,
    freeze: true,
    delete: true,
    edit: true,
    add: true
  } // Array of button permissions
});
// Search button click
test("search", () => {
  const event = {
    preventDefault: function() {}
  };
  UserManage.instance().handleSearch(event);
});

// New
test("handleChangeStatusAdd", () => {
  UserManage.setState({
    searchKey: {
      deptCode: null
    }
  });
  UserManage.find("Button")
    .at(1)
    .simulate("click");

  UserManage.setState({
    searchKey: {
      deptCode: "370200000000"
    }
  });
  UserManage.find("Button")
    .at(1)
    .simulate("click");
  expect(UserManage.state().moduletitle).toBe("New");
});

//Click on user details
test("handleChangeStatusEdit", () => {
  UserManage.setState({
    searchKey: param,
    userListResult: UserList.data,
    userDeptResult: userDeptResult.data,
    PoliceAddVisible: false,
    moduletype: "edit",
    userRoleSetResult: {}
  });
  UserManage.find("tbody tr")
    .at(0)
    .find("a")
    .at(0)
    .simulate("click");
  expect(UserManage.state().PoliceAddVisible).toBe(true);
  UserManage.instance().handleCancel();
});

//freeze the account
test("handleChangeStatus", () => {
  UserManage.find("tbody tr")
    .at(0)
    .find("a")
    .at(1)
    .simulate("click");
  UserManage.find("Popconfirm button")
    .at(1)
    .simulate("click");
  UserManage.find("tbody tr")
    .at(1)
    .find("a")
    .at(1)
    .simulate("click");
  UserManage.find("Popconfirm button")
    .at(1)
    .simulate("click");
});

// Sync people
test("synchronize", () => {
  UserManage.find(".page-footer Button")
    .at(1)
    .simulate("click");
});
//Page number changed
test("pagenext", () => {
  UserManage.instance().pageChange(2);
  expect(UserManage.state().searchKey.pageNo).toBe(2);
  UserManage.instance().pageSizeChange({}, 20);
  expect(UserManage.state().searchKey.pageSize).toBe(20);
});
// Treelist module
describe("treeList", () => {
  const treeListParam = {
    curDeptCode: "370200000000",
    onSelect: UserManage.instance().onSelect
  };
  const treeList = Enzyme.mount(<TreeList {...treeListParam} />);
  //tree click event
  treeList.setProps({
    trees: userDeptResult.data.list
  });
  it("treeClick", () => {
    treeList
      .find("li")
      .at(0)
      .find("span")
      .at(0)
      .simulate("click");
    expect(treeList.state("expandedKeys")).toContain(
      userDeptResult.data.list[0].deptCode
    );
  });
  //tree content click event
  it("treeListClick", () => {
    treeList
      .find("li")
      .at(0)
      .find("span")
      .at(1)
      .simulate("click");
    treeList
      .find("li")
      .at(1)
      .find("span")
      .at(1)
      .simulate("click");
  });
});
