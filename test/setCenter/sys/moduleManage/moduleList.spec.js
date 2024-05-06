import React from "react";
import Enzyme from "../../../Enzyme.js";
import RoleManage from "../../../../app/pages/set/roleManage/index";
import ModuleManage from "../../../../app/pages/set/moduleManage/index";
import AddModal from "../../../../app/pages/set/moduleManage/modal/moduleAdd";
import fetchModuleList from "../../../../app/mocks/apis/sys/moduleManage/fetchModuleList";
import ModuleList from "../../../../app/pages/set/moduleManage/moduleList";
let form;
let moduleManage = Enzyme.mount(<ModuleManage />);
moduleManage.setState({ tableDataSource: fetchModuleList.data.list });
jest.mock("../../../../app/configs/ajax");
jest.mock("../../../../app/apis/manage.js");
fetchModuleList.data.list[0].status = true;
fetchModuleList.data.list[1].resName = "模块管理";
const param = {
  dataSource: fetchModuleList.data.list,
  loading: true,
  onDelete: moduleManage.instance().handleDelete,
  onModify: moduleManage.instance().handleModify,
  onUpdataStatus: moduleManage.instance().handleChangeStatus,
  onAddNode: moduleManage.instance().handleAddNode,
  buttonList: moduleManage.instance().buttonList
};
let moduleList = Enzyme.mount(<ModuleList {...param} />);
console.log(moduleList)
fetchModuleList.data.list[1].resName = "123";
moduleList.setProps({ dataSource: fetchModuleList.data.list });
test("addButton", () => {
  moduleList
    .find("tbody tr")
    .at(0)
    .find("a")
    .at(0)
    .simulate("click");
  expect(moduleManage.state("title")).toBe("Add submenu");
});
test("editButton", () => {
  moduleList
    .find("tbody tr")
    .at(0)
    .find("a")
    .at(1)
    .simulate("click");
  expect(moduleManage.state("title")).toBe("Modify menu");
});
test("UpdataStatus", () => {
  moduleList
    .find("tbody tr")
    .at(1)
    .find("a")
    .at(2)
    .simulate("click");
      moduleList
    .find("Popconfirm button")
    .at(1)
    .simulate("click");
});
test("delete", () => {
  //Click tree effect
  moduleList
    .find("tbody tr")
    .at(0)
    .find("span")
    .at(1)
    .simulate("click");
  //Click the delete button of the child element
  moduleList
    .find("tbody tr")
    .at(1)
    .find("a")
    .at(2)
    .simulate("click");
  moduleList
    .find("Popconfirm button")
    .at(1)
    .simulate("click");
});
