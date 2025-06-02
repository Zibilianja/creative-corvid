/* ==========================================================================
FileUpload.vue Describe what this component does.
========================================================================== */
<script setup lang="ts">
import { computed, ref, useSlots, watch, type PropType } from 'vue';
import { GetInputId } from '@/utils';

const props = defineProps({
  modelValue: {
    type: [File, Array],
    default: () => [],
  },
  accept: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);
const slots = useSlots();
const inputId = GetInputId();
const isInvalid = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

const files = computed<File[]>({
  get: () => props.modelValue as File[],
  set: (value: File[]) => {
    emit('update:modelValue', value);
  },
});

/**
 * Return the context of the files based on the number of files.
 *
 * @returns {string} The context of the files.
 */
const filesContext = computed((): string => {
  return props.multiple ? 'files' : 'a file';
});

/**
 * Return the label for the file count.
 *
 * @returns {string} The label for the file count.
 */
const fileCountLabel = computed((): string => {
  if (files.value.length === 1) {
    return '1 file:';
  }
  return `${files.value.length} files:`;
});

/**
 * Return the error message.
 *
 * @returns {string} The error message.
 */
const _errorMessages = computed((): string => {
  if (props.errorMessages.length > 0) {
    return props.errorMessages[0];
  }
  return '';
});

/**
 * Determine whether to show the details or not.
 *
 * @returns {string} The details to show.
 */
const showDetails = computed(() => {
  return props.hint || slots.hint || _errorMessages.value;
});

/**
 * Determine whether the input is valid or not.
 *
 * @returns {boolean} Whether the input is valid or not.
 */
const isValid = computed((): boolean => {
  if (props.required && files.value.length === 0) {
    return false;
  }
  return _errorMessages.value === '' && !isInvalid.value;
});

watch(
  () => props.errorMessages,
  (newValue) => {
    if (newValue.length) {
      isInvalid.value = true;
    } else {
      isInvalid.value = false;
    }
  }
);

watch(
  () => props.error,
  (newValue) => {
    isInvalid.value = newValue;
  },
  { immediate: true }
);

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = true;
};

const onDragLeave = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
};

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  if (fileInputRef.value) {
    fileInputRef.value.files = e.dataTransfer!.files;
    onChange();
  }
  isDragging.value = false;
};

const onChange = () => {
  if (fileInputRef.value) {
    if (fileInputRef.value.files) {
      if (props.multiple) {
        files.value = [...files.value, ...Array.from(fileInputRef.value.files)];
      } else {
        files.value = [fileInputRef.value.files[0]];
      }
    }
    fileInputRef.value.value = ''; // clear the input
  }
};

const returnFileSize = (number: number) => {
  if (number < 1e3) {
    return `${number} bytes`;
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`;
  } else {
    return `${(number / 1e6).toFixed(1)} MB`;
  }
};

const getExtension = (name: string): string => {
  let regex = new RegExp('[^.]+$');
  return name.match(regex)![0].toUpperCase();
};

const makeName = (name: string): string => {
  return name.substring(0, name.lastIndexOf('.'));
};

const onLabelClick = () => {
  fileInputRef.value!.click();
};

const onRemoveClick = (file: File) => {
  files.value = files.value.filter((f) => f !== file);
};

defineExpose({
  isValid: isValid,
});
</script>

/* Template ============================================================== */
<template>
  <div class="dps__input-file-upload-wrapper">
    <div
      class="dps__input_file-upload-container"
      :class="{ 'is-dragging': isDragging, invalid__input: isInvalid }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <div class="dps__input-file-upload-input-label-container">
        <input
          id="dps__input-file-upload-input"
          ref="fileInputRef"
          type="file"
          :multiple="multiple"
          :accept="accept"
          aria-label="Upload file"
          @change="onChange()"
        />
        <label
          for="dps__input-file-upload-label"
          tabindex="0"
          @keyup.enter="onLabelClick()"
          @click="onLabelClick()"
        >
          <div v-if="isDragging" class="dps__input-file-upload-drop-indicator">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="40"
                height="40"
                focusable="false"
                aria-hidden="true"
              >
                <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0
                  64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0
                  128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4
                  24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6
                  0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>Release to drop files here.</div>
          </div>

          <div v-else class="dps__input-file-upload-drop-indicator">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="40"
                height="40"
                focusable="false"
                aria-hidden="true"
              >
                <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3
                  0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256
                  0l0 128 128 0L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-102.1-31
                  31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9
                  0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31L216 408z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              Drop {{ filesContext }} here or <u>Click here</u> to upload.
            </div>
          </div>
        </label>
      </div>

      <div
        v-if="files.length > 0"
        class="dps__input-file-upload-files-list-container"
      >
        <div class="dps__input-file-upload-files-list-file-count">
          {{ fileCountLabel }}
        </div>
        <ul class="dps__input-file-upload-files-list">
          <li v-for="file in files" :key="file.name">
            <slot :file="file">
              <div class="dps__input-file-upload-file-details">
                <div
                  class="dps__input-file-upload-file-name"
                  :title="makeName(file.name)"
                >
                  {{ makeName(file.name) }}
                </div>
                <div class="dps__input-file-upload-file-metadata">
                  {{ getExtension(file.name) }} -
                  {{ returnFileSize(file.size) }}
                </div>
              </div>

              <div class="dps__input-file-upload-file-actions">
                <button title="Remove file" @click="onRemoveClick(file)">
                  Remove
                </button>
              </div>
            </slot>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-show="showDetails"
      :id="`${inputId}-messages`"
      role="alert"
      class="dps__input-text-details"
      :class="{ invalid__input: isInvalid }"
    >
      <div class="dps__input-messages">
        <template v-if="_errorMessages">
          <div class="dps__input-message">{{ _errorMessages }}</div>
        </template>

        <template v-else>
          <div class="dps__input-message">
            <template v-if="slots.hint">
              <slot name="hint" />
            </template>
            <template v-if="hint">
              {{ hint }}
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.dps__input-file-upload-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.dps__input_file-upload-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 3px dashed #4a4a4a;
  border-radius: 0.25rem;
  padding: 0 1rem;

  &.is-dragging {
    border-color: #0076bd;

    label[for='dps__input-file-upload-label'] {
      color: #0076bd;
    }
  }

  &.invalid__input {
    border-color: #a41d33;

    label[for='dps__input-file-upload-label'] {
      color: #a41d33;
    }
  }

  .dps__input-file-upload-input-label-container {
    padding: 0 1rem 0 1rem;
  }

  #dps__input-file-upload-input {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
    visibility: hidden;
  }

  label[for='dps__input-file-upload-label'] {
    cursor: pointer;
    display: block;
    text-align: center;
    width: 100%;
    font-size: 1.35rem;

    .dps__input-file-upload-drop-indicator {
      display: flex;
      align-items: center;
      padding: 1rem;

      @media (max-width: 767.998px) {
        flex-direction: column;
        column-gap: 0.5rem;
      }
      @media (min-width: 768px) {
        flex-direction: row;
        row-gap: 0.5rem;
        column-gap: 0.5rem;
      }
    }
  }

  .dps__input-file-upload-files-list-container {
    width: 100%;
    padding-bottom: 1rem;

    .dps__input-file-upload-files-list-file-count {
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .dps__input-file-upload-files-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.75rem;

      @media (max-width: 767.998px) {
        grid-template-columns: 1fr 1fr;
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }

      li {
        display: flex;
        justify-content: space-between;
        column-gap: 0.5rem;
        padding: 0.5rem;
        border: 1px solid #4a4a4a;
        border-radius: 0.25rem;

        .dps__input-file-upload-file-details {
          display: grid;
          width: calc(100% - 74px);

          .dps__input-file-upload-file-name {
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.15rem;
            white-space: nowrap;
          }
        }

        .dps__input-file-upload-file-metadata {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        .dps__input-file-upload-file-actions {
          display: flex;
          align-items: center;

          button {
            background-color: #4a4a4a;
            color: white;
            border: 1px solid #4a4a4a;
            padding: 0.5rem;
            cursor: pointer;
            border-radius: 0.25rem;
            transition:
              background-color 0.3s,
              color 0.3s;

            @media (hover: hover) {
              &:hover {
                background-color: #fff;
                color: #000;
                border: 1px solid #4a4a4a;
                transition: all 0.3s;
              }
            }
          }
        }
      }
    }
  }
}
</style>
