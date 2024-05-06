import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Enzyme from "../../../../Enzyme.js";
import RoleManage from "../../../../../app/pages/set/roleManage/index";
import ModuleManage from "../../../../../app/pages/set/moduleManage/index";
import AddButtonModal from "../../../../../app/pages/set/moduleManage/modal/addButtonModal";
import fetchButtonList from "../../../../../app/mocks/apis/sys/roleManage/fetchButtonList";
import rootReducer from "../../../../../app/redux/reducers";

const moduleManage = Enzyme.mount(<ModuleManage />);
jest.mock("../../../../../app/configs/ajax");
jest.mock("../../../../../app/apis/manage.js");
jest.mock("../../../../../app/components/draw/draw");
// Jest.mock("../../../../../app/pages/set/module manage/modal/add button modal");

let store;
let wrapper;
let form;
//New parameters
const addParam = {
  buttonEditData: {},
  title: "Add button permissions",
  onCancel: moduleManage.instance().handleCancel,
  handleAdd: moduleManage.instance().handleAdd,
  state: "add",
  visible: true
};
store = createStore(rootReducer);
wrapper = Enzyme.mount(
  <Provider store={store}>
    <AddButtonModal {...addParam} wrappedComponentRef={node => (form = node)} />
  </Provider>
);
//wrapped component of the current page
const ButtonModal = wrapper.prop("children").type.WrappedComponent;

test("add", () => {
  moduleManage.setState({ buttonEditState: "add" });
  const buttonModal = Enzyme.mount(
    <ButtonModal {...addParam} form={form.props.form} />
  );
  buttonModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
});
//edit
test("edit", () => {
  moduleManage.setState({ buttonEditState: "edit" });
  const editParam = {
    buttonEditData: fetchButtonList.data.list[0],
    handleOk: moduleManage.instance().handleOk,
    title: "Modify button permissions",
    onCancel: moduleManage.instance().handleCancel,
    handleAdd: moduleManage.instance().handleAdd,
    state: "edit"
  };
  const buttonModal = Enzyme.mount(
    <ButtonModal {...editParam} form={form.props.form} />
  );
  buttonModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
  buttonModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
  buttonModal
    .prop("form")
    .setFieldsValue({ resName: fetchButtonList.data.list[0].resName });
  buttonModal
    .prop("form")
    .setFieldsValue({ sort: fetchButtonList.data.list[0].sort });
  buttonModal
    .prop("form")
    .setFieldsValue({ resKey: fetchButtonList.data.list[0].resKey });
  buttonModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
});
