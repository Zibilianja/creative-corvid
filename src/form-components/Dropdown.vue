/* ==========================================================================
Dropdown.vue - Custom dropdown (no native select). Fully styleable.
========================================================================== */
<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import type { PropType } from 'vue';
import type { SelectOption } from '@/types/SelectOption';
import { GetInputId } from '@/utils';
import {
  faChevronDown,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

type ModelValue = string | number | null;

const model = defineModel<ModelValue>({
  default: null,
});

const props = defineProps({
  label: { type: String, required: true },
  options: { type: Array as PropType<SelectOption[]>, required: true },
  placeholder: { type: String, default: 'Select…' },
  disabled: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: true },
  maxMenuHeight: { type: String, default: '240px' },
  closeOnSelect: { type: Boolean, default: true },
  clearable: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
});

const inputId = GetInputId();
const rootEl = ref<HTMLElement | null>(null);
const buttonEl = ref<HTMLButtonElement | null>(null);

const isOpen = ref(false);
const activeIndex = ref<number>(-1);

// Keep a stable string key for comparisons
const normalize = (v: any) => (v === null || v === undefined ? '' : String(v));

const selectedIndex = computed(() => {
  const mv = normalize(model.value);
  return props.options.findIndex((o) => normalize(o.value) === mv);
});

const selectedLabel = computed(() => {
  const idx = selectedIndex.value;
  if (idx < 0) return '';
  return props.options[idx]?.label ?? '';
});

const displayText = computed(() => {
  return selectedLabel.value || props.placeholder;
});

const isPlaceholder = computed(() => !selectedLabel.value);

const menuId = computed(() => `${inputId}-menu`);
const optionId = (idx: number) => `${inputId}-opt-${idx}`;

const openMenu = () => {
  if (props.disabled) return;
  isOpen.value = true;

  // Set active to selected item (or first option)
  activeIndex.value = selectedIndex.value >= 0 ? selectedIndex.value : 0;

  nextTick(() => {
    scrollActiveIntoView();
  });
};

const closeMenu = (focusButton = true) => {
  isOpen.value = false;
  activeIndex.value = -1;
  if (focusButton) nextTick(() => buttonEl.value?.focus());
};

const toggleMenu = () => {
  if (props.disabled) return;
  isOpen.value ? closeMenu(false) : openMenu();
};

const selectIndex = (idx: number) => {
  const opt = props.options[idx];
  if (!opt) return;
  model.value = opt.value as any;

  if (props.closeOnSelect) closeMenu(true);
};

const clearSelection = (e: MouseEvent) => {
  e.stopPropagation();
  model.value = null;
  closeMenu(true);
};

const scrollActiveIntoView = () => {
  const el = document.getElementById(optionId(activeIndex.value));
  el?.scrollIntoView({ block: 'nearest' });
};

const onKeyDown = (e: KeyboardEvent) => {
  if (props.disabled) return;

  // If closed: open on Enter/Space/ArrowDown
  if (!isOpen.value) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      openMenu();
    }
    return;
  }

  // If open:
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMenu(true);
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex.value = Math.min(
      activeIndex.value + 1,
      props.options.length - 1,
    );
    scrollActiveIntoView();
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex.value = Math.max(activeIndex.value - 1, 0);
    scrollActiveIntoView();
    return;
  }

  if (e.key === 'Home') {
    e.preventDefault();
    activeIndex.value = 0;
    scrollActiveIntoView();
    return;
  }

  if (e.key === 'End') {
    e.preventDefault();
    activeIndex.value = props.options.length - 1;
    scrollActiveIntoView();
    return;
  }

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (activeIndex.value >= 0) selectIndex(activeIndex.value);
    return;
  }

  // Optional: basic typeahead (first letter match)
  if (e.key.length === 1 && /^[a-z0-9]$/i.test(e.key)) {
    const query = e.key.toLowerCase();
    const start = Math.max(activeIndex.value, 0);
    const opts = props.options;

    // Search forward, wrap around
    for (let i = 1; i <= opts.length; i++) {
      const idx = (start + i) % opts.length;
      const label = (opts[idx]?.label ?? '').toLowerCase();
      if (label.startsWith(query)) {
        activeIndex.value = idx;
        scrollActiveIntoView();
        break;
      }
    }
  }
};

// Close on click outside
const onDocPointerDown = (e: PointerEvent) => {
  if (!isOpen.value) return;
  const target = e.target as Node | null;
  if (!target) return;
  if (rootEl.value && !rootEl.value.contains(target)) closeMenu(false);
};

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointerDown);
});

// If options change and the selected value no longer exists, clear it
watch(
  () => props.options,
  (opts) => {
    if (model.value === null) return;
    const exists = opts.some(
      (o) => normalize(o.value) === normalize(model.value),
    );
    if (!exists) model.value = null;
  },
  { deep: true },
);
</script>

<template>
  <div
    ref="rootEl"
    class="cc__dropdown"
    :class="{
      is__open: isOpen,
      is__disabled: disabled,
      is__placeholder: isPlaceholder,
    }"
  >
    <div class="cc-d-flex cc-flex-row cc-w-100 cc-justify-between">
      <label
        :for="inputId"
        class="cc__dropdown-label"
        >{{ label }}
        <div
          v-if="required"
          class="cc-required-indicator"
        >
          *
        </div></label
      >

      <div
        v-if="model !== null && clearable && !required"
        class="cc-clear-selection CC__button-text"
        @click="clearSelection"
      >
        Clear Selection
        <font-awesome-icon
          :icon="faTimes"
          class="clear-selection-button"
        />
      </div>
    </div>
    <!-- Button that looks like the select control -->
    <button
      :id="inputId"
      ref="buttonEl"
      type="button"
      class="cc__dropdown-control"
      :class="{ 'select-focused': isOpen, 'select-error': error }"
      :disabled="disabled"
      :aria-haspopup="'listbox'"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="menuId"
      :aria-activedescendant="
        isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
      "
      @click="toggleMenu"
      @keydown="onKeyDown"
    >
      <span class="cc__dropdown-value">
        {{ displayText }}
      </span>

      <span
        class="cc__dropdown-icon"
        aria-hidden="true"
      >
        <font-awesome-icon :icon="faChevronDown" />
      </span>
    </button>

    <!-- Menu panel -->
    <div
      v-if="isOpen"
      ref="menuEl"
      class="cc__dropdown-menu"
      :id="menuId"
      role="listbox"
      tabindex="-1"
      :style="{ maxHeight: maxMenuHeight }"
      @keydown="onKeyDown"
    >
      <button
        v-for="(opt, idx) in options"
        :key="String(opt.value)"
        type="button"
        class="cc__dropdown-option"
        :id="optionId(idx)"
        role="option"
        :aria-selected="
          normalize(opt.value) === normalize(model) ? 'true' : 'false'
        "
        :class="{
          is__active: idx === activeIndex,
          is__selected: normalize(opt.value) === normalize(model),
        }"
        @mouseenter="activeIndex = idx"
        @click="selectIndex(idx)"
      >
        <span class="cc__dropdown-option-label">{{ opt.label }}</span>

        <span
          class="cc__dropdown-check"
          aria-hidden="true"
        >
          <font-awesome-icon :icon="faCheck" />
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="postcss">
.cc__dropdown {
  display: grid;
  gap: 0.35rem;
  width: 100%;
  position: relative;

  .cc-required-indicator {
    color: var(--CC-color-required);
  }

  .cc-clear-selection {
    margin-bottom: -1rem;
  }

  .clear-selection-button {
    border-radius: 50%;
    padding: 0.17rem;
    font-size: 0.65rem;
    margin-left: 0.35rem;
  }

  .select-focused {
    outline: 1px solid var(--CC-color-focus-luminous);
  }

  .select-error {
    outline: 1px solid var(--CC-color-error);
  }
}

/* label */
.cc__dropdown-label {
  font-size: 0.95rem;
}

/* control button (closed state) */
.cc__dropdown-control {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #ccc;
  border-radius: 6px;
  background: transparent;
  outline: 1px solid transparent;

  padding: 0.55rem 0.65rem;
  cursor: pointer;
  color: var(--CC-color-gray-darker);

  position: relative;
  &:focus-visible {
    outline: 1px solid var(--CC-color-gray-dark);
  }
}

.cc__dropdown.is__disabled .cc__dropdown-control {
  cursor: not-allowed;
  opacity: 0.6;
}

.cc__dropdown-value {
  display: inline-flex;
  align-items: center;
  min-height: 1.5rem;
  line-height: 1.5rem;
  text-align: left;
}

/* placeholder styling */
.cc__dropdown.is__placeholder .cc__dropdown-value {
  opacity: 0.75;
}

/* chevron */
.cc__dropdown-icon {
  margin-left: 0.75rem;
  display: inline-flex;
  pointer-events: none;
}

/* menu */
.cc__dropdown-menu {
  position: absolute; /* ✅ overlay */
  top: calc(100% + 0.25rem); /* ✅ below the control */
  left: 0;
  box-sizing: border-box;
  width: 100%;

  border: 1px solid #ccc;
  border-radius: 8px;
  background: var(--CC-color-surface, #fff);

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  overflow: auto;
  padding: 0.25rem;

  z-index: 999; /* ✅ ensure it sits above */
}

/* option button */
.cc__dropdown-option {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 0;
  background: transparent;
  border-radius: 6px;

  padding: 0.5rem 0.6rem;
  cursor: pointer;
  text-align: left;
  color: var(--CC-color-gray-darker);
}

/* hover/active */
.cc__dropdown-option.is__active,
.cc__dropdown-option:hover {
  background: rgba(0, 0, 0, 0.06);
}

/* selected */
.cc__dropdown-option .cc__dropdown-check {
  opacity: 0;
}

.cc__dropdown-option.is__selected .cc__dropdown-check {
  opacity: 1;
}

/* optional: rotate chevron when open */
.cc__dropdown.is__open .cc__dropdown-icon {
  transform: rotate(180deg);
}
</style>
