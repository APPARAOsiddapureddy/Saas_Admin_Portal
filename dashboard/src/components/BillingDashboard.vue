<template>
    <div ref="userRoot"></div>
  </template>
  
  <script>
  export default {
    name: 'billingdashboardwrapper',
    mounted() {
      import('billingdashboard/BillingDB').then(({ mount }) => {
        mount(this.$refs.userRoot);
      });
    },
  };
  </script>
  