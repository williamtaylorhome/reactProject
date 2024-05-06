import React from "react";
import Enzyme from "../../../../Enzyme.js";
import RoleManage from "../../../../../app/pages/set/roleManage/index";
import ButtonModal from "../../../../../app/pages/set/roleManage/modal/buttonModal";
jest.mock("../../../../../app/configs/ajax");
jest.mock("../../../../../app/apis/manage.js");
jest.mock("../../../../../app/components/draw/draw");
let form1;
Enzyme.mount(<RoleManage wrappedComponentRef={node => (form1 = node)} />);
let roleManage = Enzyme.mount(
  <RoleManage.WrappedComponent form={form1.props.form} />
);
const callback = {};
let form = {};

const param = {
  title: "Button permission list",
  type: "add",
  pid: 10062,
  itemId: 1,
  cancelButton: roleManage.instance().cancelButton,
  saveChecked: roleManage.instance().saveChecked,
  checkedIdArr: []
};
let buttonModal = Enzyme.mount(<ButtonModal {...param} />);
test("Select all button", () => {
  buttonModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
});
buttonModal.setState({
  selectedRowKeys: [134]
});
test("initialization", () => {
  buttonModal.instance().getList();
});
test("Confirm button", () => {
  buttonModal
    .find(".ant-modal-footer button")
    .at(1)
    .simulate("click");
});
test("Click the page button to select", () => {
  buttonModal
    .find(".ant-spin-container button")
    .at(0)
    .simulate("click");
});
