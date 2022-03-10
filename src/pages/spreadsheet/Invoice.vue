
<template>
    <div id="Invoice">
        <div class="invoice-header-back">
            <el-button @click="blackBtn" icon="el-icon-arrow-left"
                >返回</el-button
            >
        </div>
<!-- 
        <div class="title">
            <div class="invoice-header-wrap">
                <div class="invoice-header-item" style="width: 30%">
                    <div class="invoice-header-item-name">订单名称：</div>
                    <div class="invoice-header-item-value">
                        {{ orderData.name }}
                    </div>
                </div>
                <div class="invoice-header-item" style="width: 40%">
                    <div class="invoice-header-item-name">订单编号：</div>
                    <div class="invoice-header-item-value">
                        {{ orderData.orderId }}
                    </div>
                </div>
                <div class="invoice-header-item" style="width: 30%">
                    <div class="invoice-header-item-name">交易金额：</div>
                    <div class="invoice-header-item-value">
                        {{ orderData.payFee }}
                    </div>
                </div>
                <div class="invoice-header-item" style="width: 30%">
                    <div class="invoice-header-item-name">购买时间：</div>
                    <div class="invoice-header-item-value">
                        {{ orderData.start }}
                    </div>
                </div>
                <div class="invoice-header-item" style="width: 40%">
                    <div class="invoice-header-item-name">到期时间：</div>
                    <div class="invoice-header-item-value">
                        {{ orderData.stop }}
                    </div>
                </div>
                <div class="invoice-header-item" style="width: 30%">
                    <div class="invoice-header-item-name">已用人数：</div>
                    <div class="invoice-header-item-value">
                        {{ orderData.number }}
                    </div>
                </div>
            </div>
        </div> -->
        <div class="invoice-steps-container">
            <!-- <a-steps :current="current">
                <a-step>
                    <template slot="title"> 提交开票信息 </template>
                    <span slot="description">填写开票信息</span>
                </a-step>
                <a-step>
                    <template slot="title"> 审核中 </template>
                    <span slot="description">预计7个工作日内</span>
                </a-step>
                <a-step>
                    <template slot="title"> 开票结果 </template>
                    <span slot="description">返回发票号和快递单号</span>
                </a-step>
            </a-steps> -->

            <!-- <el-steps :active="current">
                <el-step
                    title="提交开票信息"
                    description="填写开票信息"
                ></el-step>
                <el-step title="审核中" description="预计7个工作日内"></el-step>
                <el-step
                    title="开票结果"
                    description="返回发票号和快递单号"
                ></el-step>
            </el-steps> -->
        </div>

        <!-- 1 -->
        <div v-if="current == 0" class="invoice-submit-container">
            <el-divider>发票信息</el-divider>
            <el-form ref="invoiceForm" :model="invoiceForm" label-width="120px">
                <el-form-item
                    prop="type"
                    label="发票类型:"
                    :rules="[
                        {
                            required: true,
                            message: '不能为空',
                            trigger: 'blur'
                        }
                    ]"
                >
                    <el-radio-group
                        @change="radioChange"
                        v-model="invoiceForm.type"
                    >
                        <el-radio label="普通电子发票"></el-radio>
                        <el-radio label="增值税专用发票"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    prop="invoice_header"
                    label="发票抬头:"
                    :rules="[
                        {
                            required: true,
                            message: '不能为空',
                            trigger: 'blur'
                        }
                    ]"
                >
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.invoice_header"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="duty_paragraph"
                    label="税号:"
                    :rules="[
                        {
                            required: true,
                            message: '不能为空',
                            trigger: 'blur'
                        }
                    ]"
                >
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.duty_paragraph"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="bank_deposit"
                    label="开户行:"
                    :rules="
                        !isType
                            ? [
                                  {
                                      required: true,
                                      message: '不能为空',
                                      trigger: 'blur'
                                  }
                              ]
                            : [
                                  {
                                      required: false,
                                      message: '不能为空',
                                      trigger: 'blur'
                                  }
                              ]
                    "
                >
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.bank_deposit"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="account_bank"
                    label="开户银行账号:"
                    :rules="
                        !isType
                            ? [
                                  {
                                      required: true,
                                      message: '不能为空',
                                      trigger: 'blur'
                                  }
                              ]
                            : [
                                  {
                                      required: false,
                                      message: '不能为空',
                                      trigger: 'blur'
                                  }
                              ]
                    "
                >
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.account_bank"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="company_mobile"
                    label="公司电话:"
                    :rules="
                        !isType
                            ? [
                                  {
                                      required: true,
                                      message: '不能为空',
                                      trigger: 'blur'
                                  }
                              ]
                            : [
                                  {
                                      required: false,
                                      message: '不能为空',
                                      trigger: 'blur'
                                  }
                              ]
                    "
                >
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.company_mobile"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="company_address"
                    label="公司地址:"
                    :rules="
                        !isType
                            ? [
                                  {
                                      required: true,
                                      message: '不能为空',
                                      trigger: 'blur'
                                  }
                              ]
                            : [
                                  {
                                      required: false,
                                      message: '不能为空',
                                      trigger: 'blur'
                                  }
                              ]
                    "
                >
                    <el-input
                        placeholder="请输入"
                        type="textarea"
                        v-model="invoiceForm.company_address"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="remarks">
                    <el-input
                        placeholder="请输入"
                        type="textarea"
                        v-model="invoiceForm.remarks"
                    ></el-input>
                </el-form-item>
                <el-divider>收件人信息</el-divider>
                <!-- 普通电子发票 -->
                <el-form-item label="收件人姓名:" prop="recipient_name">
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.recipient_name"
                    ></el-input>
                </el-form-item>
                <el-form-item label="收件人电话:" prop="recipient_mobile">
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.recipient_mobile"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="recipient_email"
                    v-if="isType"
                    label="收件人邮箱:"
                    :rules="[
                        {
                            required: true,
                            message: '不能为空',
                            trigger: 'blur'
                        }
                    ]"
                >
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.recipient_email"
                    ></el-input>
                </el-form-item>
                <!-- 增值税专用发票 -->
                <el-form-item
                    prop="recipient_address"
                    v-else
                    label="详细地址:"
                    :rules="[
                        {
                            required: true,
                            message: '不能为空',
                            trigger: 'blur'
                        }
                    ]"
                >
                    <el-input
                        placeholder="请输入"
                        v-model="invoiceForm.recipient_address"
                    ></el-input>
                </el-form-item>

                <div style="text-align: center">
                    <el-button
                        type="primary"
                        @click="submitForm('invoiceForm')"
                    >
                        提交
                    </el-button>
                    <el-button @click="resetForm('invoiceForm')"
                        >重置</el-button
                    >
                </div>
            </el-form>
        </div>

        <!--2  -->
        <div v-else-if="current == 1" class="invoice-wait-container">
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">发票抬头 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.invoice_header }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">税号 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.duty_paragraph }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">发票类型 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.type }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">开户行 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.bank_deposit }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">开户银行账号 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.account_bank }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">公司电话 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.company_mobile }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">公司地址 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.company_address }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">备注 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.remarks }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">收件人姓名 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.recipient_name }}
                </div>
            </div>
            <div class="invoice-wait-wrap">
                <div class="invoice-wait-name">收件人电话 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.recipient_mobile }}
                </div>
            </div>
            <div class="invoice-wait-wrap" v-if="isType">
                <div class="invoice-wait-name">收件人邮箱 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.recipient_email }}
                </div>
            </div>
            <div class="invoice-wait-wrap" v-else>
                <div class="invoice-wait-name">详细地址 ：</div>
                <div class="invoice-wait-value">
                    {{ invoiceForm.recipient_address }}
                </div>
            </div>
        </div>
        <!-- 3 -->
        <div v-else class="invoice-result-container">
            <!-- <div class="invoice-result-wrap">
                <div class="invoice-result-name">开票结果：</div>
                <div
                    class="invoice-result-value"
                    style="color: rgb(21, 188, 131)"
                >
                    开票成功
                </div>
            </div>
            <div class="invoice-result-wrap">
                <div class="invoice-result-name">发票号：</div>
                <div class="invoice-result-value">
                    {{ invoiceForm.extend_first }}
                </div>
            </div>
            <div class="invoice-result-action" style="text-align: center">
                <button
                    type="button"
                    class="ant-btn ant-btn-primary"
                    @click="loadImg"
                >
                    <span>下载电子发票</span>
                </button>
            </div> -->
            <div
                class="
                    ant-divider
                    ant-divider-horizontal
                    ant-divider-with-text-center
                    ant-divider-dashed
                "
                role="separator"
                style="font-size: 14px; font-weight: normal; margin-top: 40px"
            >
                <span class="ant-divider-inner-text">发票信息</span>
            </div>
            <div class="invoice-detail-wrap">
                <div class="invoice-wait-wrap">
                    <div class="invoice-wait-name">发票抬头 ：</div>
                    <div class="invoice-wait-value">
                        {{ invoiceForm.invoice_header }}
                    </div>
                </div>
                <div class="invoice-wait-wrap">
                    <div class="invoice-wait-name">税号 ：</div>
                    <div class="invoice-wait-value">
                        {{ invoiceForm.duty_paragraph }}
                    </div>
                </div>
                <div class="invoice-wait-wrap">
                    <div class="invoice-wait-name">发票类型 ：</div>
                    <div class="invoice-wait-value">{{ invoiceForm.type }}</div>
                </div>
                <div class="invoice-wait-wrap">
                    <div class="invoice-wait-name">开户行 ：</div>
                    <div class="invoice-wait-value">
                        {{ invoiceForm.bank_deposit }}
                    </div>
                </div>
                <div class="invoice-wait-wrap">
                    <div class="invoice-wait-name">开户银行账号 ：</div>
                    <div class="invoice-wait-value">
                        {{ invoiceForm.account_bank }}
                    </div>
                </div>
                <div class="invoice-wait-wrap">
                    <div class="invoice-wait-name">公司电话 ：</div>
                    <div class="invoice-wait-value">
                        {{ invoiceForm.company_mobile }}
                    </div>
                </div>
                <div class="invoice-wait-wrap">
                    <div class="invoice-wait-name">公司地址 ：</div>
                    <div class="invoice-wait-value">
                        {{ invoiceForm.company_address }}
                    </div>
                </div>
                <div class="invoice-wait-wrap">
                    <div class="invoice-wait-name">备注 ：</div>
                    <div class="invoice-wait-value">
                        {{ invoiceForm.remarks }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Invoice',
    data() {
        return {
            orderData: '',
            current: 0,
            isType: true, //普通电子发票 true 增值税专用发票 false
            invoiceForm: {
                corp_id: this.$store.state.cid,
                gl_id: '', //	关联订单id
                order_id: '', //订单号
                type: '普通电子发票',
                invoice_header: '',
                duty_paragraph: '',
                bank_deposit: '',
                account_bank: '',
                company_mobile: '',
                company_address: '',
                remarks: '',
                recipient_name: '',
                recipient_mobile: '',
                recipient_email: '',
                recipient_address: '',
                extend_first: '',
                image: ''
            }
        };
    },

    methods: {
        loadImg() {
            console.log(this.invoiceForm);
            window.open(this.invoiceForm.image);
        },
        blackBtn() {
            this.$router.go(-1);
        },
        radioChange() {
            console.log(this.invoiceForm.type);
            // this.$refs['invoiceForm'].resetFields();
            this.isType = !this.isType;

            console.log(this.isType);
        },
        // 提交
        submitForm(formName) {
            const _this = this;
            let newData = JSON.parse(JSON.stringify(_this.invoiceForm));
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/invoice/kaijufapiaoxinxi', newData)
                        .then((res) => {
                            _this.$message({
                                message: res.data.msg,
                                type: 'success',
                                duration: 1500
                            });
                            _this.current = 1;
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs['invoiceForm'].resetFields();
        },
        //获取开票详情
        getInfo() {
            this.$axios
                .post('/invoice/kaijufapiaolist', {
                    corp_id: this.$store.state.cid,
                    gl_id: this.$route.query.data.id
                    // gl_id: '1491'
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.invoiceForm = res.data.content;
                    }
                });
        }
    },
    created() {
        console.log(this.$route.query.data);
        this.orderData = this.$route.query.data;
        this.current = Number(this.$route.query.data.type);
        this.invoiceForm.gl_id = this.$route.query.data.id;
        this.invoiceForm.order_id = this.$route.query.data.orderId;
        // if (
        //     this.$route.query.data.type == 2 ||
        //     this.$route.query.data.type == 1
        // ) {
            this.getInfo();
        // }
    }
};
</script>

<style lang="less" >
#Invoice {
    width: 80%;
    margin: auto;
    background-color: #fff;
    border-radius: 4px;
    padding: 0 30px;
    .invoice-header-back {
        width: 100%;
        padding: 8px 0;
    }
    .title {
        padding: 8px 15px;
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        .invoice-header-wrap {
            padding: 8px 0;
            display: -webkit-box;
            display: flex;
            display: -webkit-flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            .invoice-header-item {
                height: 28px;
                -webkit-box-align: center;
                -webkit-align-items: center;
                align-items: center;
                display: -webkit-box;
                display: flex;
                display: -webkit-flex;
                .invoice-header-item-name {
                    width: 50%;
                    text-align: right;
                    color: #5b5c5f;
                    font-weight: 400;
                }
                .invoice-header-item-value {
                    width: 50%;
                    color: #1c2328;
                }
            }
        }
    }
    .invoice-steps-container {
        padding: 32px 128px 16px;
    }
    .invoice-submit-container {
        padding: 15px 0;
        .el-form {
            width: 50%;
            margin: auto;
        }
    }
    .invoice-wait-container {
        padding: 16px 0 64px;
        .invoice-wait-wrap {
            display: -webkit-box;
            display: flex;
            display: -webkit-flex;
            padding-bottom: 12px;
            .invoice-wait-name {
                text-align: right;
                width: 50%;
                color: #999;
                font-weight: 400;
            }
            .invoice-wait-value {
                width: 50%;
                color: #333;
                padding-left: 8px;
                padding-right: 80px;
                box-sizing: border-box;
            }
        }
    }
    .invoice-result-container {
        padding: 16px 0 64px;
        .invoice-result-wrap {
            display: -webkit-box;
            display: flex;
            display: -webkit-flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            line-height: 32px;
            .invoice-result-name {
                text-align: right;
                width: 50%;
                color: #999;
                font-weight: 400;
            }
            .invoice-result-value {
                width: 50%;
                color: #333;
                padding-left: 16px;
            }
        }
        .invoice-detail-wrap {
            .invoice-wait-wrap {
                display: flex;
                padding-bottom: 12px;
                .invoice-wait-name {
                    text-align: right;
                    width: 50%;
                    color: #999;
                    font-weight: 400;
                }
                .invoice-wait-value {
                    width: 50%;
                    color: #333;
                    padding-left: 8px;
                    padding-right: 80px;
                    box-sizing: border-box;
                }
            }
        }
    }
}
</style>

