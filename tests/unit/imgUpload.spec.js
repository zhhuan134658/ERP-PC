import { shallowMount } from "@vue/test-utils";
import imgUpload from "@/components/imgUpload.vue";

describe("<img-upload />", () => {
  it("should render upload button", () => {
    const wrapper = shallowMount(imgUpload);
    expect(wrapper.find(".el-button").text()).toEqual("选择图片");
  });
});
