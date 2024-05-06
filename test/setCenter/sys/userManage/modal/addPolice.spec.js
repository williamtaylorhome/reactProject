import React from "react";
import Enzyme from "../../../../Enzyme.js";
import UserName from "../../../../../app/pages/set/userManage/index";
import AddPolice from "../../../../../app/pages/set/userManage/modal/addPolice";
import roleList from "../../../../../app/mocks/apis/sys/userManage/fetchRoleList";
import fetchUserDetail from "../../../../../app/mocks/apis/sys/userManage/fetchUserDetail";
import UserList from "../../../../../app/mocks/apis/sys/userManage/fetchUserList";

import Draw from "../../../../../app/components/draw/draw";
jest.mock("../../../../../app/configs/ajax");



jest.mock("../../../../../app/components/draw/draw");
let form1;
Enzyme.mount(<UserName wrappedComponentRef={node => (form1 = node)} />);
let UserManage = Enzyme.mount(
  <UserName.WrappedComponent form={form1.props.form} />
);
const callback = {};

let form = {};
const param = {
  deptId: "370200000000",
  handleOk: UserManage.instance().handleOk,
  title: "New",
  type: "add",
  visible: true,
  roleList: roleList.data.list,
  values: {},
  onCancel: UserManage.instance().onCancel
};
UserList.data.totalCount = 10;
UserManage.setState({
  userListResult: UserList.data
});
let Form = Enzyme.mount(
  <AddPolice
    {...param}
    callback={callback}
    wrappedComponentRef={node => (form = node)}
  />
);

let policeFrom = Enzyme.mount(
  <AddPolice.WrappedComponent
    callback={callback}
    {...param}
    form={form.props.form}
  />
);
//Added pop-up box basic information verification
test("addInit", () => {
  UserManage.setState({
    moduletype: "add",
    userListResult: UserList.data
  });
  policeFrom
    .find("button")
    .at(2)
    .simulate("click");
  policeFrom
    .prop("form")
    .setFieldsValue({ chineseName: fetchUserDetail.data.chineseName });
  policeFrom
    .prop("form")
    .setFieldsValue({ password: fetchUserDetail.data.password });
  policeFrom
    .prop("form")
    .setFieldsValue({ username: fetchUserDetail.data.username });
  policeFrom
    .prop("form")
    .setFieldsValue({ idcardNo: fetchUserDetail.data.idcardNo });
  policeFrom
    .prop("form")
    .setFieldsValue({ deptCode: fetchUserDetail.data.deptCode });
  policeFrom
    .prop("form")
    .setFieldsValue({ phoneNo: fetchUserDetail.data.phoneNo });
  policeFrom
    .prop("form")
    .setFieldsValue({ gxdwdm: fetchUserDetail.data.gxdwdm });
  policeFrom
    .prop("form")
    .setFieldsValue({ roleIds: fetchUserDetail.data.roleIds });
  expect(policeFrom.find("Drawer").props().title).toBe("New");
  expect(policeFrom.find("Drawer").props().visible).toBe(param.visible);
  policeFrom
    .find("button")
    .at(2)
    .simulate("click");
});
//Edit box basic information verification
test("editInit", () => {
  UserManage.setState({
    moduletype: "edit",
    userListResult: UserList.data
  });
  const param = {
    deptId: "370200000000",
    handleOk: UserManage.instance().handleOk,
    title: "edit",
    type: "edit",
    visible: true,
    roleList: roleList.data.list,
    values: fetchUserDetail.data
  };
  policeFrom.setProps(param);
  expect(policeFrom.find("Drawer").props().title).toBe("edit");
  policeFrom
    .find("button")
    .at(2)
    .simulate("click");
  policeFrom
    .find("button")
    .at(3)
    .simulate("click");
});
