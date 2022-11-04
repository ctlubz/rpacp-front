<template>
  <div class="app-container">
    <el-tabs v-model="activeName" style="width: 100%;">
      <el-tab-pane label="工单查询" name="orderInfo">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="工单号：">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-form>
        <el-divider />
        <el-table
          v-loading="listLoading"
          :data="listOrderInfo"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 100 table-layout: auto%"
        >
          <el-table-column align="center" label="工单号" width="100px">
            <template slot-scope="scope">
              <!-- {{ scope.$index }} -->
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="工单类型" align="center" width="80px">
            <template slot-scope="scope">
              {{ scope.row.orderType }}
            </template>
          </el-table-column>
          <el-table-column label="业务类型" align="center" width="80px">
            <template slot-scope="scope">
              <span>{{ scope.row.busiType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="系统来源" align="center">
            <template slot-scope="scope">
              {{ scope.row.sysSource }}
            </template>
          </el-table-column>
          <el-table-column label="客户名称" align="center" width="80px">
            <template slot-scope="scope">
              {{ scope.row.custName }}
            </template>
          </el-table-column>
          <el-table-column label="发起时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.fromTime }}
            </template>
          </el-table-column>
          <el-table-column label="受理营业厅" align="center">
            <template slot-scope="scope">
              {{ scope.row.acceptBusiHall }}
            </template>
          </el-table-column>
          <el-table-column label="受理人" align="center" width="80px">
            <template slot-scope="scope">
              {{ scope.row.acceptPeople }}
            </template>
          </el-table-column>
          <el-table-column label="接单营业厅" align="center">
            <template slot-scope="scope">
              {{ scope.row.receiveBusiHall }}
            </template>
          </el-table-column>
          <el-table-column label="受理业务类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.acceptBusiTpye }}
            </template>
          </el-table-column>
          <el-table-column label="订单状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.orderStatus }}
            </template>
          </el-table-column>
          <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="Display_time" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.display_time }}</span>
            </template>
          </el-table-column> -->
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="备注修改" name="buisInfo">
        <el-table
          v-loading="listLoading"
          :data="listBuisInfo"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 100 table-layout: auto%"
        >
          <el-table-column align="center" label="工单号" width="100px">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="客户名称" align="center" width="80px">
            <template slot-scope="scope">
              {{ scope.row.custName }}
            </template>
          </el-table-column>
          <el-table-column label="证件类型" align="center" width="120px">
            <template slot-scope="scope">
              {{ scope.row.certType }}
            </template>
          </el-table-column>
          <el-table-column label="证件号码" align="center" width="180px">
            <template slot-scope="scope">
              {{ scope.row.certNum }}
            </template>
          </el-table-column>
          <el-table-column label="联系电话" align="center" width="150px">
            <template slot-scope="scope">
              {{ scope.row.phoneNum }}
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">
              {{ scope.row.remark }}
            </template>
          </el-table-column>
          <el-table-column min-width="300px" label="备注">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.remark" class="edit-input" size="small" />
                <el-button
                  class="cancel-btn"
                  size="small"
                  icon="el-icon-refresh"
                  type="warning"
                  @click="cancelEdit(row)"
                >
                  cancel
                </el-button>
              </template>
              <span v-else style="align-content: center;">{{ row.remark }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="Actions" width="120">
            <template slot-scope="{row}">
              <el-button
                v-if="row.edit"
                type="success"
                size="small"
                icon="el-icon-circle-check-outline"
                @click="confirmEdit(row)"
              >
                Ok
              </el-button>
              <el-button
                v-else
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="row.edit=!row.edit"
              >
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getListOrderInfo, getListBuisInfo } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      activeName: 'orderInfo',
      listOrderInfo: null,
      listBuisInfo: null,
      listLoading: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created() {
    this.fetchOrderInfo()
  },
  methods: {
    async fetchOrderInfo() {
      this.listLoading = true
      getListOrderInfo().then(response => {
        this.listOrderInfo = response.data
      })
      getListBuisInfo().then(response => {
        this.listBuisInfo = response.data
      })
      // const items = data.items
      // this.listBuisInfo = items.map(v => {
      //   this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      //   v.originalTitle = v.title //  will be used when user click the cancel botton
      //   return v
      // })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>
