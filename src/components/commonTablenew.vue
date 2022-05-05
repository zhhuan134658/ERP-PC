<template>
  <div id="commonTable">
    <el-table
      :border="true"
      v-loading="tableloading"
      v-if="titleList.length > 0"
      :data="tpList"
      :header-cell-style="tableHeaderClass"
      :cell-style="tableRowClass"
      @row-click="checkList"
      @header-dragend="checkWidth"
      ref="table"
      max-height="650"
      style="width: 100%; border: 1px solid #ebeef5"
      @selection-change="handleSelectionChange"
      size="mini"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" fixed="left" width="55" />
      <el-table-column type="index" fixed="left" width="55" label="序号" />

      <el-table-column
        v-if="isdele || isdele2 || isdele1"
        fixed="left"
        :prop="titleList[0].value"
        :label="titleList[0].label"
        :show-overflow-tooltip="true"
        align="left"
        :min-width="watchMinWidth(titleList[0].label)"
      >
      </el-table-column>
      <div v-if="isdele || isdele2 || isdele1">
        <el-table-column
          v-for="(item, index) in titleList.slice(1)"
          :key="index"
          :prop="item.value"
          :label="item.label"
          :show-overflow-tooltip="true"
          align="left"
          :min-width="watchMinWidth(item.label)"
        >
        </el-table-column>
      </div>
      <div v-else>
        <!-- :fixed="item.label=='所属项目'?'left':''" -->

        <el-table-column
          v-for="(item, index) in titleList"
          :key="index"
          :prop="item.value"
          :label="item.label"
          :show-overflow-tooltip="true"
          align="left"
          :min-width="watchMinWidth(item.label)"
        >
        </el-table-column>
      </div>

      <el-table-column fixed="right" label="审批状态" align="left">
        <template slot-scope="scope">
          <span v-if="scope.row.status == '2'" style="color: #17c298"
            >已同意</span
          >
          <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
            >审批中</span
          >
          <span v-else-if="scope.row.status == '3'" style="color: #f16d6d"
            >已拒绝</span
          ><span v-else style="color: #409eff">外部数据</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="审批状态"
        v-else-if="isdele2"
        fixed="right"
        align="left"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == '2'" style="color: #17c298"
            >已同意</span
          >
          <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
            >审批中</span
          >
          <span v-else-if="scope.row.status == '3'" style="color: #f16d6d"
            >已拒绝</span
          ><span v-else style="color: #409eff">外部数据</span>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" v-else align="left">
        <template slot-scope="scope">
          <span v-if="scope.row.status == '2'" style="color: #17c298"
            >已同意</span
          >
          <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
            >审批中</span
          >
          <span v-else-if="scope.row.status == '3'" style="color: #f16d6d"
            >已拒绝</span
          ><span v-else style="color: #409eff">外部数据</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="付款状态"
        align="left"
        fixed="right"
        v-if="isdele"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.creationtime == '3'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >已付款</el-button
          >
          <el-button
            v-if="scope.row.creationtime == '2'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >部分付款</el-button
          >
          <el-button
            v-else
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >未付款</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        label="付款状态"
        align="left"
        fixed="right"
        v-if="isdele1"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.extend_four == '3'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >已付款</el-button
          >
          <el-button
            v-else-if="scope.row.extend_four == '2'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >部分付款</el-button
          >
          <el-button
            v-else
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >未付款</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        label="付款状态"
        align="left"
        fixed="right"
        v-if="isdele8"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.fk_status == '3'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >已付款</el-button
          >
          <el-button
            v-else-if="scope.row.fk_status == '2'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >部分付款</el-button
          >
          <el-button
            v-else
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >未付款</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        label="已付金额"
        align="left"
        fixed="right"
        v-if="isdele1"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.extend_five || 0 }}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="已付金额"
        align="left"
        fixed="right"
        v-if="isdele8"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.lj_money || 0 }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="付款状态"
        align="left"
        fixed="right"
        v-if="isdele6"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.collectiontype == '3'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >已完结</el-button
          >
          <el-button
            v-if="scope.row.collectiontype == '2'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >已收款</el-button
          >
          <el-button
            v-else
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >待收款</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        label="付款状态"
        align="left"
        fixed="right"
        v-if="isdele5"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.collectiontype == '3'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >已付款</el-button
          >
          <el-button
            v-if="scope.row.collectiontype == '2'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >部分付款</el-button
          >
          <el-button
            v-else
            type="text"
            size="mini"
            @click.stop="getPaymentHistory1(scope.row.id)"
            >未付款</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="收款状态"
        align="left"
        v-if="isdele2"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.extend_five == '2'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >已收款</el-button
          >
          <el-button
            v-else
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >待收款</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="退回状态"
        align="left"
        v-if="isBack"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.extend_five == '2'"
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >已退回</el-button
          >
          <el-button
            v-else
            type="text"
            size="mini"
            @click.stop="getPaymentHistory(scope.row.id)"
            >未退回</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        v-if="isdele1"
        label="操作"
        fixed="right"
        align="left"
        width="70"
      >
        <template slot-scope="scope">
          <!-- <div>{{Number(CurrencyFomatNumber(scope.row.pay_money,1))}}+++{{scope.row.extend_five}}</div> -->
          <!-- <div>{{scope.row.extend_five<=Number(CurrencyFomatNumber(scope.row.pay_money,1))}}</div> -->
          <!-- v-if="CurrencyFomatNumber(scope.row.extend_five,1)<=CurrencyFomatNumber(scope.row.pay_money,1) && scope.row.extend_four !=3" -->
          <el-button
            v-if="
              scope.row.extend_five <
              Number(CurrencyFomatNumber(scope.row.pay_money, 1))
            "
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row, '1')"
            >付款</el-button
          >

          <el-button
            v-else
            disabled
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row, '1')"
            >付款</el-button
          >
          <!-- <el-button
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row,'2')"
            >付款记录</el-button
          > -->
        </template>
      </el-table-column>

      <el-table-column
        v-if="isdele8 && isdata != true"
        label="操作"
        fixed="right"
        align="left"
        width="70"
      >
        <template slot-scope="scope">
          <!-- <div>{{Number(CurrencyFomatNumber(scope.row.pay_money,1))}}+++{{scope.row.extend_five}}</div> -->
          <!-- <div>{{scope.row.extend_five<=Number(CurrencyFomatNumber(scope.row.pay_money,1))}}</div> -->
          <!-- v-if="CurrencyFomatNumber(scope.row.extend_five,1)<=CurrencyFomatNumber(scope.row.pay_money,1) && scope.row.extend_four !=3" -->

          <el-button
            v-if="
              scope.row.lj_money <
              Number(CurrencyFomatNumber(scope.row.bond_money, 1))
            "
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row, '1')"
            >付款</el-button
          >
          <el-button
            v-else
            disabled
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row, '1')"
            >付款</el-button
          >
          <!-- <el-button
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row,'2')"
            >付款记录</el-button
          > -->
        </template>
      </el-table-column>

      <el-table-column
        v-if="isdata"
        label="操作"
        fixed="right"
        align="left"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            slot="reference"
            size="mini"
            v-if="scope.row.remind_riqi == '' || scope.row.remind_riqi == null"
            @click.native.stop="dataSet(scope.row)"
            >设置提醒日期</el-button
          >

          <el-button
            v-else
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="dataShow(scope.row)"
            >{{ scope.row.remind_riqi }}</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        v-if="isdele6"
        label="操作"
        fixed="right"
        align="left"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            v-if="
              scope.row.extend_five <
              Number(CurrencyFomatNumber(scope.row.pay_money, 1))
            "
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row, '1')"
            >付款</el-button
          >

          <el-button
            v-else
            disabled
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row, '1')"
            >付款</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        v-if="isdele5"
        label="操作"
        fixed="right"
        align="left"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            v-if="
              scope.row.extend_five <
              Number(CurrencyFomatNumber(scope.row.pay_money, 1))
            "
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row, '1')"
            >付款</el-button
          >

          <el-button
            v-else
            disabled
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation1(scope.row, '1')"
            >付款</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        v-if="isdele"
        label="操作"
        fixed="right"
        align="left"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.creationtime == 2 && isAdmin"
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation(scope.row)"
            >撤销</el-button
          >
          <el-button
            v-if="scope.row.creationtime != 2 && isAdmin"
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation(scope.row)"
            >付款</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="isdele2"
        label="操作"
        fixed="right"
        align="left"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.creationtime == 2 && isAdmin"
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation(scope.row)"
            >撤销</el-button
          >
          <el-button
            v-if="scope.row.creationtime != 2 && isAdmin"
            :disabled="scope.row.status != '2'"
            type="text"
            slot="reference"
            size="mini"
            @click.native.stop="creation(scope.row)"
            >收款</el-button
          >
        </template>
      </el-table-column>

      <el-table-column v-if="printable" label="打印" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click.stop="printPDF(scope.row.id)"
            >打印</el-button
          >
        </template>
      </el-table-column>
      <div class="bottom_fo" slot="append" v-if="isFooter == 1">
        <div class="xjclass">小计</div>
        <div class="hjclass">合计</div>
        <div class="fenge"></div>
        <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
          <div class="sum_footer xiaoji" ref="sum_xiaoji">
            <div class="sum_footer_unit center">小计</div>
            <div class="sum_footer_unit"></div>
            <div
              v-for="(item, index) in footerNumList"
              :key="index"
              :class="
                item.xj ? 'over_sum_text sum_footer_unit' : 'sum_footer_unit'
              "
            >
              <el-tooltip
                v-if="item.xj"
                class="item"
                effect="dark"
                :content="item.xj"
                placement="top"
              >
                <div style="text-align: left">
                  {{ item.xj }}
                </div>
              </el-tooltip>
            </div>
            <div class="sum_footer_unit"></div>
            <div v-if="isdele2" class="sum_footer_unit"></div>
            <div v-if="isdele2" class="sum_footer_unit"></div>
            <div v-if="isdele" class="sum_footer_unit"></div>
            <div v-if="isdele" class="sum_footer_unit"></div>
          </div>
          <div class="sum_footer" ref="sum_heji">
            <div class="sum_footer_unit center">合计</div>
            <div class="sum_footer_unit"></div>
            <div
              v-for="(item, index) in footerNumList"
              :key="index"
              :class="
                item.hj ? 'over_sum_text sum_footer_unit' : 'sum_footer_unit'
              "
            >
              <el-tooltip
                v-if="item.hj"
                class="item"
                effect="dark"
                :content="item.hj"
                placement="top"
              >
                <div style="text-align: left">
                  {{ item.hj }}
                </div>
              </el-tooltip>
            </div>
            <div class="sum_footer_unit"></div>
            <div v-if="isdele2" class="sum_footer_unit"></div>

            <div v-if="isdele2" class="sum_footer_unit"></div>
            <div v-if="isdele" class="sum_footer_unit"></div>
            <div v-if="isdele" class="sum_footer_unit"></div>
          </div>
        </div>
      </div>
    </el-table>
    <el-dialog
      :visible.sync="showPaymentHistory"
      title="操作记录"
      width="30%"
      class="left-align"
    >
      <el-timeline v-if="paymentHistory.length > 0" :reverse="true">
        <el-timeline-item
          v-for="(item, index) in paymentHistory"
          :key="index"
          :timestamp="item.handle_date"
          placement="top"
        >
          <el-card>
            <div class="user-info">
              <div class="avatar" v-if="item.avatar && item.uname">
                <img :src="item.avatar" :alt="item.uname + '头像'" />
              </div>
              <div class="no-avatar" v-else-if="item.uname">
                {{
                  2 >= item.uname.length
                    ? item.uname
                    : item.uname.substr(item.uname.length - 2, 2)
                }}
              </div>
              <div class="no-avatar" v-else>无名</div>

              <span>{{ item.uname ? item.uname : "无名氏" }}</span>
            </div>
            <p>操作类型：{{ item.type }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <div v-else class="emptyPlaceholder" style="text-align: center">
        <img
          :style="{ width: '50%', height: 'auto' }"
          src="@/assets/images/empty.png"
          alt="暂无信息"
        />
        <h1>暂无小计</h1>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="showPaymentHistoryone"
      title="付款记录"
      width="30%"
      class="left-align"
    >
      <el-timeline v-if="paymentHistoryone.length > 0" :reverse="true">
        <el-timeline-item
          v-for="(item, index) in paymentHistoryone"
          :key="index"
          :timestamp="item.created"
          placement="top"
          style="position: relative"
        >
          <el-card :class="[item.status != 1 ? 'cheTrue' : '']">
            <div class="user-info">
              <div class="avatar" v-if="item.avatar && item.uname">
                <img :src="item.avatar" :alt="item.username + '头像'" />
              </div>
              <div class="no-avatar" v-else-if="item.username">
                {{
                  2 >= item.username.length
                    ? item.username
                    : item.username.substr(item.username.length - 2, 2)
                }}
              </div>
              <div class="no-avatar" v-else>无名</div>

              <span>{{ item.username ? item.username : "无名氏" }}</span>

              <div class="chexiao">
                <el-button
                  type="text"
                  slot="reference"
                  size="mini"
                  class="kuan"
                  v-if="item.status == 1"
                  @click="chexiao(item)"
                  >撤销付款</el-button
                >

                <el-button
                  disabled
                  type="text"
                  slot="reference"
                  v-else
                  size="mini"
                  style="
                    border: 1px solid #409eff;
                    text-align: center;
                    width: 76px;
                    margin-left: 0;
                  "
                  class="kuan"
                  @click="chexiao(item)"
                  >已撤销</el-button
                >
              </div>
            </div>
            <div style="margin-top: 5px">付款账户: {{ item.account }}</div>
            <div style="margin-top: 5px">付款金额: {{ item.money }}</div>
            <div style="margin-top: 5px">
              付款凭证:
              <div
                class="dingFilesClass"
                v-for="(item1, index) in item.pay_voucher"
                :key="index"
              >
                <div style="position: relative">
                  <div>
                    <div class="fileIcon">
                      <i
                        class="iconfont icon-wenjian"
                        style="color: #fcb138"
                      ></i>
                    </div>
                    <div class="filesTitle" style="width: 350px">
                      <div>
                        {{ item1.fileName }}
                      </div>
                      <p>{{ (item1.fileSize / 1024).toFixed(2) }}kb</p>
                    </div>
                  </div>
                  <div class="watchBtn" @click="watchFiles(item1)">预览</div>
                </div>
              </div>
            </div>
            <!-- <p>操作类型：{{ item.type }}</p> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <div v-else class="emptyPlaceholder" style="text-align: center">
        <img
          :style="{ width: '50%', height: 'auto' }"
          src="@/assets/images/empty.png"
          alt="暂无信息"
        />
        <h1>暂无付款</h1>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";

export default {
  name: "commonTable",
  components: {},
  props: {
    tpList: Array,
    titleList: Array,
    isFooter: Number,
    footerNumList: Array,
    isdele: Boolean,
    isdata: Boolean,
    isdele1: {
      type: Boolean,
      default: false,
    },
    isdele5: Boolean,
    isdele6: Boolean,
    isdele8: Boolean,
    tableloading: Boolean,
    isdele2: Boolean,
    isBack: Boolean,
    isAdmin: {
      type: Boolean,
      default: true,
    },
    hasPrint: {
      type: Boolean,
      default: false,
    },
    printTableName: {
      type: String,
      default: "",
    },
    types: {
      type: String,
      default: "",
    },
  },
  data: (props) => {
    return {
      multSelectData: [],
      printable: props.hasPrint,
      showPaymentHistory: false,
      showPaymentHistoryone: false,
      paymentHistory: [],
      paymentHistoryone: [],
      cx_id: "",
    };
  },
  methods: {
    watchMinWidth(label) {
      if (label.length > 14) return "300px";

      if (label.length == 10) return "280px";

      if (label.length > 8) return "200px";

      if (label.length >= 4) return "160px";

      if (label.length > 0) return "80px";
    },
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return "statistics-warning-row";
      } else {
        return "";
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
    creation(row) {
      console.log(row);
      this.$emit("creation", row);
    },
    getlist() {
      console.log("子触发父");
      this.$emit("getlist");
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
    // 撤销付款
    chexiao(val) {
      console.log(val);
      this.$confirm("此操作将永久撤销付款, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(this.cx_id,this.types,this.$store.state.userInfo.uname,val.id,val.money)
          this.$axios
            .post("/newtao/payOperation", {
              id: this.cx_id,
              biao_name: this.types,
              username: this.$store.state.userInfo.uname,
              cx_id: val.id,
              paid_money: val.money,
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.getlist();
                this.showPaymentHistoryone = false;
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
    async getPaymentHistory1(id) {
      try {
        const res = await this.$axios.post("/newtao/payOperationJu", {
          biao_name: this.types,
          id: id,
        });
        if (res.data.code === 1) {
          this.cx_id = id;
          this.paymentHistoryone = res.data.data ? res.data.data.reverse() : [];
          this.showPaymentHistoryone = true;
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (e) {
        console.log(e);
        this.$message.error("获取操作记录失败");
      }
    },
    creation1(row, type) {
      console.log(row, type);
      //   this.$emit('creation', row,type);
      this.$refs["paymentMonty"].creation(row, type);
    },
    dataSet(row) {
      this.$emit("creation", row);
    },
    dataShow(row) {
      this.$emit("creation", row, "1");
    },
    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post("/finance/dc_pdf", {
        tableName: this.printTableName,
        id: id,
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
    },
    async getPrintableStatus() {
      const res = await this.$axios.post("/finance/control_display", {
        tableName: this.printTableName,
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === "1";
      }
    },
    async getPaymentHistory(id) {
      try {
        const res = await this.$axios.post("/task/see_record", {
          type: this.printTableName,
          id: id,
        });
        if (res.data.code === 1) {
          this.paymentHistory = res.data.content ? res.data.content : [];
          this.showPaymentHistory = true;
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (e) {
        console.log(e);
        this.$message.error("获取操作记录失败");
      }
    },
    //筛选
    handleSelectionChange(val) {
      this.$emit("newlistenChild", this.$utils.canDelete(val));
      this.multSelectData = val.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
      this.$emit("listenChild", this.multSelectData);
    },
    adjustWidth() {
      console.log("123456");
      console.log(this.titleList, "/typestypestypestypestypes");
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
    tableHeaderClass() {
      return "font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px";
    },
    tableRowClass() {
      return "color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;border-color:#F1F8FF;";
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    //查看审批
    checkList(row, column) {
      if (column.type != "selection" && column.label !== "打印") {
        let newUrl = "";
        if (row.filename) {
          newUrl = row.filename;
        } else {
          newUrl = row.url;
        }
        dd.ready(function () {
          dd.biz.util.openSlidePanel({
            url: newUrl, //打开侧边栏的url
            title: "详情", //侧边栏顶部标题
            onSuccess: function () {},
            onFail: function () {},
          });
        });
      }
    },
  },
  mounted() {
    this.getPrintableStatus();
    window.addEventListener("resize", () => {
      this.$nextTick(() => {
        if (this.$refs.table) {
          this.$refs.table.doLayout();
        }
        setTimeout(() => {
          this.adjustWidth();
        }, 100);
      });
    });
  },
  watch: {
    tpList: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        setTimeout(() => {
          this.adjustWidth();
        }, 500);
      },
    },
    titleList: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        setTimeout(() => {
          this.adjustWidth();
        }, 500);
      },
    },
  },
};
</script>

<style lang="less">
.el-table__row.statistics-warning-row {
  background: #f1f8ff;
}
.watchBtn {
  position: absolute;
  right: 8px;
  top: 13px;
}
.chexiao {
  position: absolute;
  top: 34px;
  right: 23px;
}
.cheTrue {
  background-color: white;
  color: #c1c1c1;
}
.kuan {
  padding: 2px 5px;
  border: 1px solid #409eff;
  width: 70px;
}
.kuan span {
  color: #409eff !important;
  margin-left: 0 !important;
}
.bottom_fo {
  position: relative;
  .xjclass {
    position: absolute;
    z-index: 9999;
    bottom: 45px;
    font-size: 12px;
    color: #5f5f5f;
    width: 54px;
  }
  .hjclass {
    position: absolute;
    z-index: 9999;
    bottom: 10px;
    font-size: 12px;
    color: #5f5f5f;
    width: 54px;
  }
  .fenge {
    width: 100%;
    position: absolute;
    z-index: 999;
    bottom: 36px;
    border-bottom: 1px solid #ebeef5;
    height: 1px;
  }
}
.el-table__fixed-right {
  background-color: #fff;
}
.el-table__fixed {
  background-color: #ffffff;
}
.el-table tr {
  height: 49px;
}
.no-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  font-size: 10px;
}
.avatar {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.user-info {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px dashed #ccc;
  span {
    font-size: 12px;
    color: #666;
    margin-left: 8px;
  }
}
.left-align {
  text-align: left;
}
</style>
