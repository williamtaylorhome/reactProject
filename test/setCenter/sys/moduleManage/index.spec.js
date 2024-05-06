import React from "react";
import Enzyme from "../../../Enzyme.js";
import RoleManage from "../../../../app/pages/set/roleManage/index";
import ModuleManage from "../../../../app/pages/set/moduleManage/index";
import AddModal from "../../../../app/pages/set/moduleManage/modal/moduleAdd";
import fetchTreeList from "../../../../app/mocks/apis/sys/roleManage/fetchTreeList";
import ButtonModal from "../../../../app/pages/set/moduleManage/modal/buttonModal";
jest.mock("../../../../app/pages/set/moduleManage/modal/addButtonModal");

let form;
let moduleManage = Enzyme.mount(<ModuleManage />);
console.log(moduleManage)
moduleManage.setState({ tableDataSource: fetchTreeList.data.list });
jest.mock("../../../../app/configs/ajax");
jest.mock("../../../../app/apis/manage.js");
//Page tree
test("tree", () => {
  //Enter page rendering
  expect(moduleManage.find("tbody tr").length).toBe(
    fetchTreeList.data.list.length
  );
  //Click tree effect
  moduleManage
    .find("tbody tr")
    .at(0)
    .find("span")
    .at(1)
    .simulate("click");
  expect(moduleManage.find("tbody tr").length).toBe(
    fetchTreeList.data.list.length + fetchTreeList.data.list[0].children.length
  );
  //Class name whose status is online
  expect(
    moduleManage
      .find(".success")
      .at(0)
      .text()
  ).toBe("Already online");
});
test("cancelButton", () => {
  moduleManage.instance().cancelButton();
  moduleManage.instance().handleCancel();
    moduleManage.setState({ buttonEditState: "add" });
  moduleManage.instance().handleAdd({});

});
//New module
test("addButton/editButton", () => {
  moduleManage.find("button").simulate("click");
  //New button click
  expect(moduleManage.state("Visible")).toBe(true);
  //Click on the new submenu button
  moduleManage
    .find("tbody tr")
    .at(0)
    .find("a")
    .at(0)
    .simulate("click");
  expect(moduleManage.state("title")).toBe("Add submenu");
  //Permission button click
  moduleManage
    .find("tbody tr")
    .at(0)
    .find("a")
    .at(3)
    .simulate("click");
  expect(moduleManage.state("buttonVisible")).toBe(true);
});
