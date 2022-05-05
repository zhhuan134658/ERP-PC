<template>
  <div id="materialPay">
    <!-- 材料验收列表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen="true"
      ></commonSearch>
      <div class="mainContent">
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft">
            <el-button type="primary" size="medium" @click="newAdd"
              >新建</el-button
            >
          </div>
          <div class="mmbRight">
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-delete"
              @click="deleteList"
              >删除</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-download"
              @click="exportList"
              >导出</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-refresh"
              @click="updateList"
              >刷新</el-button
            >
            <el-button
              v-if="$store.state.userInfo.admin == 1"
              type="primary"
              plain
              size="medium"
              icon="el-icon-setting"
              @click="viewShow"
              >设置显示字段</el-button
            >
          </div>
          <!-- <div class="mmbLeft">
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="deleteList"
                            >删除</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="exportList"
                            >导出</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="updateList"
                            >刷新</el-button
                        >
                    </div>
                    <div
                        class="mmbRight"
                        v-if="$store.state.userInfo.admin == 1"
                    >
                        <i class="el-icon-s-tools"></i>
                        <el-button type="text" @click="viewShow"
                            >设置显示字段</el-button
                        >
                    </div> -->
        </el-row>

            <!-- :isdele1="true" -->
        <commonTable
          :tableloading="tableloading"
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          :isdele1="true"
          @listenChild="getMult"
          @creation="creation"
            :types='types'
            @getlist='getList'

          printTableName="material_payment"
        ></commonTable>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 50, 100]"
            :page-size="pagesize"
            layout="sizes,prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="设置"
      :visible.sync="wFormVisible"
      :close-on-click-modal="false"
      width="600px"
      @close="wCancel"
      class="view_change_title"
    >
      <el-checkbox-group
        v-model="checkedLists"
        @change="handleCheckedListChange"
      >
        <draggable animation="1000" v-model="myArray">
          <transition-group>
            <el-checkbox
              v-for="element in myArray"
              :key="element.value"
              :label="element.value"
              border
            >
              <span> {{ element.label }}</span>
            </el-checkbox>
          </transition-group>
        </draggable>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="wCancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="wInfo">确 定</el-button>
      </div>
    </el-dialog>

     <el-dialog
      title="付款"
      :visible.sync="payVisible"
      :close-on-click-modal="false"
      width="600px"
      @close="payCancel"
      class="view_change_title"
    >
      <el-form
        @submit.native.prevent
        :model="payformInline"
        class="demo-form-inline"
       
      >
        <div class="hlBottom">
          <el-form-item label="付款账户:" prop="accountname">
            <el-select
              v-model="payformInline.accountname"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in allaccList"
                :key="index"
                :value="item.accountname"
                :label="`${item.accountname}/${item.accountnumber}/${item.bankofdeposit}`"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款金额:">
               <!-- @input="
                  if(payformInline.paid_money > max) payformInline.paid_money  = max;
                   if(payformInline.paid_money  < 0) value  = 0;" -->
                <el-input
                  v-model="payformInline.paid_money"
                  clearable
                  type="number"
                  @input="changes"
                  oninput = "value=value.replace(/[^\d.]/g,'')"
                  placeholder="请输入付款金额"
                ></el-input>

              </el-form-item>

                <el-form-item class="newtijiao" label="上传凭证：">
                <div @click="addFilesClick(3)" style="color: skyblue">
                  添加凭证
                </div>
                <div class="dingFilesClass">
                  <div
                    v-for="(item, index) in payformInline.extend_three"
                    :key="index"
                  >
                    <div style="display: flex">
                      <div style="display: flex; width: 700px">
                        <div class="fileIcon">
                          <!-- <i class="el-icon-document"></i> -->
                          <!-- <img
                            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png"
                            alt=""
                            style="width: 50px; height: 50px;margin:right:10px"
                          /> -->
                          <img
                            :src="imgData(item.fileName)"
                            mode=""
                            style="width: 50px; height: 50px;margin:10px"
                          ></img>
                        </div>
                        <div class="filesTitle">
                          <div class="yichu">
                            {{ item.fileName }}
                          </div>
                          <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                        </div>
                      </div>
                      <div style="display: flex">
                        <div
                          class="watchBtn1"
                          @click="watchFiles(item)"
                          style="width: 55px"
                        >
                          预览
                        </div>
                        <div class="fileIcon2">
                          <i
                            class="el-icon-error"
                            @click="deleteFiles1(index, 3)"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="payCancel">取 消</el-button>
        <el-button
          size="medium"
          type="primary"
          @click="payInfo"
          >确 定</el-button
        >
      </div>
    </el-dialog>



    <el-dialog
      title="付款记录"
      :visible.sync="payVisible1"
      :close-on-click-modal="false"
      @close="payCancel1"
      class="view_change_title"
    >
                     <el-table :border="true"
                    :data="houseList"
                    border
                    height="547"
                    style="width: 100%"
                    ref="multipleTable"
                    :row-class-name="tableRowClassName"
                >
                    <!-- <el-table-column type="selection" width="55">
                    </el-table-column> -->
                    <el-table-column
                        prop="account"
                        label="付款账户"
                        align="left"
                    >
                    </el-table-column>
                    <el-table-column prop="money" label="付款金额" align="left">
                    </el-table-column>
                         <el-table-column prop="pay_voucher" label="付款凭证" align="left">
                                  <template slot-scope="scope">
                            <el-button
                                type="text"
                                slot="reference"
                                size="mini"
                                v-if="scope.row.status == 1"
                                @click="goNext(scope.row)"
                                >点击查看</el-button
                            >


                                  <el-button
                                  disabled
                                type="text"
                                slot="reference"
                                v-else
                                size="mini"
                              
                                >点击查看</el-button
                            >
                   </template>
                    </el-table-column>
                         <el-table-column prop="username" label="付款人姓名" align="left">
                    </el-table-column>

                          <el-table-column prop="pay_voucher" label="操作" align="left">
                                  <template slot-scope="scope">
                            <el-button
                                type="text"
                                slot="reference"
                                size="mini"
                                v-if="scope.row.status == 1"
                                @click="chexiao(scope.row)"
                                >撤销付款</el-button
                            >


                                  <el-button
                                  disabled
                                type="text"
                                slot="reference"
                                v-else
                                size="mini"
                                @click="chexiao(scope.row)"
                                >撤销付款</el-button
                            >
                 </template>
                    </el-table-column>


                    
                </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="payCancel1">取 消</el-button>
        <el-button
          size="medium"
          type="primary"
          @click="payInfo"
          >确 定</el-button
        >
      </div>
    </el-dialog>


     <el-dialog
        title="付款凭证详情"
        :visible.sync="viewDuFormVisible"
        width="600px"
        class="mileposttimeViewClass"
        :close-on-click-modal="false"
      >
        <div class="viewDMain">
         
          <el-timeline v-if="this.viewDList.length>0">
            <el-timeline-item
              v-for="(item, index) in viewDList"
              :key="index"
              :timestamp="item.up_time"
              color="#177ae0"
              placement="top"
            >
              <el-card>
              
                <div class="dingFilesClass">
                  <div>
                    <div>
                      <div class="fileIcon">
                        <i
                          class="iconfont icon-wenjian"
                          style="color: #fcb138"
                        ></i>
                      </div>
                      <div class="filesTitle">
                        <div>
                          {{ item.fileName }}
                        </div>
                        <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                      </div>
                    </div>
                    <div>
                      <div class="watchBtn" @click="watchFiles(item)">
                        预览
                      </div>
                    </div>
                  </div>
                </div>

               
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <div style="text-align: center" v-else>
            <img src="../../../assets/project/noData.png" alt="" />
            <p>暂无进度记录，请去上报进度</p>
          </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import draggable from "vuedraggable";
import commonTable from "@/components/commonTablenew.vue";
import commonSearch from "@/components/commonSearch.vue";

export default {
  name: "materialPay",
  components: { draggable, commonTable, commonSearch },
  data() {
    return {
      payVisible: false,
      payVisible1: false,
      viewDList: [],
      duName: "",
      cx_id: "",
      types: "material_payment",
      houseList: [],
      viewDuFormVisible: false,
      payformInline: {
        accountname: "",
        newaccountname: "",
        paid_money: "",
        extend_three: [],
      },
      newitemdata: "",
      allaccList: [],
      isAdmin: false,

      //搜索条件
      formcommonList: [
        {
          labelName: "付款名称",
          labelData: "name",
        },
        {
          labelName: "开始时间",
          labelData: "startTime",
        },
        {
          labelName: "结束时间",
          labelData: "endTime",
        },
        {
          labelName: "项目名称",
          labelData: "project_name",
        },
        {
          labelName: "供应商",
          labelData: "supplier",
        },

        {
          labelName: "审批状态",
          labelData: "status",
        },
        {
          labelName: "项目性质",
          labelData: "lian_ying",
        },
      ],
      tableloading: false,
      formInline: {
        name: "",
        status: "",
        startTime: "",
        endTime: "",
        project_name: "",
        supplier: "",
        b_number: "",
        agent: "",
        send_name: "",
        send_userid: "",
        lian_ying: "",
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],
      max: "",
    };
  },
  watch: {
    payformInline: {
      //深度监听，可监听到对象、数组的变化
      handler(val) {
        this.allaccList.find((item) => {
          if (item.accountname == val.accountname) {
            this.payformInline.accountname =
              item.accountname + "/" + item.accountnumber;
          }
        });
      },
      deep: true, //true 深度监听
    },
  },
  methods: {
    goNext(item) {
      const _this = this;
      console.log(typeof item.pay_voucher, "类型");
      console.log(item.pay_voucher, "数据");
      //   _this.duName = item.name;
      _this.viewDList = item.pay_voucher;

      console.log(_this.viewDList);
      _this.viewDuFormVisible = true;

      //   _this.$axios
      //     .post('/newtao/payOperationJu', {
      //       id: item.id,
      //       biao_name: 'material_payment',
      //     })
      //     .then(res => {
      //       if (res.data.code == 1) {
      //         _this.viewDList = res.data.data;
      //       }
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status != 1) {
        return "warning-row";
      }
      return "";
    },
    //   记录列表
    jiLuList(row) {
      this.$axios
        .post("/newtao/payOperationJu", {
          id: row.id,
          biao_name: "material_payment",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.cx_id = row.id;
            // this.total = res.data.count;
            this.houseList = res.data.data;

            console.log(
              this.houseList,
              "houseListhouseListhouseListhouseListhouseListhouseListhouseListhouseList"
            );

            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deleteFiles1(index, type) {
      switch (type) {
        case 1:
          this.addUserForm.fjurl.sfz.splice(index, 1);
          break;
        case 2:
          this.addUserForm.fjurl.zjz.splice(index, 1);
          break;
        case 3:
          this.payformInline.extend_three.splice(index, 1);
          break;
        case 4:
          this.addUserForm.fjurl.enclosure.splice(index, 1);
          break;
      }
    },
    //预览附件
    watchFiles(item) {
      this.$axios
        .post("/dingding/getAuthUp", {
          auth: "download",
          fields: item.fileId,
        })
        .then((res) => {
          if (res.data.code == 1) {
            console.log(item);
            const _this = this;
            dd.ready(function () {
              dd.biz.cspace.preview({
                corpId: _this.cid,
                spaceId: item.spaceId,
                fileId: item.fileId,
                fileName: item.fileName,
                fileSize: item.fileSize,
                fileType: item.fileType,
                onSuccess: function () {
                  //无，直接在native显示文件详细信息
                },
                onFail: function (err) {
                  // 无，直接在native页面显示具体的错误
                },
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    imgData(leixing) {
      let $url = "";
      let $leixing = leixing.split(".")[1];
      switch ($leixing) {
        case "bmp":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "jpg":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";
          break;

        case "png":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "tif":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "gif":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "pcx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "jpeg":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "tiff":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png";

          break;

        case "doc":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3N8rDSxbWY1599028418394.png";

          break;

        case "docx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3N8rDSxbWY1599028418394.png";

          break;

        case "xls":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yYQffEzfj51599028426375.png";

          break;

        case "xlsx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yYQffEzfj51599028426375.png";

          break;

        case "pdf":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/cP3jnxmJbM1599028432693.png";

          break;

        case "ppt":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "pps":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "pptx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "ppsx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "ppa":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "pot":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png";

          break;

        case "rar":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5ZefDfefAP1599028449154.png";

          break;

        case "zip":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5ZefDfefAP1599028449154.png";

          break;

        case "AVI":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "mov":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "rmvb":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "rm":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "FLV":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "mp4":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "3GP":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png";

          break;

        case "dwg":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png";

          break;

        case "dxf":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png";

          break;

        case "dwt":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png";

          break;

        case "ai":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3QX6Xwexr71599028901919.png";

          break;

        case "3dm":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/epfBYhnxZF1599028496013.png";

          break;

        case "dae":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/w6wXH3rRJn1599028908835.png";

          break;

        case "abc":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "glTF":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "fbx":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "bvh":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "obj":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "stl":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "3ds":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "ply":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        case "x3d":
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png";

          break;

        default:
          $url =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5wH5QxaXPB1599029452541.png";
      }
      return $url;
    },
    //添加文件
    addFilesClick(type) {
      const _this = this;
      _this.$axios
        .post("/dingding/getAuthUp", {
          type: "add",
          fileids: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            console.log(res.data);
            _this.$store.commit("setSpaceId", res.data.data.toString());
            _this.selectFiles(type);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectFiles(type) {
      const _this = this;
      dd.ready(function () {
        dd.biz.util.uploadAttachment({
          image: {
            multiple: true,
            compress: false,
            max: 9,
            spaceId: _this.$store.state.spaceId,
          },
          space: {
            corpId: _this.$store.state.cid,
            spaceId: _this.$store.state.spaceId,
            max: 9,
          },
          file: { spaceId: _this.$store.state.spaceId, max: 9 },
          types: ["photo", "file", "space"],
          onSuccess: function (result) {
            console.log(result);
            //onSuccess将在文件上传成功之后调用
            switch (type) {
              case 3:
                result.data.forEach((item) => {
                  _this.payformInline.extend_three.push(item);
                });
                break;
            }
          },
          onFail: function (err) {
            console.log("err++" + err);
          },
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },
    getallaccList() {
      this.$axios
        .post("/finance/accountnewslist", {
          current_page: 1,
          num: 9999,
          zstatus: 7,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.allaccList = res.data.content.list;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 撤销付款
    chexiao(val) {
      console.log(val.id);
      this.$confirm("此操作将永久撤销付款, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/newtao/payOperation", {
              id: this.cx_id,
              biao_name: "material_payment",
              username: this.$store.state.userInfo.uname,
              cx_id: val.id,
              paid_money: val.money,
            })
            .then((res) => {
              if (res.data.code == 1) {
                //   this.getList();
                this.payVisible1 = false;
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  duration: 1500,
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  duration: 1500,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 待付款
    creation(val, type) {
      console.log(val);
      this.newitemdata = val;
      if (type == "2") {
        this.payVisible1 = true;
        this.jiLuList(val);
      } else {
        this.payVisible = true;
        var max = this.CurrencyFomatNumber(this.newitemdata.pay_money, 1);
        this.max = max - this.newitemdata.extend_five;
        console.log(this.max);
      }
    },
    CurrencyFomatNumber(number, n) {
      if (number != null && number != "" && number != undefined) {
        number = number.replace(/,/g, ""); //去除千分位的','
        if (isNaN(number)) {
          //判断是否是数字
          number = "0";
        } else {
          number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //n幂
          number = number.toString();
        }
      } else {
        number = "0";
      }
      //a.indexOf(x,y);返回x值在a字符串值中从y位置开始检索首次出现的位置
      var numLength = number.indexOf(".");
      //判断传递的值是整数增加小数点再补"0"
      if (numLength < 0) {
        numLength = number.length;
        number += ".";
      }
      //不足n位小数的，循环补"0"
      while (number.length <= numLength + n) {
        number += "0";
      }
      return number;
    },
    payCancel() {
      this.payVisible = false;
      this.payformInline.paid_money = "";
      this.payformInline.extend_three = [];
      this.payformInline.accountname = "";
    },
    payCancel1() {
      this.payVisible1 = false;
    },
    payInfo() {
      if (!this.payformInline.accountname) {
        return this.$message({
          title: "提示",
          message: "请选择账户",
          type: "error",
          duration: 1500,
        });
      }

      this.$axios
        .post("/newtao/payOperation", {
          id: this.newitemdata.id,
          account: this.payformInline.accountname,
          biao_name: "material_payment",
          pay_voucher: this.payformInline.extend_three,
          username: this.$store.state.userInfo.uname,
          paid_money: this.payformInline.paid_money,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.payVisible = false;
            this.payformInline.accountname = "";
            this.getList();
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1500,
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changes(value) {
      if (value > this.max) {
        this.payformInline.paid_money = this.max;
      }
    },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    resetClick() {
      this.formInline = {
        name: "",
        status: "",
        startTime: "",
        endTime: "",
        project_name: "",
        supplier: "",
        b_number: "",
        agent: "",
        send_name: "",
        send_userid: "",
        lian_ying: "",
      };
      this.getList();
    },
    getMult(val) {
      this.multSelectData = val;
    },
    handleCheckedListChange(value) {
      this.myArray.forEach((element) => {
        if (value.includes(element.value)) {
          element.check = true;
        } else {
          element.check = false;
        }
      });
    },
    wCancel() {
      this.wFormVisible = false;
      let Ids = this.titleList.map((item) => item.value);
      this.myArray.forEach((item) => {
        if (!Ids.includes(item.value)) {
          item.check = false;
        } else {
          item.check = true;
        }
      });
    },

    adjustWidth() {
      console.log("123456+++");
      const _this = this;
      _this.$nextTick(() => {
        let newW = document.getElementsByClassName(
          "el-table__append-wrapper"
        )[0];
        _this.$utils.utilAdjustWidth(
          _this.$refs.table,
          newW,
          _this.$refs.sum_xiaoji,
          _this.$refs.sum_heji
        );
      });
    },
    wInfo() {
      let newT = [];
      this.myArray.forEach((element) => {
        if (element.check) {
          newT.push(element);
        }
      });

      if (newT.length > 0) {
        this.$nextTick(() => {
          this.titleList = JSON.parse(JSON.stringify(newT));
          this.sendTitleList();
          if (this.isFooter == 1) {
            let newFArr = [];
            this.titleList.map((item) => {
              this.newFooter.forEach((element) => {
                if (element.value == item.value) {
                  newFArr.push(element);
                }
              });
            });
            this.footerNumList = JSON.parse(JSON.stringify(newFArr));
          }
          this.wFormVisible = false;
        });
        setTimeout(() => {
          this.adjustWidth();
        }, 500);
      } else {
        this.$message({
          type: "warning",
          message: "不能为空！",
          duration: 1500,
        });
      }
    },

    viewShow() {
      this.getTitleList();
      this.wFormVisible = true;
    },
    getTitleList() {
      this.$axios
        .post("/spread/showFiledCurrencyList", {
          name: "material_payment",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.myArray = res.data.data;
            this.titleList = [];
            this.checkedLists = [];
            this.myArray.forEach((element) => {
              if (element.check) {
                this.titleList.push(element);
                this.checkedLists.push(element.value);
              }
            });
            this.getList();
          } else {
            this.$message({
              title: "提示",
              message: res.data.msg,
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sendTitleList() {
      this.$axios
        .post("/spread/editFiledCurrency", {
          name: "material_payment",
          mould_data: JSON.stringify(this.myArray),
        })
        .then((res) => {
          if (res.data.code == 1) {
          } else {
            this.$message({
              title: "提示",
              message: res.data.msg,
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post("/project/materialPayment")
        .then((res) => {
          if (res.data.code == 1) {
            let newUrl =
              "https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=" +
              _this.$store.state.cid +
              "#/custom/?processCode=" +
              res.data.data;
            dd.ready(function () {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
              });
            });
          } else {
            _this.$notify({
              title: "提示",
              message: res.data.msg,
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.tableloading = true;
      this.$axios
        .post("/project/materialPaymentList", {
          page: this.currentPage,
          number: this.pagesize,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          supplier: this.formInline.supplier,
          project_name: this.formInline.project_name,
          agent: this.formInline.agent,
          name: this.formInline.name,
          shenpi: this.formInline.status,
          b_number: this.formInline.b_number,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
          lian_ying: this.formInline.lian_ying,
        })
        .then((res) => {
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: "列表刷新成功",
                type: "success",
                duration: 1500,
              });
            }
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.footerNumList = [];
            this.isFooter = res.data.mould_data.is_heji;
            this.isAdmin = res.data.status === 2;
            if (this.isFooter == 1) {
              this.newFooter = res.data.mould_data.mould_data;
              this.titleList.map((item) => {
                this.newFooter.forEach((element) => {
                  if (element.value == item.value) {
                    this.footerNumList.push(element);
                  }
                });
              });
            }
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList();
            }
            this.tableloading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
    },
    //删除列表
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post("/project/materialPaymentDel", {
                id: this.multSelectData,
              })
              .then((res) => {
                if (res.data.code == 1) {
                  this.getList();
                  this.$message({
                    message: res.data.msg,
                    type: "success",
                    duration: 1500,
                  });
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "warning",
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          message: "请先勾选要删除的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
    //还原列表
    backList() {
      this.$axios
        .post("/project/materialPaymentReduction")
        .then((res) => {
          if (res.data.code == 1) {
            this.getList();
            this.$message({
              message: "已还原",
              type: "success",
              duration: 1500,
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post("/project/fileDownloadDel", { path: url })
        .then((res) => {
          if (res.data.code == 1) {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post("/project/materialPaymentDownload", {
            id: _this.multSelectData,
          })
          .then((res) => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function (msg) {
                  // 文件下载进度回调
                },
                onSuccess: function (result) {
                  _this.deleteExport(res.data.data.path);
                },
                onFail: function () {
                  _this.deleteExport(res.data.data.path);
                },
              });
            } else {
              _this.$message({
                message: res.data.msg,
                type: "warning",
                duration: 1500,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        _this.$message({
          message: "请先勾选要导出的数据！",
          type: "warning",
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getTitleList();
    this.getallaccList();
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: (time) => {
          let endDateVal = this.formInline.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: (time) => {
          let beginDateVal = this.formInline.startTime;
          if (beginDateVal) {
            return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          }
        },
      };
    },
  },
};
</script>
<style lang='less'>
.watchBtn {
  white-space: nowrap;
  font-size: 10px;
  text-align: center;
}
.dingFilesClass {
  > div {
    > div {
      display: flex;
      align-items: center;
    }
  }
}
.yichu {
  width: 300px;
  height: 36px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.filesTitle {
  width: 500px;
}
.el-table .warning-row {
  background: #edf1f4;
}
</style>