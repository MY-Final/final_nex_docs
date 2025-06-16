<template>
  <div class="custom-component">
    <div class="custom-title">{{ title }}</div>
    <div class="custom-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '自定义组件'
  }
})
</script>

<style scoped>
.custom-component {
  border: 2px solid #4fc08d;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.custom-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 8px;
  color: #4fc08d;
}

.custom-content {
  background-color: rgba(79, 192, 141, 0.1);
  padding: 12px;
  border-radius: 4px;
}
</style> 