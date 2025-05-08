<template>
    <div ref="userRoot"></div>
  </template>
  
  <script>
  export default {
    name: 'UserManagementWrapper',
    mounted() {
      import('usermanagement/UserApp').then(({ mount }) => {
        mount(this.$refs.userRoot);
      });
    },
  };
  </script>
  