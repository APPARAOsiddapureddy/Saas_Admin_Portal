
<template>
  <div class="dashboard dashboard-row p-grid p-fluid">
    <div class="p-col-12 p-lg-4">
    <div class="card summary">
      <span class="title">Users</span>  
      <span class="detail">Total registered users</span>
      <span class="count visitors">{{ userStats.total }}</span>
    </div>
  </div>
  <div class="p-col-12 p-lg-4">
    <div class="card summary">
      <span class="title">Active Subscriptions</span>
      <span class="detail">Current paying customers</span>
      <span class="count purchases">{{ subscriptionStats.active }}</span>
    </div>
  </div>
  <div class="p-col-12 p-lg-4">
    <div class="card summary">
      <span class="title">Monthly Revenue</span>
      <span class="detail">Income for current month</span>
      <span class="count revenue">${{ formatCurrency(revenueStats.monthly) }}</span>
    </div>
  </div>
    <!-- UserManagement -->
    <!-- <div class="p-col-12">

        <h2>User Management</h2>

        <router-link to="/user-management">Go to User Management</router-link>

      </div> -->
    <div class="card-container">
      <div v-for="module in modules" :key="module.id" class="module-card" :style="{ borderColor: module.color }">
        <div class="card-header" :style="{ backgroundColor: module.color }">
          <i :class="module.icon"></i>
        </div>
        <div class="card-body">
          <h3>{{ module.title }}</h3>
        </div>
        <div class="card-footer">
          <router-link :to="module.route">
            <button class="launch-btn">Launch</button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Metric Highlight Boxes -->
    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color: #007be5; color: #00448f">
          <span>AU</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-user"></i>
          <span>Active Users</span>
          <span class="count">{{ userStats.active }}</span>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color: #ef6262; color: #a83d3b">
          <span>OT</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-ticket"></i>
          <span>Open Tickets</span>
          <span class="count">{{ supportStats.openTickets }}</span>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color: #20d077; color: #038d4a">
          <span>CR</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-percentage"></i>
          <span>Conversion Rate</span>
          <span class="count">{{ marketingStats.conversionRate }}%</span>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color: #f9c851; color: #b58c2b">
          <span>NP</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-star"></i>
          <span>NPS Score</span>
          <span class="count">{{ customerStats.npsScore }}</span>
        </div>
      </div>
    </div>

    <!-- Tasks Panel -->
    <!-- <div class="p-col-12 p-md-6 p-lg-4">
      <Panel header="Pending Tasks" :toggleable="true" class="task-panel">
        <ul class="task-list">
          <li v-for="task in tasks" :key="task.id">
            <div class="task-item">
              <Checkbox v-model="task.completed" :binary="true" />
              <span class="task-name" :class="{ 'completed': task.completed }">{{ task.name }}</span>
              <i :class="'pi ' + task.icon"></i>
            </div>
          </li>
        </ul>
        <div class="task-footer">
          <Button label="Add Task" icon="pi pi-plus" class="p-button-sm" @click="showAddTaskDialog" />
          <Button label="View All" icon="pi pi-external-link" class="p-button-sm p-button-secondary" />
        </div>
      </Panel>
    </div>-->

    <!-- Contact Form -->
    <!-- <div class="p-col-12 p-md-6 p-lg-4 p-fluid contact-form">
      <Panel header="Quick Actions" :toggleable="true">
        <div class="p-grid">
          <div class="p-col-12">
            <Dropdown v-model="selectedAction" :options="quickActions" optionLabel="name" placeholder="Select Action"
              class="w-full" />
          </div>
          <div class="p-col-12">
            <InputText v-model="actionData.title" type="text" placeholder="Title" class="w-full" />
          </div>
          <div class="p-col-12">
            <Textarea v-model="actionData.description" placeholder="Description" rows="3" class="w-full" />
          </div>
          <div class="p-col-12">
            <Dropdown v-model="actionData.priority" :options="priorities" optionLabel="name" placeholder="Priority"
              class="w-full" />
          </div>
          <div class="p-col-12">
            <Button type="button" label="Execute" icon="pi pi-check" class="w-full" />
          </div>
        </div>
      </Panel>
    </div> -->

    <!-- Activity Panel -->
    <!-- <div class="p-col-12 p-lg-4">
      <Panel header="Performance Metrics" :toggleable="true" class="activity-panel">
        <div class="activity-header">
          <div class="p-grid">
            <div class="p-col-6">
              <span style="font-weight: bold">Last Update</span>
              <p>{{ lastUpdated }}</p>
            </div>
            <div class="p-col-6" style="text-align: right">
              <Button label="Refresh" icon="pi pi-refresh" class="p-button-sm" @click="refreshMetrics" />
            </div>
          </div>
        </div>

        <ul class="activity-list">
          <li v-for="(metric, index) in performanceMetrics" :key="index">
            <div class="p-d-flex p-jc-between p-ai-center p-mb-3">
              <h5 class="activity p-m-0">{{ metric.name }}</h5>
              <div class="count" :style="{ backgroundColor: metric.color }">{{ metric.value }}%</div>
            </div>
            <ProgressBar :value="metric.value" :showValue="false" />
          </li>
        </ul>
      </Panel>
    </div> -->

    <!-- Recent Sales Table -->
    <!-- <div class="p-col-12 p-lg-6">
      <div class="card">
        <div class="card-header">
          <h3>Recent Transactions</h3>
          <div class="header-actions">
            <Button icon="pi pi-download" class="p-button-text" tooltip="Export" />
            <Button icon="pi pi-filter" class="p-button-text" tooltip="Filter" />
          </div>
        </div>
        <DataTable :value="transactions" class="p-datatable-transactions" :rows="5" :paginator="true"
          responsiveLayout="scroll" sortField="date" :sortOrder="-1">
          <Column field="customer.name" header="Customer">
            <template #body="slotProps">
              <div class="customer-info">
                <img :src="slotProps.data.customer.avatar" :alt="slotProps.data.customer.name"
                  class="customer-avatar" />
                <div class="customer-details">
                  <span class="name">{{ slotProps.data.customer.name }}</span>
                  <span class="email">{{ slotProps.data.customer.email }}</span>
                </div>
              </div>
            </template>
          </Column>
          <Column field="product" header="Product" :sortable="true"></Column>
          <Column field="amount" header="Amount" :sortable="true">
            <template #body="slotProps">
              ${{ formatCurrency(slotProps.data.amount) }}
            </template>
          </Column>
          <Column field="status" header="Status" :sortable="true">
            <template #body="slotProps">
              <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" />
            </template>
          </Column>
          <Column field="date" header="Date" :sortable="true">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.date) }}
            </template>
          </Column>
          <Column>
            <template #header>Actions</template>
            <template #body>
              <Button icon="pi pi-eye" class="p-button-rounded p-button-text" tooltip="View" />
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" tooltip="Edit" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div> --> 

    <!-- Revenue Chart -->
    <!-- <div class="p-col-12 p-lg-6">
      <div class="card">
        <div class="card-header">
          <h3>Revenue Analytics</h3>
          <div class="chart-period-selector">
            <Button label="Week" class="p-button-text" :class="{ active: chartPeriod === 'week' }"
              @click="chartPeriod = 'week'" />
            <Button label="Month" class="p-button-text" :class="{ active: chartPeriod === 'month' }"
              @click="chartPeriod = 'month'" />
            <Button label="Year" class="p-button-text" :class="{ active: chartPeriod === 'year' }"
              @click="chartPeriod = 'year'" />
          </div>
        </div>
        <Chart type="line" :data="getChartData()" :options="chartOptions" class="revenue-chart" />
      </div>
    </div> -->
  </div>
</template>

<script>

import { ref, reactive, computed, onMounted } from 'vue';
import Panel from 'primevue/panel';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chart from 'primevue/chart';
import ProgressBar from 'primevue/progressbar';
import Tag from 'primevue/tag';

export default {
  name: 'Dashboard',
  // mounted() {
  //   // Dynamically import the mount function from remote
  //   import('usermanagement/UserApp').then(({ mount }) => {
  //     mount(this.$refs.userManagementRoot);
  //   }).catch(err => {
  //     console.error('Failed to mount UserManagement MFE:', err);
  //   });
  // },
  data() {
    return {
      modules: [
        {
          id: 1,
          title: "User Management",
          icon: "pi pi-users", // PrimeIcons
          route: "/user-management",
          color: "#8B5CF6",
        },
        {
          id: 2,
          title: "Billing Dashboard",
          icon: "pi pi-credit-card",
          route: "/billing-dashboard",
          color: "#EC4899",
        },
        {
          id: 3,
          title: "Notifications",
          icon: "pi pi-bell",
          route: "/",
          color: "#6366F1",
        },
        {
          id: 4,
          title: "Dashboard",
          icon: "pi pi-chart-bar",
          route: "/",
          color: "#14B8A6",
        },
      ],
    };
  },
  components: {

    Panel,
    Checkbox,
    Dropdown,
    InputText,
    Textarea,
    Button,
    DataTable,
    Column,
    Chart,
    ProgressBar,
    Tag
  },
  setup() {
    // Stats
    const userStats = reactive({
      total: 8425,
      active: 6572,
      new: 128
    });

    const subscriptionStats = reactive({
      active: 4213,
      trial: 347,
      churned: 26
    });

    const revenueStats = reactive({
      monthly: 92450,
      annual: 1134000,
      growth: 12.3
    });

    const supportStats = reactive({
      openTickets: 42,
      avgResponseTime: '1.3h',
      satisfaction: 94
    });

    const marketingStats = reactive({
      conversionRate: 8.4,
      cac: 275,
      ltv: 2400
    });

    const customerStats = reactive({
      npsScore: 72,
      satisfaction: 91,
      retention: 86
    });

    // Tasks
    const tasks = reactive([
      { id: '1', name: 'Generate Monthly Report', icon: 'pi-chart-bar', completed: false },
      { id: '2', name: 'Review Subscription Plans', icon: 'pi-dollar', completed: false },
      { id: '3', name: 'Meeting with Marketing Team', icon: 'pi-users', completed: true },
      { id: '4', name: 'Update Feature Documentation', icon: 'pi-file', completed: false },
      { id: '5', name: 'Review Support Tickets', icon: 'pi-ticket', completed: false },
      { id: '6', name: 'Plan Q3 Roadmap', icon: 'pi-map', completed: false }
    ]);

    // Quick Actions
    const quickActions = ref([
      { name: 'Create User', code: 'CU' },
      { name: 'Generate Report', code: 'GR' },
      { name: 'Schedule Meeting', code: 'SM' },
      { name: 'Create Billing Cycle', code: 'CB' },
      { name: 'Send Notifications', code: 'SN' }
    ]);

    const priorities = ref([
      { name: 'High', code: 'HIGH' },
      { name: 'Medium', code: 'MED' },
      { name: 'Low', code: 'LOW' }
    ]);

    const selectedAction = ref(null);
    const actionData = reactive({
      title: '',
      description: '',
      priority: null
    });

    // Performance Metrics
    const performanceMetrics = reactive([
      { name: 'Server Uptime', value: 99.8, color: '#20d077' },
      { name: 'API Response Time', value: 94, color: '#007be5' },
      { name: 'Customer Retention', value: 86, color: '#f9c851' },
      { name: 'Churn Rate', value: 5, color: '#ef6262' }
    ]);

    const lastUpdated = ref('Today at 11:42 AM');

    const refreshMetrics = () => {
      // Simulate refresh with slight value changes
      performanceMetrics.forEach(metric => {
        metric.value = Math.max(0, Math.min(100, metric.value + (Math.random() * 6 - 3)));
      });
      const now = new Date();
      lastUpdated.value = `Today at ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    };

    // Transactions
    const transactions = ref([
      {
        id: '1001',
        customer: {
          name: 'Emma Johnson',
          email: 'emma@example.com',
          avatar: '/assets/avatars/avatar1.png'
        },
        product: 'Premium Plan',
        amount: 199.99,
        status: 'Completed',
        date: new Date(2025, 4, 3)
      },
      {
        id: '1002',
        customer: {
          name: 'Michael Chen',
          email: 'michael@example.com',
          avatar: '/assets/avatars/avatar2.png'
        },
        product: 'Enterprise License',
        amount: 1249.99,
        status: 'Pending',
        date: new Date(2025, 4, 2)
      },
      {
        id: '1003',
        customer: {
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          avatar: '/assets/avatars/avatar3.png'
        },
        product: 'Support Package',
        amount: 349.99,
        status: 'Completed',
        date: new Date(2025, 4, 1)
      },
      {
        id: '1004',
        customer: {
          name: 'James Rodriguez',
          email: 'james@example.com',
          avatar: '/assets/avatars/avatar4.png'
        },
        product: 'Standard Plan',
        amount: 99.99,
        status: 'Failed',
        date: new Date(2025, 3, 30)
      },
      {
        id: '1005',
        customer: {
          name: 'Anna Kowalski',
          email: 'anna@example.com',
          avatar: '/assets/avatars/avatar5.png'
        },
        product: 'Premium Plan',
        amount: 199.99,
        status: 'Completed',
        date: new Date(2025, 3, 29)
      },
      {
        id: '1006',
        customer: {
          name: 'Alex Smith',
          email: 'alex@example.com',
          avatar: '/assets/avatars/avatar6.png'
        },
        product: 'Data Analytics Add-on',
        amount: 79.99,
        status: 'Completed',
        date: new Date(2025, 3, 28)
      }
    ]);

    // Chart
    const chartPeriod = ref('month');
    const chartOptions = {
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    };

    const weekData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Revenue',
          data: [3200, 2800, 4100, 3800, 5200, 4700, 6100],
          fill: false,
          borderColor: '#2f4860',
          tension: 0.4
        },
        {
          label: 'Expenses',
          data: [1800, 1900, 2100, 2400, 2200, 2300, 2500],
          fill: false,
          borderColor: '#00bb7e',
          tension: 0.4
        }
      ]
    };

    const monthData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenue',
          data: [65000, 59000, 80000, 81000, 85000, 93000, 89000, 94000, 91000, 97000, 102000, 110000],
          fill: false,
          borderColor: '#2f4860',
          tension: 0.4
        },
        {
          label: 'Expenses',
          data: [28000, 32000, 35000, 39000, 40000, 43000, 45000, 47000, 49000, 50000, 52000, 55000],
          fill: false,
          borderColor: '#00bb7e',
          tension: 0.4
        }
      ]
    };

    const yearData = {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'Revenue',
          data: [520000, 740000, 890000, 975000, 1120000, 1320000],
          fill: false,
          borderColor: '#2f4860',
          tension: 0.4
        },
        {
          label: 'Expenses',
          data: [270000, 350000, 410000, 480000, 520000, 570000],
          fill: false,
          borderColor: '#00bb7e',
          tension: 0.4
        }
      ]
    };

    const getChartData = () => {
      switch (chartPeriod.value) {
        case 'week':
          return weekData;
        case 'year':
          return yearData;
        case 'month':
        default:
          return monthData;
      }
    };

    // Utility functions
    const formatCurrency = (value) => {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };

    const formatDate = (date) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    };

    const getStatusSeverity = (status) => {
      switch (status) {
        case 'Completed':
          return 'success';
        case 'Pending':
          return 'warning';
        case 'Failed':
          return 'danger';
        default:
          return 'info';
      }
    };

    const showAddTaskDialog = () => {
      // Would implement dialog logic here
      console.log('Show add task dialog');
    };

    onMounted(() => {
      // Initialize or fetch data
      console.log('Dashboard mounted');
    });

    return {
      userStats,
      subscriptionStats,
      revenueStats,
      supportStats,
      marketingStats,
      customerStats,
      tasks,
      quickActions,
      priorities,
      selectedAction,
      actionData,
      performanceMetrics,
      lastUpdated,
      refreshMetrics,
      transactions,
      chartPeriod,
      chartOptions,
      getChartData,
      formatCurrency,
      formatDate,
      getStatusSeverity,
      showAddTaskDialog
    };
  }
};
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}

.module-card {
  width: calc(25% - 15px);
  border: 2px solid;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 16px;
  text-align: center;
  color: white;
}

.card-header i {
  font-size: 24px;
}

.card-body {
  padding: 16px;
  flex-grow: 1;
}

.card-body h3 {
  margin: 0;
  font-size: 18px;
  text-align: center;
}

.card-footer {
  padding: 12px;
  text-align: center;
}

.dashboard-row {
  display: flex;
  flex-wrap: wrap;
  margin: -1rem; /* for spacing between columns */
}

.p-col-12 {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

@media (min-width: 992px) {
  .p-lg-4 {
    width: 33.3333%;
  }
}

/* Card styles (same as previous message) */
.card.summary {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.card.summary:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.card .title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 0.25rem;
}

.card .detail {
  font-size: 0.9rem;
  color: #777;
  display: block;
  margin-bottom: 1.25rem;
}

.card .count {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  display: block;
}
.count.visitors { color: #3498db; }
.count.purchases { color: #27ae60; }
.count.revenue { color: #e67e22; }


.launch-btn {
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.launch-btn:hover {
  background-color: #555;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .card-container {
    flex-wrap: wrap;
  }

  .module-card {
    width: calc(50% - 10px);
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .module-card {
    width: 100%;
  }
}

.highlight-box {
  display: flex;
  border-radius: 12px;
  padding: 1rem;
  background-color: var(--surface-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  .initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    font-weight: 700;
    margin-right: 1rem;
  }

  .highlight-details {
    flex: 1;
    display: flex;
    flex-direction: column;

    i {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-color-secondary);
    }

    span {
      &:first-child {
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      &.count {
        font-size: 1.25rem;
        font-weight: 700;
      }
    }
  }
}

.task-panel,
.activity-panel {
  height: 100%;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--surface-border);

    &:last-child {
      border-bottom: none;
    }

    .task-item {
      display: flex;
      align-items: center;

      .task-name {
        margin: 0 0.5rem;
        flex: 1;

        &.completed {
          text-decoration: line-through;
          color: var(--text-color-secondary);
        }
      }

      i {
        color: var(--primary-color);
        font-size: 1.25rem;
      }
    }
  }
}

.task-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.activity-header {
  margin-bottom: 1rem;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .activity {
      color: var(--text-color);
    }

    .count {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-weight: 700;
      color: white;
    }
  }
}

.customer-info {
  display: flex;
  align-items: center;

  .customer-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 0.75rem;
  }

  .customer-details {
    display: flex;
    flex-direction: column;

    .name {
      font-weight: 600;
    }

    .email {
      font-size: 0.875rem;
      color: var(--text-color-secondary);
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .header-actions,
  .chart-period-selector {
    display: flex;
    gap: 0.5rem;
  }
}

.revenue-chart {
  height: 300px;
}

.chart-period-selector {
  .p-button-text {
    padding: 0.5rem 1rem;

    &.active {
      background-color: var(--primary-color-alpha-10);
      color: var(--primary-color);
      font-weight: 600;
    }
  }
}

/* Dark mode specific styles */
:root.dark-theme {
  .card {
    background-color: var(--surface-overlay);
  }

  .highlight-box {
    background-color: var(--surface-overlay);
  }
}

/* Responsive adjustments */
@media screen and (max-width: 960px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;

    .header-actions,
    .chart-period-selector {
      margin-top: 0.5rem;
    }
  }
}

@media screen and (max-width: 640px) {
  .highlight-box {
    .initials {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}
</style>