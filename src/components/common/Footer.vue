<template>
  <div class="row footer">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
      © 2023 Salla - All Rights Reserved.
    </div>
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
    </div>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-end">
      Privacy Policy
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterPage',
}
</script>
<style lang="scss" scoped>
.footer {
  position: fixed;
  z-index: 99;
  background: #F5F5F5;
  bottom: 0;
  width: 100%;
  margin: 0;
  box-shadow: 0px 0px 10px 0px gray;
  padding: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #08376B;
}
</style>
