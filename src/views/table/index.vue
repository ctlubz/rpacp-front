<template>
  <div class="app-container">
    <div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="工单号：">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100 table-layout: auto%"
    >
      <el-table-column align="center" label="工单号">
        <template slot-scope="scope">
          <!-- {{ scope.$index }} -->
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="工单类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderType }}
        </template>
      </el-table-column>
      <el-table-column label="业务类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.busiType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统来源" align="center">
        <template slot-scope="scope">
          {{ scope.row.sysSource }}
        </template>
      </el-table-column>
      <el-table-column label="客户名称" align="center">
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
      <el-table-column label="受理人" align="center">
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
  </div>
</template>

<script>
import { getList } from '@/api/table'

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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
      // console.log(this.list)
    }
  }
}
</script>
