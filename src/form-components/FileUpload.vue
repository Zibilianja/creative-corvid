/* ==========================================================================
FileUpload.vue Describe what this component does.
========================================================================== */
<script setup lang="ts">
import { computed, ref, useSlots, watch, type PropType } from 'vue';
import { GetInputId } from '@/utils';
import {
  faFileArrowDown,
  faFileArrowUp,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  modelValue: {
    type: Array as PropType<File[]>,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
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
  },
);

watch(
  () => props.error,
  (newValue) => {
    isInvalid.value = newValue;
  },
  { immediate: true },
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
  const input = fileInputRef.value;
  if (!input?.files) return;

  const picked = Array.from(input.files);
  files.value = props.multiple ? [...files.value, ...picked] : [picked[0]];

  input.value = '';
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

const onRemoveClick = (file: File) => {
  files.value = files.value.filter((f) => f !== file);
};

defineExpose({
  isValid: isValid,
});
</script>

/* Template ============================================================== */
<template>
  <label
    :for="`${inputId}-file`"
    tabindex="0"
  >
    {{ props.label }}
  </label>
  <div class="cc__input-file-upload-wrapper">
    <div
      class="cc__input_file-upload-container"
      :class="{ 'is-dragging': isDragging, invalid__input: isInvalid }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <div class="cc__input-file-upload-input-label-container">
        <input
          :id="`${inputId}-file`"
          class="cc__input-file-upload-input"
          ref="fileInputRef"
          type="file"
          :multiple="multiple"
          :accept="accept"
          aria-label="Upload file"
          @change="onChange"
        />
        <label
          :for="`${inputId}-file`"
          tabindex="1"
        >
          <div
            v-if="isDragging"
            class="cc__input-file-upload-drop-indicator"
          >
            <div class="cc-p-4">
              <font-awesome-icon
                class="cc__file-icon"
                :icon="faFileArrowDown"
              />
            </div>
            <div>Release to drop files here.</div>
          </div>

          <div
            v-else
            class="cc__input-file-upload-drop-indicator"
          >
            <div class="cc-p-4">
              <font-awesome-icon
                class="cc__file-icon"
                :icon="faFileArrowUp"
              />
            </div>
            <div class="cc__input-file-upload-text">
              Drop {{ filesContext }} here or <u>Click here</u> to upload.
            </div>
          </div>
        </label>
      </div>

      <div
        v-if="files.length > 0"
        class="cc__input-file-upload-files-list-container"
      >
        <div class="cc__input-file-upload-files-list-file-count">
          {{ fileCountLabel }}
        </div>
        <ul class="cc__input-file-upload-files-list">
          <li
            v-for="file in files"
            :key="file.name"
          >
            <slot :file="file">
              <div class="cc__input-file-upload-file-details">
                <div
                  class="cc__input-file-upload-file-name"
                  :title="makeName(file.name)"
                >
                  {{ makeName(file.name) }}
                </div>
                <div class="cc__input-file-upload-file-metadata">
                  {{ getExtension(file.name) }} -
                  {{ returnFileSize(file.size) }}
                </div>
              </div>

              <div class="cc__input-file-upload-file-actions">
                <button
                  title="Remove file"
                  @click="onRemoveClick(file)"
                >
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
      class="cc__input-text-details"
      :class="{ invalid__input: isInvalid }"
    >
      <div class="cc__input-messages">
        <template v-if="_errorMessages">
          <div class="cc__input-message">{{ _errorMessages }}</div>
        </template>

        <template v-else>
          <div class="cc__input-message">
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
<style lang="scss">
.cc__input-file-upload-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;

  .cc__file-icon {
    font-size: 2rem;
    color: var(--CC-color-gray-darker);
  }
}

.cc__input_file-upload-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 3px dashed var(--CC-color-gray);
  border-radius: 1rem;
  padding: 1rem 1rem;

  &.is-dragging {
    border-color: #0076bd;
  }

  &.invalid__input {
    border-color: #a41d33;

    .cc__input-file-upload-label {
      color: #a41d33;
    }
  }

  .cc__input-file-upload-input-label-container {
    padding: 0 1rem 0 1rem;
    :hover {
      cursor: pointer;
    }
  }

  .cc__input-file-upload-input {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  .cc__input-file-upload-label {
    display: block;
    text-align: center;
    width: 100%;
    font-size: 1.35rem;

    .cc__input-file-upload-drop-indicator {
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

  .cc__input-file-upload-files-list-container {
    width: 100%;
    padding-bottom: 1rem;

    .cc__input-file-upload-files-list-file-count {
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .cc__input-file-upload-files-list {
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

        .cc__input-file-upload-file-details {
          display: grid;
          width: calc(100% - 74px);

          .cc__input-file-upload-file-name {
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.15rem;
            white-space: nowrap;
          }
        }

        .cc__input-file-upload-file-metadata {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        .cc__input-file-upload-file-actions {
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
