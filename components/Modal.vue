<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <div class="modal-header">
        <h3 class="font-bold text-lg modal-title"><slot name="title"></slot></h3>
        <button class="btn btn-sm btn-circle" @click="closeModal">✕</button>
      </div>
      <slot></slot>
      <div class="modal-action" v-if="$slots.action">
        <slot name="action"></slot>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$refs.modal.close();
      this.$emit('close');
    },
    openModal() {
         this.$refs.modal.showModal();
    }
  },
};
</script>
