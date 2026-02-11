/* ==========================================================================
FileUploadDemo.vue - File Upload Demo Component.
========================================================================== */
<script setup lang="ts">
import { ref } from 'vue';
import FileUpload from '@/form-components/FileUpload.vue';

const file = ref([]);
</script>
/* Template ============================================================== */
<template>
  <div class="CC__demo-container">
    <h2 class="demo__input-title">File Upload Demo</h2>
    <div class="demo__input-btn-container">
      <div class="cc-w-75">
        <FileUpload
          v-model="file"
          label="Upload your files"
          :multiple="true"
        />
      </div>
    </div>
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss"></style>
